const readline = require('readline');
const fs = require('fs');

const TODO_FILE = 'todos.json';

class TodoApp {
  constructor() {
    this.todos = this.loadTodos();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  loadTodos() {
    try {
      if (fs.existsSync(TODO_FILE)) {
        const data = fs.readFileSync(TODO_FILE, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading todos:', error.message);
    }
    return [];
  }

  saveTodos() {
    try {
      fs.writeFileSync(TODO_FILE, JSON.stringify(this.todos, null, 2));
    } catch (error) {
      console.error('Error saving todos:', error.message);
    }
  }

  addTodo(task) {
    const todo = {
      id: Date.now(),
      task: task,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.todos.push(todo);
    this.saveTodos();
    console.log(`Added: "${task}"`);
  }

  listTodos() {
    if (this.todos.length === 0) {
      console.log('No todos found.');
      return;
    }

    console.log('\nYour TODOs:');
    this.todos.forEach((todo, index) => {
      const status = todo.completed ? '✓' : ' ';
      console.log(`${index + 1}. [${status}] ${todo.task}`);
    });
    console.log('');
  }

  completeTodo(index) {
    if (index < 1 || index > this.todos.length) {
      console.log('Invalid todo number.');
      return;
    }
    this.todos[index - 1].completed = true;
    this.saveTodos();
    console.log(`Completed: "${this.todos[index - 1].task}"`);
  }

  deleteTodo(index) {
    if (index < 1 || index > this.todos.length) {
      console.log('Invalid todo number.');
      return;
    }
    const deleted = this.todos.splice(index - 1, 1);
    this.saveTodos();
    console.log(`Deleted: "${deleted[0].task}"`);
  }

  showHelp() {
    console.log('\nTODO App Commands:');
    console.log('  add <task>       - Add a new todo');
    console.log('  list             - List all todos');
    console.log('  complete <num>   - Mark a todo as complete');
    console.log('  delete <num>     - Delete a todo');
    console.log('  help             - Show this help message');
    console.log('  exit             - Exit the app');
    console.log('');
  }

  processCommand(input) {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case 'add':
        if (args) {
          this.addTodo(args);
        } else {
          console.log('Please provide a task to add.');
        }
        break;
      case 'list':
        this.listTodos();
        break;
      case 'complete':
        this.completeTodo(parseInt(args));
        break;
      case 'delete':
        this.deleteTodo(parseInt(args));
        break;
      case 'help':
        this.showHelp();
        break;
      case 'exit':
        console.log('Goodbye!');
        this.rl.close();
        return false;
      default:
        console.log('Unknown command. Type "help" for available commands.');
    }
    return true;
  }

  start() {
    console.log('Welcome to TODO App!');
    this.showHelp();

    const prompt = () => {
      this.rl.question('todo> ', (input) => {
        if (this.processCommand(input)) {
          prompt();
        }
      });
    };

    prompt();
  }
}

const app = new TodoApp();
app.start();
