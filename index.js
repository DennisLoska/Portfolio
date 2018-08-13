var express = require('express')
var app = express()
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var router = express.Router();

app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
    response.send('Hello World!')
})

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
    var message = req.body.message

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codedennis1@gmail.com',
            pass: '5a934d20'
        }
    });

    var mailOptions = {
        from: email,
        to: 'd.loska@hotmail.de',
        subject: 'Contact message from ' + name + ' - ' + phone + ' - ' + email ,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({success:false})
        } else {
            console.log('Email sent: ' + info.response);
            res.json({success:true})
        }
    });
}