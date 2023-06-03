const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:'public/uploads',
    filename:(req,file,cb)=>{
        console.log(file,"file")
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
module.exports.upload= multer({storage:storage})