class TodoApp {
  constructor() {
    this.todos = this.loadTodos();
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.todoInput = document.getElementById('todoInput');
    this.addBtn = document.getElementById('addBtn');
    this.todoList = document.getElementById('todoList');
    this.todoCount = document.getElementById('todoCount');
    this.clearCompleted = document.getElementById('clearCompleted');
    this.filterBtns = document.querySelectorAll('.filter-btn');

    this.addBtn.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });
    this.clearCompleted.addEventListener('click', () => this.clearCompletedTodos());

    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
    });

    this.render();
  }

  loadTodos() {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo() {
    const task = this.todoInput.value.trim();
    if (!task) return;

    const todo = {
      id: Date.now(),
      task: task,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.push(todo);
    this.todoInput.value = '';
    this.saveTodos();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
    this.render();
  }

  clearCompletedTodos() {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveTodos();
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    this.render();
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }

  render() {
    const filteredTodos = this.getFilteredTodos();

    this.todoList.innerHTML = '';

    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.completed ? ' completed' : ''}`;

      li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${this.escapeHtml(todo.task)}</span>
        <button class="delete-btn">削除</button>
      `;

      li.querySelector('.todo-checkbox').addEventListener('change', () => {
        this.toggleTodo(todo.id);
      });

      li.querySelector('.delete-btn').addEventListener('click', () => {
        this.deleteTodo(todo.id);
      });

      this.todoList.appendChild(li);
    });

    const activeCount = this.todos.filter(t => !t.completed).length;
    this.todoCount.textContent = `${activeCount}件のTODO`;

    const hasCompleted = this.todos.some(t => t.completed);
    this.clearCompleted.style.display = hasCompleted ? 'block' : 'none';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

const app = new TodoApp();
