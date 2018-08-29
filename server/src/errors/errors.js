export default app => {
  // Error forwarding - If reach here, throw error
  app.use((req, res, next) => {
    const err = new Error('Unreachable Route');
    err.status = 404;
    next(err);

    // If next() has a param {
    //    call the next app.use() which has exactly 4 parameters, passing alongthe error
    //    First parameter of the 4 will be the error passed by next() in this function.
    // } else if next() doesnt include params {
    //    call next middleware (app.use)
    // }
  });

  // Error handling - Method will only be called if next() has parameter
  app.use((err, req, res, next) => {
    res.send(err);
  });
};
