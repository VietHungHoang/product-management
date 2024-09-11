const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHepler = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHepler(req.query);


    let find = {
        deleted: false
    }

    // Filter following status
    if(req.query.status) find.status = req.query.status;

    // Filter following search keyword
    if(objectSearch.keyword) find.title = objectSearch.regex;

    // Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItems: 4
        }, 
        req.query, 
        countProducts
    );
    
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render("admin/pages/products/index", {
        products: products,
        filterStatus: filterStatus, 
        keyword: objectSearch.keyword, 
        pagination: objectPagination
    });
};