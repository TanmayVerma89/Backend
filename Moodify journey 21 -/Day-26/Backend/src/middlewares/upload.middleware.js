const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*10      // Max limit for uploading file 10 mb
    }
})

module.exports = upload;