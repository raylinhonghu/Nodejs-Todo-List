// var data = [{item:'each peach'},{item:'make bed'},{item:'walk cat'}];
var bodyParser = require('body-parser');

// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds239557.mlab.com:39557/todo');

// create a schema - this is like a blueprint
// - declare how todo item look like
var todoSchema = new mongoose.Schema({
  item: String
})

// create model of type todo, 'Todo' is a model name on mongodb
// so we can create new Todo items and push it to database
var Todo = mongoose.model('Todo', todoSchema);
// EX. create an item of type todo, provide obj based on schema
// save to database and takes back a call back
// var itemOne = Todo({item:'get flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// })


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// render views & passing data to views
module.exports = function(app){
  // request handlers

  app.get('/todo',function(req,res){
    // get data from mongodb and pass it to the views
    // retrival all or .find({item: 'buy flowers'})
    Todo.find({},function(err,data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })
  });

  // handler ajax request
  app.post('/todo', urlencodedParser, function(req,res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    })
    // data.push(req.body);
  });

  app.delete('/todo/:item', function(req,res){
    // delete the requested item from mongodb
    Todo.find({item: req.params.item.slice(1).replace(/\-/g, " ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    });
    // data = data.filter(function(todo) {
    //   console.log(todo.item.replace(/ /g, "-"));
    //   console.log(req.params.item.slice(1));
    // //   if(todo.item.replace(/ /g, "-") !== req.params.name){console.log("same");}
    //   return todo.item.replace(/ /g, "-") !== req.params.item.slice(1);
    // });
    // // console.log(data);
    // res.json(data);
  });
};
