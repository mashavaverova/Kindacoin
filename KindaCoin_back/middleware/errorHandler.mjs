import fs from 'fs';
import path from 'path';
import ErrorResponse from '../utilities/ErrorResponseModel.mjs';


const errorHandler = (err, req, res, next) => {
  let error = { ...err };



  const logDirectory = path.join(__appdir, 'logs');
  const filePath = path.join(logDirectory, 'error.log');

  error.message = err.message;

  if (err.name === 'CastError') {
    const message = `Kan inte hitta resursen med id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = `Resursen finns redan`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(`Information saknas: ${message}`, 400);
  }


  // Ensure the logs directory exists
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // Create a consistent timestamp
  const now = new Date();
  const timestamp = `${now.toLocaleDateString('sv-SE')} ${now.toLocaleTimeString('sv-SE')}`;

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'internal server error';

  const message = `${timestamp},
    Method: ${req.method},
    URL: ${req.originalUrl},
    Status: ${error.statusCode},
    Success: false,
    Message: ${error.message}\n`;

  // Append the error log message to the file, handling errors
  fs.appendFile(filePath, message, (err) => {
    if (err) {
      console.error('Error writing to error log file:', err);
    }
  });

  
  res.status(error.statusCode || 500).json({
    success: false,
    statusCode: error.statusCode || 500,
    error: error.message || 'Server Error',
   });
  }



export default errorHandler;
