const roleModel = require("../models/roles")

module.exports.getRoles = async (req,res) =>{
    roleModel.findAll({
        attributes:["role_id", "role_name"]
    })
    .then((roles) => {
        return res.status(200).json({roles})
    })
    .catch((error) =>{
        return res.status(400).json({error})
    })
}