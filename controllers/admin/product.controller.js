const Product = require("../../models/product.model");

const systemConfig = require("../../config/system.js");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    const objectSearch = searchHelper(req.query);

    let find = {
        deleted: false,
    };

    // Filter following status
    if (req.query.status) find.status = req.query.status;

    // Filter following search keyword
    if (objectSearch.keyword) find.title = objectSearch.regex;

    // Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItems: 4,
        },
        req.query,
        countProducts
    );

    const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/products/index", {
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
};

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    

    await Product.updateOne({ _id: id }, { status: status });

    
    
    req.flash('success', 'Update success!');
    
    

    res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    if (type == "active"){
        await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
        req.flash('success', 'Update success!');
    }
    else if (type == "inactive"){
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        req.flash('success', 'Update success!');
    }
    else if (type == "delete-all")
        await Product.updateMany(
            { _id: { $in: ids } },
            { 
                deleted: true,
                deleteAt: new Date()
            }
        );
    else {
        for (const item of ids) {
            let [id, position] = item.split("-");
            position = parseInt(position);
            await Product.updateOne({_id: id}, {
                position: position
            });
        }
    }
    res.redirect("back");
};

//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
        { _id: id },
        {
            deleted: true,
            deleteAt: new Date(),
        }
    );
    res.redirect("back");
};

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Create new product"
    });
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price=parseInt(req.body.price);
    req.body.discountPercentage=parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);

    if(req.body.position == ""){
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
    }
    else{
    req.body.position = parseInt(req.body.position);
    }

    req.body.thumbnail = `/uploads/${req.file.filename}`;

    const product = new Product(req.body);
    await product.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}


