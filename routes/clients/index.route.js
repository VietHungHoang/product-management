module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render("clients/pages/home/index");
    })
    
    app.get('/products', (req, res) => {
        res.render("clients/pages/products/index");
    })
};