module.exports = (objectPagination, query, countProducts) => {
    objectPagination.currentPage = query.page ? parseInt(query.page) : 1;
    objectPagination.skip = Math.max((objectPagination.currentPage - 1) * objectPagination.limitItems, 0);
    objectPagination.totalPage = Math.ceil(countProducts / objectPagination.limitItems)
    return objectPagination;
}