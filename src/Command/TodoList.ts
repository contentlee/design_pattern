interface Command {
  todos: Todos;
  value: string;
}

class Command {
  constructor(todos: Todos, value: string = "") {
    this.todos = todos;
    this.value = value;
  }
  execute() {}
  undo() {}
}

class CommandHistory {
  private history: Command[] = [];
  push(c: Command) {
    return this.history.push(c);
  }
  pop() {
    return this.history.pop();
  }
}

export class AddTodoCommand extends Command {
  execute() {
    this.todos.list.push(this.value);
  }
  undo() {
    this.todos.list.pop();
  }
}

type Elem = { idx: number; val: string };
export class RemoveTodoCommand extends Command {
  removed: Elem[] = [];
  execute() {
    const { filtered, removed } = this.mkList(this.todos.list, this.todos.checked);
    this.todos.list = filtered;
    this.removed = removed;
    this.todos.checked = [];
  }
  undo() {
    this.removed.forEach(({ idx, val }) => {
      this.todos.list.splice(idx, 0, val);
    });
  }
  mkList(list: string[], checked: string[]) {
    const filtered: string[] = [];
    const removed: Elem[] = [];
    list.forEach((v, i) => {
      if (!checked.includes(v)) filtered.push(v);
      else removed.push({ idx: i, val: v });
    });
    return { filtered, removed };
  }
}

export class ChangeTodoCommand extends Command {
  changed: Elem;
  execute() {
    const idx = this.todos.list.indexOf(this.todos.selected);
    this.changed = { idx, val: this.todos.list[idx] };
    this.todos.list[idx] = this.value;
  }
  undo() {
    const { idx, val } = this.changed;
    this.todos.list[idx] = val;
  }
}

export class Todos {
  list: string[] = [];
  selected: string = "";
  checked: string[] = [];
}

export class Application {
  private history: CommandHistory;

  constructor() {
    this.history = new CommandHistory();
  }
  executeCommand(command: Command) {
    this.history.push(command);
    command.execute();
  }
  undo() {
    const command = this.history?.pop();
    if (command) command.undo();
  }
  reset() {
    let command = this.history?.pop();
    while (command) {
      command.undo();
      command = this.history?.pop();
    }
  }
}
