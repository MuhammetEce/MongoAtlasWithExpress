class ApiError {
  constructor (
    error = true,
    message = 'Service Unavailable.',
    status = 503,
    data = null,
    timestamp = null,
  ) {
    this.error = error;
    this.message = message;
    this.status = status;
    this.data = data;
    this.timestamp = timestamp;
  }

  toJSON () {
    return {
      error: this.error,
      message: this.message,
      status: this.status,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}

class JSONResponse {
  constructor (
    error = false,
    message = '',
    status = 200,
    data = null,
    timestamp = null,
  ) {
    this.error = error;
    this.message = message;
    this.status = status;
    this.data = data;
    this.timestamp = timestamp;
  }

  toJSON () {
    return {
      error: this.error,
      message: this.message,
      status: this.status,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}

module.exports = {
  ApiError,
  JSONResponse,
};
