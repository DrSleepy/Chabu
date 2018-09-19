const appendErrorsHandler = (errors, initialState) => {
  const formErrors = { ...initialState }; // get all properties of error object

  errors.forEach(error => {
    const property = [error.path[0]]; // get property of error
    formErrors[property].push(error.message); // push error message to property in object
  });

  return formErrors;
};

export default appendErrorsHandler;
