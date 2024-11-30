// // notificationService.js
// require("dotenv").config(); // Load environment variables
// // import twilio from "twilio";
// import twilio from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID
// const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token
// const client = new twilio(accountSid, authToken); // Create a Twilio client

// /**
//  * Function to send SMS notifications
//  * @param {string} to - The recipient's phone number
//  * @param {string} message - The message to send
//  */
// const sendSmsNotification = async (to, message) => {
//   try {
//     const messageResponse = await client.messages.create({
//       body: `this is your notification`,
//       from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
//       to: +917045054597, // Recipient's phone number
//     });

//     console.log("Message sent:", messageResponse.sid);
//   } catch (error) {
//     console.error("Error sending SMS:", error.message);
//   }
// };

// import twilio from "twilio";
// const client = new twilio("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"); // Your Twilio credentials

// const sendSmsNotification = async () => {
//   const userPhoneNumber = "+11234567890"; // Your actual phone number in E.164 format
//   const message = `This is your notification!`;

//   try {
//     const messageResponse = await client.messages.create({
//       body: message, // The message content
//       from: "your-twilio-number", // Replace with your Twilio number
//       to: userPhoneNumber, // The user's phone number
//     });
//     console.log(`Message sent: ${messageResponse.sid}`);
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

// // Export the function using CommonJS syntax
// export default { sendSmsNotification };

// // export default { sendSmsNotification };

// const twilio = require("twilio");
// const client = new twilio("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"); // Your Twilio credentials

// const sendSmsNotification = async () => {
//   const userPhoneNumber = "+11234567890"; // Your actual phone number in E.164 format
//   const message = `This is your notification!`;

//   try {
//     const messageResponse = await client.messages.create({
//       body: message, // The message content
//       from: "your-twilio-number", // Replace with your Twilio number
//       to: userPhoneNumber, // The user's phone number
//     });
//     console.log(`Message sent: ${messageResponse.sid}`);
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

// Export the function using CommonJS syntax
// module.exports = { sendSmsNotification };

// const twilio = require("twilio");

// // Replace these with your actual Twilio credentials
// const accountSid = "AC0b4943acc3c8a18dbcb6b3cbcd770fa9"; // Your Account SID
// const authToken = "0319eb33f4e9e95ec37280e954cdde47"; // Your Auth Token

// const client = new twilio(accountSid, authToken); // Initialize the Twilio client

// const sendSmsNotification = async () => {
//   const userPhoneNumber = "+17045054597"; // Your actual phone number in E.164 format
//   const message = `This is your notification!`;

//   try {
//     const messageResponse = await client.messages.create({
//       body: message, // The message content
//       from: "your-twilio-number", // Replace with your Twilio number
//       to: userPhoneNumber, // The user's phone number
//     });
//     console.log(`Message sent: ${messageResponse.sid}`);
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

// module.exports = { sendSmsNotification };

const twilio = require("twilio");

// Replace these with your actual Twilio credentials
const accountSid = "AC0b4943acc3c8a18dbcb6b3cbcd770fa9"; // Your Account SID
const authToken = "0319eb33f4e9e95ec37280e954cdde47"; // Your Auth Token

const client = new twilio(accountSid, authToken); // Initialize the Twilio client

/**
 * Sends an SMS notification using Twilio
 * @param {string} to - The recipient's phone number in E.164 format
 * @param {string} message - The message to send
 * @returns {Promise<void>}
 */
const sendSmsNotification = async (to, message) => {
  try {
    const messageResponse = await client.messages.create({
      body: message, // The message content
      from: "+15865719171", // Replace with your Twilio number
      to: "+917045054597", // The user's phone number
    });
    console.log(`Message sent: ${messageResponse.sid}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

module.exports = { sendSmsNotification };
