function errorNotFound(req, res, next) {
    res.status(404);

    res.json({
        error: "Not Found",
        message: "Post non trovato"
    })
}

module.exports = errorNotFound;