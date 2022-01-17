const nodemailer = require("nodemailer");

module.exports = {
  SendMail({ email, content }) {
    var transporter = nodemailer.createTransport({
      // config mail server
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTPEMAIL,
        pass: process.env.SMTPPASSWORD,
      },
      from: "ntdmyclassroom",
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mainOptions = {
      from: "room class <ntdmyclassroom@gmail.com>",
      to: email,
      subject: "My Classroom Notification",
      text: "",
      html: content,
    };

    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Message sent: " + info.response);
        return true;
      }
    });
  },
};
