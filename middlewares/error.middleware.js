function error(err, req, res, next) {
  // here req and next can't be visible

  res.send({
    acknowledgement: false,
    message: err.name,
    description: err.message,
  });
}

module.exports = error;
