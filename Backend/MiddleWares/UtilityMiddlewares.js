function isAdmin(req, res, next) {
    if (req.body.user !== "admin") {
        return res.status(403).send("Forbidden Access");
    }
    next();
}

function isMallManager(req, res, next) {
    if (req.body.user !== "MM") {
        return res.status(403).send("Forbidden Access");
    }
    next();
}

function isLoggedIn(req, res, next) {
    if (!req.body.user)
        return res.status(403).send("Login First");

    next();
}



module.exports = { isAdmin, isMallManager, isLoggedIn };