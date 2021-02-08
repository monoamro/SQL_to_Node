const buildResponse = require('./response');
const verify = {
  query: (orderby, sort, controller) => {
    const okColumns = [
      'rating',
      'topicId',
      'firstname',
      'lastname',
      'username',
      'premiumid',
    ];

    const okSorts = ['desc', 'asc'];

    if (!okColumns.includes(orderby)) {
      const response = buildResponse(
        400,
        `Wrong column name, choose between: [${
          controller === 'posts' ? okColumns.slice(0, 2) : okColumns.slice(-4)
        }] `
      );
      throw response;
    }

    if (!okSorts.includes(sort)) {
      const response = buildResponse(
        400,
        `Wrong sort order, choose between: [${okSorts}]`
      );
      throw response;
    }
  },
  id: (id, limit, data, idTitle) => {
    if (id < limit) {
      const response = buildResponse(400, `Wrong ${idTitle}Id`);
      throw response;
    }
    if (data.rows.length === 0) {
      const response = buildResponse(
        404,
        `No ${idTitle}(s) with id:${id} found`
      );
      throw response;
    }
  },
  rating: rating => {
    const parsedRating = parseInt(rating);
    if (
      !Number.isInteger(parsedRating) ||
      !(parsedRating >= 1 && parsedRating <= 5)
    ) {
      const response = buildResponse(
        400,
        `Rating must be an integer between 1 and 5`
      );
      throw response;
    }
  },

  searchData: (searchData, limit, pattern) => {
    if (searchData.length > limit) {
      const response = buildResponse(
        400,
        `Search must be a string limited to ${limit} characters`
      );
      throw response;
    }
  },
};

module.exports = verify;
