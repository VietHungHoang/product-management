const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route")

const systemConfig = require("../../config/system");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    console.log(PATH_ADMIN);
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/products", productRouter);
};