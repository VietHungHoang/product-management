const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    // Filter following status
    let filterStatus = [
        {
            name: "Tất cả", 
            status:"", 
            class: ""
        }, 
        {
            name: "Hoạt động", 
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động", 
            status: "inactive",
            class: ""
        }
    ];
    let queryStatus = req.query.status;
    if(queryStatus){
        const index = filterStatus.findIndex(item => item.status == queryStatus);
        filterStatus[index].class = "active";
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    if(queryStatus) find.status = queryStatus;

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