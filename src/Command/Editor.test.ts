import { describe, it, expect } from "@jest/globals";
import Application, { CopyCommand, CutCommand, PasteCommand, UndoCommand } from "./Editor";

describe("command test", () => {
  const application = new Application();
  it("copy command test", () => {
    const res = application.executeCommand(new CopyCommand(application, application.activeEditor));
    expect(res).toBeFalsy();
  });

  it("cut command test", () => {
    const res = application.executeCommand(new CutCommand(application, application.activeEditor));
    expect(res).toBeTruthy();
  });

  it("paste command test", () => {
    const res = application.executeCommand(new PasteCommand(application, application.activeEditor));
    expect(res).toBeTruthy();
  });

  it("undo command test", () => {
    const res = application.executeCommand(new UndoCommand(application, application.activeEditor));
    expect(res).toBeFalsy();
  });
});
