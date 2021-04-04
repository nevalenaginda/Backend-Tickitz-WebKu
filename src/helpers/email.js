const nodemailer = require("nodemailer");
const { envEmail, envEmailPass, envURLBackEnd } = require("../helpers/env");

let transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  service: "Gmail",
  auth: {
    user: envEmail, // generated ethereal user
    pass: envEmailPass, // generated ethereal password
  },
});
const sendEmail = (email, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let info = await transporter.sendMail({
        from: "nevalen.aginda1532@students.unila.ac.id", // sender address
        to: email, // list of receivers
        subject: "Activation account.", // Subject line
        html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${envURLBackEnd}/user/activate/${token}/${email}>Click here to verify</a>`,
      });
      resolve(info);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  sendEmail,
};
