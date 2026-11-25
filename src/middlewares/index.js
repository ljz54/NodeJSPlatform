/* Middleware that adds a header containing the time the request arrived to the REST service */
function requestTime(req, res, next) {
  const arrivalTime = new Date();
  req.requestArrivalTime = arrivalTime.toISOString();
  res.set('X-Request-Arrival-Time', req.requestArrivalTime);
  next();
}

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found', req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  requestTime,
  notFound,
  errorHandler,
};
