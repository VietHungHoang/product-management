const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

    const products = await Product.find({
        status: "active", 
        deleted: false
    });

    console.log(products);

    res.render("clients/pages/products/index",{
        pageTitle: "Products", 
        products: products
    });
};