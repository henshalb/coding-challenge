class BadRequest extends Error {
    // Custom error for bad request
    constructor(message) {
        super(message);
        this.name = "BadRequest";
    }
}

module.exports = BadRequest