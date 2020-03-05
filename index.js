"use strict";

var Service, Characteristic;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-hourglass", "Hourglass", Hourglass);
}

function Hourglass(log, config) {
  this.log = log;
  this.interval = null;
  this.resumeAfterStop = config.resumeAfterStop;
  this.name = config.name;
  this.type = config.type || 'fan';
  this.step = config.step || 1;
  this.tick = config.tick || 1000;
  this.curr = 0;

  if (this.type === 'fan') {
    this.service = new Service.Fanv2(this.name, "Timer");
    this.Characteristic = {
      Timer: Characteristic.RotationSpeed,
      On: Characteristic.Active
    };
  } else if (this.type === 'bulb') {
    this.service = new Service.Lightbulb(this.name, "Timer");
    this.Characteristic = {
      Timer: Characteristic.Brightness,
      On: Characteristic.On
    };
  }

  this.service.getCharacteristic(this.Characteristic.Timer)
    .on('set', this.setTimer.bind(this));

  this.service.getCharacteristic(this.Characteristic.On)
    .on('set', this.setOn.bind(this));
}

Hourglass.prototype.onTick = function () {
  this.log("Current tick → " + this.curr);

  this.curr++;

  let timer = 100 - this.curr * this.step;

  this.log("Proposed timer → " + timer);

  if (timer <= 0) {
    this.service.setCharacteristic(this.Characteristic.Timer, 0);
    this.stop();
  } else if (timer > 100) {
    timer = 100;
    this.service.setCharacteristic(this.Characteristic.Timer, 100);
  } else {
    this.service.setCharacteristic(this.Characteristic.Timer, timer);
  }
}

Hourglass.prototype.stop = function () {
  this.log("stop");
  if (this.interval !== null) {
    if (!this.resumeAfterStop) {
      this.curr = 0;
    }
    clearInterval(this.interval);
    this.interval = null;
    this.service.setCharacteristic(this.Characteristic.On, false);
  }
}

Hourglass.prototype.start = function () {
  this.log("start");
  if (this.interval === null) {
    this.log("setInterval");
    this.interval = setInterval(this.onTick.bind(this), this.tick);
    this.service.setCharacteristic(this.Characteristic.On, true);
  }
}

Hourglass.prototype.setTimer = function (timer, callback) {
  this.log("setTimer → " + timer);

  if (timer > 0) {
    this.curr = (100 - timer) / this.step;
    this.start();
  } else {
    this.stop();
  }

  callback();
}

Hourglass.prototype.setOn = function (on, callback) {
  this.log("setOn → " + on);

  if (on) {
    this.start();
  } else {
    this.stop();

    if (!this.resumeAfterStop) {
      this.service.setCharacteristic(this.Characteristic.Timer, 0);
    }
  }

  callback();
}

Hourglass.prototype.getServices = function () {
  return [this.service];
}