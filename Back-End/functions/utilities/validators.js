// Helper Functions
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  //eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateSignupData = (data) => {
  // setup an errors object
  let errors = {};

  // if the email is empty or is not a email return a error
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty!";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address!";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty!";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match!";
  if(isEmpty(data.handle)) errors.handle = "Must not be empty!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateNoteData = (data) => {
  let errors = {};

  if (isEmpty(data.title)) errors.title = "Must not be empty";
  if (isEmpty(data.description)) errors.description = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateTodoData = (data) => {
  let errors = {};

  if (isEmpty(data.Title)) errors.title = "Must not be empty";
  if (isEmpty(data.Description)) errors.description = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}
