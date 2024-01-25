interface Command {
  execute: () => void;
}
export class Light {
  power: boolean = false;
  on() {
    return (this.power = true);
  }
  off() {
    return (this.power = false);
  }
}

export class LightOnCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    return this.light.on();
  }
}

export class LightOffCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }
  execute() {
    return this.light.off();
  }
}

export class Stereo {
  power: boolean = false;
  mode: "cd" | "dvd" | "radio" = "cd";
  volume: number = 11;
  on() {
    return (this.power = true);
  }
  off() {
    return (this.power = false);
  }
  setCD() {
    return (this.mode = "cd");
  }
  setDVD() {
    return (this.mode = "dvd");
  }
  setRadio() {
    return (this.mode = "radio");
  }
  setVolume(volume: number) {
    return (this.volume = volume);
  }
}

export class StereoOnCommand implements Command {
  stereo: Stereo;
  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }
  execute() {
    return this.stereo.on();
  }
}

export class StereoOffCommand implements Command {
  stereo: Stereo;
  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }
  execute() {
    return this.stereo.off();
  }
}

export class StereoOnWithCDCommand implements Command {
  stereo: Stereo;
  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }
  execute() {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume(11);
  }
}

export class SimpleRemoteControl {
  slot: Command;

  setCommand(command: Command) {
    this.slot = command;
  }

  buttonWasPressed() {
    return this.slot.execute();
  }
}
