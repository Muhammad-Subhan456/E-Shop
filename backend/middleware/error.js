const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb ID error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate Key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Your url is invalid Please try again";
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = "Your url is Expired Please try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
