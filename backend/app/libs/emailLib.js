const nodemailer = require('nodemailer');

let sendMail = (mailOptions) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'keshavvinay1161@gmail.com',
            pass: 'Keshav@123'
        }
    });
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = {
    sendMail
}