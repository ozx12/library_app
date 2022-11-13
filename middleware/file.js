const multer = require('multer');

function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }



const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/img');
    },
    filename(req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${Date.now()}-${makeid()}${ext}`);
    }
})

module.exports = multer({storage});
