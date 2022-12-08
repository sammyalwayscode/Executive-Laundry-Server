const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "1040362973230-57ml7lkm6vite3po8u1m3c0eslqqqtj8.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//044GtnHtA03fnCgYIARAAGAQSNwF-L9IrLrWh16qX4YYMaRTT45KkTuATkoGOmm1AfF_htx8cgKsnXII44auI8o4ZXVKGtU1OcU0";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });

const recivedOrder = async (
  email,
  name,
  mobileNo,
  address,
  pickUp,
  delivery,
  description,
  instruction
) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "olorundasamuel2@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/mail.ejs");
    const data = await ejs.renderFile(buildFile, {
      name: name,
      email: email,
      mobileNo: mobileNo,
      address: address,
      pickUp: pickUp,
      delivery: delivery,
      description: description,
      instruction: instruction,
    });

    const mailOptions = {
      from: "Executive Laundry👔👔👕👕👖👖👗 <olorundasamuel2@gmail.com>",
      to: email,
      subject: "Your Order Has Been Recived",
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("Mail Sent Sucessfully");
    });
  } catch (error) {
    return error;
  }
};

const notifyAdmin = async (
  email,
  name,
  mobileNo,
  address,
  pickUp,
  delivery,
  description,
  instruction
) => {
  try {
    const accessToken = await oAuth.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "olorundasamuel2@gmail.com",
        refreshToken: accessToken.token,
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        accessToken: GOOGLE_REFRESHTOKEN,
      },
    });

    const buildFile = path.join(__dirname, "../views/adminMail.ejs");
    const data = await ejs.renderFile(buildFile, {
      name: name,
      email: email,
      mobileNo: mobileNo,
      address: address,
      pickUp: pickUp,
      delivery: delivery,
      description: description,
      instruction: instruction,
    });

    const mailOptions = {
      from: "New Laundry👔👔👕👕👖👖👗 <olorundasamuel2@gmail.com>",
      to: "samuelolorunda1@gmail.com",
      subject: `New Order From ${name}`,
      html: data,
    };

    transporter.sendMail(mailOptions, () => {
      console.log("Mail Sent Sucessfully");
    });
  } catch (error) {
    return error;
  }
};

module.exports = { recivedOrder, notifyAdmin };
