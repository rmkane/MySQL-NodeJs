const TodoApp = require('./src/app.js');

new TodoApp().run().then(r => {
  console.log('Finished!');
});