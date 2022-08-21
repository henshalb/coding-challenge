const errorHandler = (error, response) => {

    if (error.name == 'ValidationError') {
        response.status(422).json({ "status": error.message });
    }
    else if (error.name == "BadRequest") {
        response.status(400).json({ "status": error.message });
    }
    else {
        response.status(404).json({ "status": error.message })
    }

    return error, response
}

module.exports = errorHandler