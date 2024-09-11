const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    // Filter following status
    let queryStatus = req.query.status;
    if(queryStatus) find.status = queryStatus;
    const filterStatus = filterStatusHelper(queryStatus);

    // Filter following search keyword
    let keyword = req.query.keyword;
    const regex = RegExp(keyword, "i");
    if(keyword) find.title = regex;
    
    const products = await Product.find(find);
    // console.log(products);

    res.render("admin/pages/products/index", {
        products: products,
        filterStatus: filterStatus, 
        keyword: keyword
    });
};