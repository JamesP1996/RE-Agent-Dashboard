const {db} = require('../utilities/admin');

exports.getAllNotes = (req, res) => {
    db.collection("notes")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        let notes = [];
        data.forEach((doc) => {
          notes.push({
            noteID: doc.id,
            Title: doc.data().Title,
            Description: doc.data().Description,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
          });
        });
        return res.json(notes);
      })
      .catch((err) => console.error(err));
}

exports.postNewNote = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Using GET request on wrong Route!" });
  }

  const newNotes = {
    Title: req.body.Title,
    Description: req.body.Description,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("notes")
    .add(newNotes)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return null;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
      return err;
    });
}
