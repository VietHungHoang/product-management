const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {

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

    let find = {
        deleted: false
    }
    console.log(filterStatus);

    let queryStatus = req.query.status;

    if(queryStatus){
        const index = filterStatus.findIndex(item => item.status == queryStatus);
        filterStatus[index].class = "active";
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    console.log(filterStatus);

    if(queryStatus) find.status = queryStatus;

    const products = await Product.find(find);
    // console.log(products);

    res.render("admin/pages/products/index", {
        products: products,
        filterStatus: filterStatus
    });
};