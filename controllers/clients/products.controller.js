const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

    const products = await Product.find({});

    console.log(products);

    res.render("clients/pages/products/index",{
        pageTitle: "Products"
    });
};