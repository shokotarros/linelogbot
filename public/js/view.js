'use strict';

(function(global) {
  const list = document.getElementById('list');

  global.todo.view = {};
  global.todo.view.appendTodo = (todo) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-view');
    li.setAttribute('id', `todo_${todo.id}`);
    const div = document.createElement('div');
    const element = `
      <input type="checkbox" id="checkbox_${todo.id}" data-todo-id="${todo.id}" onclick="todo.controller.toggle(this)" />
      <label for="checkbox_${todo.id}" class="checkbox-label" id="label_${todo.id}">${todo.content}</label>
      <div class="control-btn">
        <button type="button" data-todo-id="${todo.id}" onclick="todo.controller.openPrompt(this)">update</button>
        <button type="button" data-todo-id="${todo.id}" onclick="todo.controller.openConfirm(this)">delete</button>
      </div>
    `;
    div.innerHTML = element;
    li.appendChild(div);
    todos.appendChild(li);
  };

  global.todo.view.toggleLabel = (label, done) => {
    done ? label.setAttribute('style', 'text-decoration: line-through;') : label.removeAttribute('style');
  };

  global.todo.view.updateLabel = (label, content) => {
    label.innerText = content;
  };

  global.todo.view.remove = (id) => {
    const item = document.getElementById(`todo_${id}`);
    item.parentElement.removeChild(item);
  };
}(window));
