const { db } = require("../utilities/admin");

exports.getAllTodos = (req, res) => {
  db.collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          todoID: doc.id,
          Title: doc.data().Title,
          Description: doc.data().Description,
          Checked: doc.data().Checked,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(todos);
    })
    .catch((err) => console.error(err));
};

exports.postNewTodo = (req, res) => {
  if (req.body.Description.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newTodos = {
    Title: req.body.Title,
    Description: req.body.Description,
    userHandle: req.user.handle,
    Checked: req.body.Checked,
    createdAt: new Date().toISOString(),
  };

  db.collection("todos")
    .add(newTodos)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
};

exports.getTodo = (req, res) => {
  let todoData = {};
  db.doc(`/todos/${req.params.totoID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Todo not found" });
      }
      todoData = doc.data();
      todoData.todoID = doc.todoID;
      return db
        .collection("todos")
        .where("todoID", "==", req.params.todoID)
        .get();
    })
    .then((data) => {
      return res.json(todoID);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

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
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateTodo = (req, res) => {
  
    const document = db.doc(`/todos/${req.params.todoID}`);
    document.get().then((doc)=>{
      if(!doc.exists){
        return res.status(404).json({ error: 'Todo not found' }); 
      }
      if(doc.data().userHandle !== req.user.handle){
        return res.status(403).json({ error: 'Unauthorized' });
      }
      else{
        document.set(({
          Title: req.body.Title,
          Description: req.body.Description,
          userHandle: req.user.handle,
          Checked: req.body.Checked,
          createdAt: new Date().toISOString(),
        }))
      .then(() =>{
        res.json("Todo updated Successfully");
      })
      .catch(err=>{
        console.log(err);
        return res.status(500).json({error: err.code});
      })
    }
    })
    
  };
