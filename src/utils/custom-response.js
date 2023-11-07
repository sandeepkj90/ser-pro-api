const CustomeResponse = {
  sendResponse: (status, data, message) => {
    return {
      status: status,
      data: data || '',
      message: message || '',
    };
  },
  errorResponse: (status, ErrorData, errorMessage) => {
    return {
      status: status,
      error: ErrorData || '',
      message: errorMessage || '',
    };
  },
};
module.exports = CustomeResponse;
