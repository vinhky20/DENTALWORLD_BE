let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 5000;
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({ storage: storage });
app.post("/clinics/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})

app.post("/customers/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/public/images", express.static(path.join(__dirname, "/public/images")));

let clinics = require('./routes/clinic')
let customers = require('./routes/customer')
let services = require('./routes/service')
let timeslots = require('./routes/timeslot')
let bookings = require('./routes/booking')
let reviews = require('./routes/review')
let auth = require('./routes/auth')
let clinic_schedule = require('./routes/clinic_schedule');

clinics(app)
customers(app)
services(app)
timeslots(app)
bookings(app)
reviews(app)
auth(app)
clinic_schedule(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port);

console.log('RESTful API server started on: ' + port);
