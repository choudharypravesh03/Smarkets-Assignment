export class AppError extends Error {
  
    constructor(name, description, httpCode, details) {
      super(description)
  
      Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  
      this.name = name
      this.status = httpCode
      this.details = details
  
      Error.captureStackTrace(this)
    }
  }
  