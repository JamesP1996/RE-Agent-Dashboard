/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
const { db } = require("../utilities/admin");
const {validateTodoData} = require("../utilities/validators");

// Get all the todo's a user has made
exports.getAllTodos = (req, res) => {
  db.collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
     
      data.forEach((doc) => {
        if(doc.data().userHandle === req.user.handle)
        {
        todos.push({
          todoID: doc.id,
          Title: doc.data().Title,
          Description: doc.data().Description,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
       }
      });
    
      return res.json(todos);
    })
    .catch((err) => console.error(err));
};

// Post a New Todo under the current user's handle
exports.postNewTodo = (req, res) => {
  const newTodos = {
    Title: req.body.Title,
    Description: req.body.Description,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };
  const { valid, errors } = validateTodoData(newTodos);
  if (!valid) return res.status(400).json(errors);

  db.collection("todos")
    .add(newTodos)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return res.json;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });

    return false;
};

// Delete a Todo if the User Owns it
exports.deleteTodo = (req, res) => {
  const document = db.doc(`/todos/${req.params.todoID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Todo not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Todo deleted successfully" });
      return res.json;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

