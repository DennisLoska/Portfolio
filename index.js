var express = require('express')
var app = express()
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var options = require('./options');
var request = require('request');
var path = require("path");
var router = express.Router();

app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
    response.sendFile('index.html')
})

app.get('/privacy', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/privacy.html'));
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
})

// parse application/json
app.use(bodyParser.json())
app.use('/sendMail', router);
router.post('/', handleSendMail); // handle the route at yourdomain.com/sayHello

function handleSendMail(req, res) {
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phone
    var subject = req.body.subject
    var message = req.body.message
    var recaptcha = req.body.recaptcha

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: options.storageConfig.user,
            pass: options.storageConfig.password
        }
    });

    var mailOptions = {
        from: email,
        to: options.storageConfig.mailto,
        subject: "Portfolio - " + name + " - " + email + " - " + phone + " - " +  subject,
        text: message
    };

    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if (recaptcha === undefined || recaptcha === '' || recaptcha === null) {
        return res.json({
            "responseCode": 1,
            "responseDesc": "Please select captcha"
        });
    }
    // Put your secret key here.
    var secretKey = options.storageConfig.secret;
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl =
        "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + recaptcha + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            res.json({
                "responseCode": 1,
                "responseDesc": "Failed captcha verification"
            });
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({
                    "success": false
                })
            } else {
                console.log('Email sent: ' + info.response);
                res.json({
                    "success": true
                })
            }
        });
    });
}