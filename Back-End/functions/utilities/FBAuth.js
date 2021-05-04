const { admin , db} = require("./admin");

// Checks if user is authorized based off their token
module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No Token Found");
    return res.status(403).json({ error: "Unathorized Access" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userID", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      // If Token on the userID is equal to the current userID then progress them through
      // the system
      req.user.handle = data.docs[0].data().handle;
      return next();
    })
    .catch((err) => {
      console.error("Error while veryifying token", err);
      return res.status(403).json(err);
    });
    return false;
};
