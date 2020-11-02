let express = require('express');
let app = express();
let nodemailer = require('nodemailer');
let bodyParser = require('body-parser');
let options = require('./options');
let request = require('request');
let path = require('path');
let router = express.Router();

app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.get('/privacy', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/privacy.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});

// parse application/json
app.use(bodyParser.json());
app.use('/sendMail', router);
router.post('/', handleSendMail); // handle the route at yourdomain.com/sayHello

function handleSendMail(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let subject = req.body.subject;
  let message = req.body.message;
  let recaptcha = req.body.recaptcha;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: options.storageConfig.user,
      pass: options.storageConfig.password
    }
  });

  let mailOptions = {
    from: email,
    to: options.storageConfig.mailto,
    subject:
      'Portfolio - ' + name + ' - ' + email + ' - ' + phone + ' - ' + subject,
    text: message
  };

  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (recaptcha === undefined || recaptcha === '' || recaptcha === null) {
    return res.json({
      responseCode: 1,
      responseDesc: 'Please select captcha'
    });
  }
  // Put your secret key here.
  let secretKey = options.storageConfig.secret;
  // req.connection.remoteAddress will provide IP address of connected user.
  let verificationUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' +
    secretKey +
    '&response=' +
    recaptcha +
    '&remoteip=' +
    req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl, function(error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      res.json({
        responseCode: 1,
        responseDesc: 'Failed captcha verification'
      });
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.json({
          success: false
        });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({
          success: true
        });
      }
    });
  });
}
