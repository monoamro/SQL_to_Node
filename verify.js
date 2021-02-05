const buildResponse = require('./response');
const verify = {
  query: (orderby, sort) => {
    const okColumns = ['rating', 'topicid'];
    const okSorts = ['desc', 'asc'];
    if(!okColumns.includes(orderby)) {
      const response = buildResponse(400, `Wrong column name, choose between ["rating", "topicid"]`);
      throw response;
    }
    if(!okSorts.includes(sort)) {
      const response = buildResponse(400, `Wrong sort order, choose between ["desc", "asc"]`);
      throw response;
    }
  },
  id: (id, limit, data, idTitle) => {
    if (id < limit) {
      const response = buildResponse(400, `Wrong ${idTitle}Id`);
      throw response;
    }
    if (data.rows.length === 0) {
      const response = buildResponse(404, `No posts were found`);
      throw response;
    }
  },
  rating: (rating) => {
    const parsedRating = parseInt(rating);
    if (
      !Number.isInteger(parsedRating) ||
      !(parsedRating >= 1 && parsedRating <= 5)
    ) {
      const response = buildResponse(400, `Rating must be an integer between 1 and 5`);
      throw response;
    }
  }
}

module.exports = verify;