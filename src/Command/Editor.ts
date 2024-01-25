abstract class Command {
  protected app: Application;
  protected editor: Editor;
  protected backup: string;

  constructor(app: Application, editor: Editor) {
    this.app = app;
    this.editor = editor;
  }

  saveBackup() {
    this.backup = this.editor.text;
  }

  undo() {
    this.editor.text = this.backup;
  }

  excute(): boolean {
    return false;
  }
}

export class CopyCommand extends Command {
  excute() {
    this.app.clipboard = this.editor.getSelection();
    return false;
  }
}

export class CutCommand extends Command {
  excute() {
    this.saveBackup();
    this.app.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();
    return true;
  }
}

export class PasteCommand extends Command {
  excute() {
    this.saveBackup();
    this.editor.replaceSelection(this.app.clipboard);
    return true;
  }
}

export class UndoCommand extends Command {
  excute() {
    this.app.undo();
    return false;
  }
}

export class CommandHistory {
  private history: Command[];

  push(c: Command) {
    return this.history?.push(c);
  }

  pop() {
    return this.history?.pop();
  }
}

class Editor {
  text: string;
  getSelection() {
    return this.text;
  }
  deleteSelection() {}
  replaceSelection(text: string): string {
    return text;
  }
}

class Application {
  clipboard: string;
  editors: Editor[];
  activeEditor: Editor;
  history: CommandHistory;

  createUI() {}

  executeCommand(command: Command) {
    if (command.excute()) {
      this.history.push(command);
    }
  }

  undo() {
    const command = this.history?.pop();
    if (command) {
      command.undo();
    }
  }
}

export default Application;
