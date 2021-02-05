const buildResponse = (status, message, data) => {
    return {
      status: status,
      operation: status === 200 ? "succeded" : "failed",
      description: message,
      data: data
    };
  };
  
module.exports = buildResponse;