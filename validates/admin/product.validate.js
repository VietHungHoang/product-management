module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        req.flash("error", "Please insert titile");
        res.redirect("back");
        return;
    }
    next();
};