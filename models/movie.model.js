const mongoose = require('mongoose');
const multer= require("multer")
const path= require("path")

MovieSchema = mongoose.Schema({
    movieName: String,
    discription: String,
    price: String,
    image: String,
})




const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
      cb(null, path.join(__dirname, "..", "uploads/admins"))
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname+"-"+Date.now())
    }
  })

  MovieSchema.statics.uploadImage = multer({storage}).single('image');

  const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
