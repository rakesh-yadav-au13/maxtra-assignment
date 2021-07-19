const nodemailer = require("nodemailer");

const nodeMailer = async (email, otpcode) => {
  const adminEmail = "rakesh350@gmail.com";
  const password = 123456;
  let data = "";
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    let mailDetails = {
      from: "royalraoshab350@gmail.com",
      to: email,
      subject: "Test mail",
      text: `Your OTP is ${otpcode}`,
    };

    transporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      } else {
        data = data;
      }
    });
  });
  return data;
};
export default nodeMailer;
