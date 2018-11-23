var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');

var upload = multer({dest: 'uploads/'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'))
app.use(cors());

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
 res.render('home')});

app.post('/upload', upload.single('upfile'), function(request, response) {  
response.setHeader('Content-Type', 'application/json');
response.json({fileName: request.file.originalname, type: request.file.mimetype, size: request.file.size, units: 'bytes'});
});  

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

