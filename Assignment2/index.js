const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
      //console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({ storage: storage });

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/car', db.getCars)
app.get('/car/:id', db.getCarsById)
app.post('/car', db.createCar)
app.delete('/car/:id', db.deleteCar)
app.post('/upload/:id',upload.single('CarImage'),function(req,res,next){
  
  if (!req.file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  else{
      db.insertCarImage(req,res)
  }
  
})

app.use('*/images',express.static('uploads/images'));

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

