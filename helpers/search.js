module.exports = (query) => {
    let objectSearch = {
        keyword: query.keyword, 
        regex: RegExp(query.keyword, "i")
    }
    return objectSearch;
}