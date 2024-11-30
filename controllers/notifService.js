const twilio = require("twilio");

// Replace these with your actual Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token
console.log(
  accountSid,
  authToken,
  process.env.TWILIO_PHONE_NUMBER,
  process.env.MY_PHONE
);

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
      from: process.env.TWILIO_PHONE_NUMBER, // Replace with your Twilio number
      to: process.env.MY_PHONE, // The user's phone number
    });
    console.log(`Message sent: ${messageResponse.sid}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

module.exports = { sendSmsNotification };
