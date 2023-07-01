const responseMulterError = (res, result, status, message) => {
    const resultPrint = {}
    
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.message = message || null
    res.status(status).json(resultPrint)
  }
  
  module.exports = {
    responseMulterError
  }
  