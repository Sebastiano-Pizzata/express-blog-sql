function errorsHandler(err, req, res, next) {
    res.status(500)
    res.json({
        error: "Internal server problem",
        message: err.message
    })
}

module.exports = errorsHandler