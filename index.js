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
  this.step = config.step || 1;
  this.tick = config.tick || 1000;
  this.curr = 0;
  this.service = new Service.Lightbulb(this.name, "Timer Light");

  this.service.getCharacteristic(Characteristic.Brightness)
    .on('set', this.setBrightness.bind(this));

  this.service.getCharacteristic(Characteristic.On)
    .on('set', this.setOn.bind(this));
}

Hourglass.prototype.onTick = function () {
  this.log("Current tick → " + this.curr);

  this.curr++;

  let brightness = 100 - this.curr * this.step;

  this.log("Proposed brightness → " + brightness);

  if (brightness <= 0) {
    this.service.setCharacteristic(Characteristic.Brightness, 0);
    this.stop();
  } else if (brightness > 100) {
    brightness = 100;
    this.service.setCharacteristic(Characteristic.Brightness, 100);
  } else {
    this.service.setCharacteristic(Characteristic.Brightness, brightness);
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
    this.service.setCharacteristic(Characteristic.On, false);
  }
}

Hourglass.prototype.start = function () {
  this.log("start");
  if (this.interval === null) {
    this.log("setInterval");
    this.interval = setInterval(this.onTick.bind(this), this.tick);
    this.service.setCharacteristic(Characteristic.On, true);
  }
}

Hourglass.prototype.setBrightness = function (brightness, callback) {
  this.log("setBrightness → " + brightness);

  if (brightness > 0) {
    this.curr = (100 - brightness) / this.step;
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
      this.service.setCharacteristic(Characteristic.Brightness, 0);
    }
  }

  callback();
}

Hourglass.prototype.getServices = function () {
  return [this.service];
}