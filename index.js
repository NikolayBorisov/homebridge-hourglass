"use strict";

var Service, Characteristic, HomebridgeAPI;

module.exports = function (homebridge) {

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-hourglass", "Hourglass", Hourglass);
}

function Hourglass(log, config) {
  this.log = log;
  this.interval = null;
  this.active = false;
  this.resumeAfterStop = config.resumeAfterStop;
  this.name = config.name;
  this.step = config.step || 1;
  this.tick = config.tick || 1000;
  this.curr = 0;
  this.service = new Service.Fanv2(this.name, 'Speed');

  this.service.getCharacteristic(Characteristic.RotationSpeed)
    .on('set', this.setSpeed.bind(this));

  this.service.getCharacteristic(Characteristic.Active)
    .on('set', this.setActive.bind(this));
}

Hourglass.prototype.onTick = function () {
  this.log("Current tick → " + this.curr);

  this.curr++;

  let speed = 100 - this.curr * this.step;

  this.log("Proposed speed → " + speed);

  if (speed <= 0) {
    this.service.setCharacteristic(Characteristic.RotationSpeed, 0);
    this.stop();
  } else if (speed > 100) {
    speed = 100;
    this.service.setCharacteristic(Characteristic.RotationSpeed, 100);
  } else {
    this.service.setCharacteristic(Characteristic.RotationSpeed, speed);
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
    this.service.setCharacteristic(Characteristic.Active, false);
  }
}

Hourglass.prototype.start = function () {
  this.log("start");
  if (this.interval === null) {
    this.log("setInterval");
    this.interval = setInterval(this.onTick.bind(this), this.tick);
    this.service.setCharacteristic(Characteristic.Active, true);
  }
}

Hourglass.prototype.setSpeed = function (speed, callback) {
  this.log("setSpeed → " + speed);

  if (speed > 0) {
    this.curr = (100 - speed) / this.step;
    this.start();
  } else {
    this.stop();
  }

  callback();
}

Hourglass.prototype.setActive = function (active, callback) {
  this.log("setActive → " + active);

  if (active) {
    this.start();
  } else {
    this.stop();

    if (!this.resumeAfterStop) {
      this.service.setCharacteristic(Characteristic.RotationSpeed, 0);
    }
  }

  callback();
}

Hourglass.prototype.getServices = function () {
  return [this.service];
}