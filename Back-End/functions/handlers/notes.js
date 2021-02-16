/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
const { db } = require("../utilities/admin");
const {validateNoteData} = require("../utilities/validators");

exports.getAllNotes = (req, res) => {
  db.collection("notes")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        if(doc.data().userHandle === req.user.handle)
        {
          notes.push({
            noteID: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
          });
        }
      });
      return res.json(notes);
    })
    .catch((err) => console.error(err));
};

exports.postNewNote = (req, res) => {
  const newNotes = {
    title: req.body.title,
    description: req.body.description,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  const { valid, errors } = validateNoteData(newNotes);
  if (!valid) return res.status(400).json(errors);

  db.collection("notes")
    .add(newNotes)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return res;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });

    return db;
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
      return res;
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
      return res;
    })
    .catch(err=>{
      console.log(err);
      return res.status(500).json({error: err.code});
    })
    return false;
  }
  
  })
  
};

