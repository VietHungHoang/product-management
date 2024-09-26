const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);


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

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});
    res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    if(type == "active")  await Product.updateMany({_id: {$in: ids}}, {status: "active"});
    else  await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});

    res.redirect("back");
};


//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await  Product.updateOne({_id: id}, {
        deleted:true, 
        deleteAt: new Date()
    });
    res.redirect("back");
};
