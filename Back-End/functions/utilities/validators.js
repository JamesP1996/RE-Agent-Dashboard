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

  if (isEmpty(data.email)) errors.email = "Email must not be empty";
  if (isEmpty(data.password)) errors.password = "Password cannot be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateNoteData = (data) => {
  let errors = {};

  if (isEmpty(data.title)) errors.title = "Note Requires a Title";
  if (isEmpty(data.description)) errors.description = "Descriptionm must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateTodoData = (data) => {
  let errors = {};

  if (isEmpty(data.Title)) errors.title = "Todo must not be empty";
  if (isEmpty(data.Description)) errors.description = "Description cannot be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateListingData = (data) => {
  let errors = {};
  if (isEmpty(data.owners)) errors.owners = "House needs Owners";
  if (isEmpty(data.sqft)) errors.sqft = "Please Enter Sqft";
  if (isEmpty(data.sqft_Lot)) errors.sqft_Lot = "Please Enter Sqft_Lot";
  if (isEmpty(data.address)) errors.address = "House needs an Address";
  if (isEmpty(data.price)) errors.price = "Price cannot be empty";
  if (isEmpty(data.style)) errors.style = "House Style cannot be empty";
  if (isEmpty(data.stories)) errors.stories = "Please Enter Stories";
  if (isEmpty(data.bathrooms)) errors.bathrooms = "Please Enter Number of Bathrooms";
  if (isEmpty(data.bedrooms)) errors.bedrooms = "Please Enter Number of Bedrooms";
  if (isEmpty(data.cooling)) errors.cooling = "Please Enter Cooling Type";
  if (isEmpty(data.heating)) errors.heating = "Please Enter Heating Type";
  if (isEmpty(data.parking)) errors.parking = "Please Enter Parking Type";
  if (isEmpty(data.basement)) errors.basement = "Please Enter Basement Information";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateOpenHouseData = (data) => {
  let errors = {};
  if (isEmpty(data.property_Name)) errors.property_Name = "House needs Owners";
  if (isEmpty(data.sqft)) errors.sqft = "Please Enter Sqft";
  if (isEmpty(data.sqft_Lot)) errors.sqft_Lot = "Please Enter Sqft_Lot";
  if (isEmpty(data.address)) errors.address = "House needs an Address";
  if (isEmpty(data.price)) errors.price = "Price cannot be empty";
  if (isEmpty(data.sellers_Names)) errors.sellers_Names = "Please Enter Seller/'s Names";
  if (isEmpty(data.date)) errors.date = "Please Enter The Date of the Open House";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateAttendeeData = (data) => {
  let errors = {};

  if (isEmpty(data.full_Name)) errors.full_Name = "Please Enter Attendee Name";
  if (isEmpty(data.email) || isEmail(data.email) === false) errors.email = "Email Not Valid / Empty";
  if (isEmpty(data.number)) errors.number = "Please Enter Phone Number";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

exports.validateCalendarData = (data) => {
  if(isEmpty(data.title)) errors.title = "Please Enter a Title for the Event";
  if(isEmpty(data.description)) errors.description = "Please Enter a Description for the Event";
  if(isEmpty(data.start)) errors.start = "Please Enter a Start Date";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}
