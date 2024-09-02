const dashboardRouter = require("./dashboard.route")

module.exports = (app) => {
    app.use("/admin", dashboardRouter);
};