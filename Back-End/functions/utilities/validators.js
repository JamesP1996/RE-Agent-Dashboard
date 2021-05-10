// Helper Functions

// Checks if a String is Empty
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

// Checks if a email is valid/empty
const isEmail = (email) => {
  //eslint-disable-next-line
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isNumber = (string) =>{
  const regEx = /^\d+$/;
  if(string.match(regEx)) return true;
  else return false;
}

const isPhone = (string) =>{
  const regEx = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  if(string.match(regEx)) return true;
  else return false;
}

const isTooWeak = (password) => {
  //eslint-disable-next-line
  const regEx = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  if (password.match(regEx)) return true;
  else return false;
};

// Validates Signup Data Using Email and Password
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
  if (!isTooWeak(data.password)) {
      errors.password = "Password is too weak!";
    }
  if(isEmpty(data.handle)) errors.handle = "Must not be empty!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// Validates User Login Data 
exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email must not be empty!";
  if (isEmpty(data.password)) errors.password = "Password cannot be empty!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

// Validates Created Note Data
exports.validateNoteData = (data) => {
  let errors = {};

  if (isEmpty(data.title)) errors.title = "Notes require a Title";
  if (isEmpty(data.description)) errors.description = "Note description must not be empty!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

// Validates Todo Data
exports.validateTodoData = (data) => {
  let errors = {};

  if (isEmpty(data.Title)) errors.title = "To-do Title must not be empty!";
  if (isEmpty(data.Description)) errors.description = "Description cannot be empty!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

// Validates Listing Data
exports.validateListingData = (data) => {
  let errors = {};
  if (isEmpty(data.owners)) errors.owners = "Please Enter House Owner's Names";
  if (isEmpty(data.sqft) || isNumber(data.sqft) === false) errors.sqft = "Please Enter Number of Sqft";
  if (isEmpty(data.sqft_Lot) || isNumber(data.sqft_Lot) === false) errors.sqft_Lot = "Please Enter Number of Sqft_Lot";
  if (isEmpty(data.address)) errors.address = "House needs an Address";
  if (isEmpty(data.price) || isNumber(data.price) === false) errors.price = "Price is invalid. Please Try Again";
  if (isEmpty(data.style)) errors.style = "House Style cannot be empty";
  if (isEmpty(data.stories) || isNumber(data.stories) === false) errors.stories = "Please Enter  Number of Stories";
  if (isEmpty(data.bathrooms) || isNumber(data.bathrooms) === false) errors.bathrooms = "Please Enter  Number of Bathrooms";
  if (isEmpty(data.bedrooms) || isNumber(data.bedrooms) === false) errors.bedrooms = "Please Enter Number of Bedrooms";
  if (isEmpty(data.cooling)) errors.cooling = "Please Enter Cooling Type";
  if (isEmpty(data.heating)) errors.heating = "Please Enter Heating Type";
  if (isEmpty(data.parking)) errors.parking = "Please Enter Parking Type";
  if (isEmpty(data.basement)) errors.basement = "Please Enter Basement Information";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

// Validates Open House Data
exports.validateOpenHouseData = (data) => {
  let errors = {};
  if (isEmpty(data.property_Name)) errors.property_Name = "Please Enter a Property Name!";
  if (isEmpty(data.sqft)|| isNumber(data.sqft) === false) errors.sqft = "Please Enter Number of Sqft";
  if (isEmpty(data.sqft_Lot)|| isNumber(data.sqft_Lot) === false) errors.sqft_Lot = "Please Enter Number of Sqft in Lot";
  if (isEmpty(data.address)) errors.address = "House needs an Address";
  if (isEmpty(data.price)|| isNumber(data.price) === false) errors.price = "Price is invalid. Please Try Again";
  if (isEmpty(data.sellers_Names)) errors.sellers_Names = "Please Enter Seller/'s Names";
  if (isEmpty(data.date)) errors.date = "Please Enter The Date of the Open House";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

// Validates the Attendee Data
exports.validateAttendeeData = (data) => {
  let errors = {};

  if (isEmpty(data.full_Name)) errors.full_Name = "Please Enter Attendee Name";
  if (isEmpty(data.email) || isEmail(data.email) === false) errors.email = "Email Not Valid / Empty";
  if (isEmpty(data.number) || isPhone(data.number) === false) errors.number = "Please Enter Valid Phone Number";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

// Validates Calendar Entries
exports.validateCalendarData = (data) => {
  let errors = {};
  if(isEmpty(data.title)) errors.title = "Please Enter a Title for the Event";
  if(isEmpty(data.description)) errors.description = "Please Enter a Description for the Event";
  if(isEmpty(data.start)) errors.start = "Please Enter a Start Date";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}
