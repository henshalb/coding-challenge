const mongoose = require("mongoose");
const BadRequest = require("../errors/bad.request")


const validId = (id, param) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequest("`" + param + "` is not valid: insert a valid id");
    }
}


module.exports = validId