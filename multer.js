const multer = require('multer')
const storage = multer.diskStorage([])
const upload = multer({storage:storage})
const uploadMiddleware = multer({ storage: storage });
module.exports = uploadMiddleware;