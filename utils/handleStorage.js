const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const pathStorage = `${__dirname}/../storage`
        cb(null, pathStorage)
    },
    filename: function(req, file, cb) {
        //TODO: mi-cv.pdf, mi-foto.png, mi-video.mp4

        const ext = file.originalname.split(".").pop() //TODO ["name", "png"]  // pop() toma el último valor de un array
        const filename = `file-${Date.now()}.${ext}`; //Le podemos un nombre aleatorio para no duplicarlos o sobre escribir lo que suban
        cb(null, filename)

    }, 
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;