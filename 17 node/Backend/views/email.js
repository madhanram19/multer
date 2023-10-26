var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ramkumarpalraj19@gmail.com',
        pass: 'syff aqdf utug qcvf'
    }
});

var mailOptions = {
    from: 'ramkumarpalraj19@gmail.com',
    to: 'luci159763@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
