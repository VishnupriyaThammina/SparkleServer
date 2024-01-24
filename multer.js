const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },  
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));

  },
});
const uploadMiddleware = multer({ storage: storage });
module.exports = uploadMiddleware;