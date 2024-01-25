import { describe, it, expect } from "@jest/globals";
import {
  Light,
  LightOffCommand,
  LightOnCommand,
  SimpleRemoteControl,
  Stereo,
  StereoOffCommand,
  StereoOnCommand,
  StereoOnWithCDCommand,
} from "./Remote";

describe("light test", () => {
  const light = new Light();
  it("light on/off test", () => {
    expect(light.on()).toBeTruthy();
    expect(light.off()).toBeFalsy();
  });
});

describe("stereo test", () => {
  const stereo = new Stereo();
  it("stereo on/off test", () => {
    expect(stereo.on()).toBeTruthy();
    expect(stereo.off()).toBeFalsy();
  });

  it("stereo change mode test", () => {
    expect(stereo.setCD()).toBe("cd");
    expect(stereo.setDVD()).toBe("dvd");
    expect(stereo.setRadio()).toBe("radio");
  });

  it("stereo change volume test", () => {
    expect(stereo.setVolume(30)).toBe(30);
  });
});

describe("remote control test", () => {
  const remote = new SimpleRemoteControl();
  const light = new Light();
  const stereo = new Stereo();

  it("remote light on/off test", () => {
    remote.setCommand(new LightOnCommand(light));
    expect(remote.buttonWasPressed()).toBeTruthy();
    remote.setCommand(new LightOffCommand(light));
    expect(remote.buttonWasPressed()).toBeFalsy();
  });

  it("remote stereo on/off test", () => {
    remote.setCommand(new StereoOnCommand(stereo));
    expect(remote.buttonWasPressed()).toBeTruthy();

    remote.setCommand(new StereoOffCommand(stereo));
    expect(remote.buttonWasPressed()).toBeFalsy();
  });

  it("stereo on with CD test", () => {
    remote.setCommand(new StereoOnWithCDCommand(stereo));
    remote.buttonWasPressed();
    expect(stereo.mode).toBe("cd");
  });
});
