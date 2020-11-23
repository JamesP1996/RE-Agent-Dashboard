const { db } = require("../utilities/admin");

exports.getAllNotes = (req, res) => {
  db.collection("notes")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        notes.push({
          noteID: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(notes);
    })
    .catch((err) => console.error(err));
};

exports.postNewNote = (req, res) => {
  if (req.body.description.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newNotes = {
    title: req.body.title,
    description: req.body.description,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("notes")
    .add(newNotes)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
};

exports.getNote = (req,res)=>{
  let noteData = {};
  db.doc(`/notes/${req.params.noteID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Note not found' });
      }
      noteData = doc.data();
      noteData.noteID = doc.noteID;
      return db
        .collection('notes')
        .where('noteID', '==', req.params.noteID)
        .get();
    })
    .then((data) => {
      return res.json(noteData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteNote = (req, res) => {
  const document = db.doc(`/notes/${req.params.noteID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Note not found' });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Note deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateNote = (req, res) => {
  
  const document = db.doc(`/notes/${req.params.noteID}`);
  document.get().then((doc)=>{
    if(!doc.exists){
      return res.status(404).json({ error: 'Note not found' }); 
    }
    if(doc.data().userHandle !== req.user.handle){
      return res.status(403).json({ error: 'Unauthorized' });
    }
    else{
      document.set(({
        title: req.body.title,
        description: req.body.description,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString(),
      }))
    .then(() =>{
      res.json("Note updated Successfully");
    })
    .catch(err=>{
      console.log(err);
      return res.status(500).json({error: err.code});
    })
  }
  })
  
};

