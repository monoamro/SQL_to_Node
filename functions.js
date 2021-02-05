const functions = {
    verifyQuery: (orderby, sort) => {
        const okColumns = ['rating', 'topicId'];
        const okSorts = ['desc', 'asc'];
        if(okColumns.includes(orderby) && okSorts.includes(sort)) {
            return;
        } else {
            const responce = {status: 400, message: "wrong sort type"}
            throw responce;
        }
    }

}

module.exports = functions;