import { describe, it, expect } from "@jest/globals";
import { AddTodoCommand, Application, ChangeTodoCommand, RemoveTodoCommand, Todos } from "./TodoList";

describe("todo function test", () => {
  const todos = new Todos();
  const app = new Application();

  it("add todo test", () => {
    let value = "테니스";

    app.executeCommand(new AddTodoCommand(todos, value));
    expect(todos.list.at(-1)).toBe("테니스");

    value = "배드민턴";
    app.executeCommand(new AddTodoCommand(todos, value));
    expect(todos.list.at(-1)).toBe("배드민턴");

    app.reset();
  });

  it("remove todo test", () => {
    todos.list = ["테니스", "축구", "배구", "수영"];
    todos.checked = ["수영"];

    app.executeCommand(new RemoveTodoCommand(todos));
    expect(todos.list).toEqual(["테니스", "축구", "배구"]);

    app.reset();
  });

  it("change todo test", () => {
    todos.list = ["러닝"];
    todos.selected = "러닝";

    app.executeCommand(new ChangeTodoCommand(todos, "수영"));
    expect(todos.list[0]).toBe("수영");

    app.reset();
  });
});
