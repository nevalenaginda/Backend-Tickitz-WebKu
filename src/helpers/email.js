const nodemailer = require("nodemailer");
const { envEmail, envEmailPass, envURLFrontEnd } = require("../helpers/env");

let transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  service: "Gmail",
  auth: {
    user: envEmail, // generated ethereal user
    pass: envEmailPass, // generated ethereal password
  },
});

const register = (email, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let info = await transporter.sendMail({
        from: envEmail, // sender address
        to: email, // list of receivers
        subject: "Activation Account Tickitz.", // Subject line
        html: `Hello,<br> Please Click this link to verify your email.<br><a href=${envURLFrontEnd}/register/activate?token=${token}&email=${email}>Click here to verify</a>`,
      });
      resolve(info);
    } catch (error) {
      console.log("error register", error);
      reject(new Error(error));
    }
  });
};

const forgotPassword = (email, user, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let info = await transporter.sendMail({
        from: envEmail, // sender address
        to: email, // list of receivers
        subject: "Reset Password Tickitz", // Subject line
        html: `Hello ${user},<br> Please Click this link to reset your password.<br><a href=${envURLFrontEnd}/forgot-password/activate?token=${token}&email=${email}>Click here to reset your password</a>`,
      });
      resolve(info);
    } catch (error) {
      console.log("error forgot password ", error);
      reject(new Error(error));
    }
  });
};

module.exports = {
  register,
  forgotPassword,
};
