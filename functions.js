const functions = {
  verifyQuery: (orderby, sort) => {
    const okColumns = ['rating', 'topicid'];
    const okSorts = ['desc', 'asc'];
    if (okColumns.includes(orderby) && okSorts.includes(sort)) {
      return;
    } else {
      const response = { status: 400, message: 'wrong sort type' };
      throw response;
    }
  },
};

module.exports = functions;
