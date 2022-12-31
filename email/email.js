const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
  "173120448715-vltjhfgtehk80213e0bmkp1fh2ab4s6d.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
  "1//0407PCA2R4WbECgYIARAAGAQSNwF-L9Ir78aaHFMVjpiyAeoNRj0wbNolaMNUpVBrYt5XylG-H1bmNOmVHfjH2yyx43fmt8g7Jvo";
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
        user: "executivelaundry001@gmail.com",
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
      from: "Executive Laundry👔👔👕👕👖👖👗 <executivelaundry001@gmail.com>",
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
        user: "executivelaundry001@gmail.com",
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
      from: "New Laundry👔👔👕👕👖👖👗 <executivelaundry001@gmail.com>",
      to: "executivelaundry22@gmail.com",
      // to: "samuelolorunda1@gmail.com",
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
