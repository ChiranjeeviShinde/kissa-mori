import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { phoneNumber } from "better-auth/plugins";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import twilio from "twilio";

import client, { db } from "./mongodb.server";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [
    phoneNumber({
      phoneNumberValidator: (phoneNumber) => {
        const parsed = parsePhoneNumberFromString(phoneNumber);
        return parsed?.isValid() ?? false;
      },

      sendOTP: async ({ phoneNumber, code }) => {
        if (process.env.USE_FAKE_OTP === "true") {
          console.log(`FAKE OTP for ${phoneNumber}: ${code}`);
          return;
        }

        await twilioClient.messages.create({
          body: `Your Kissa Mori verification code is ${code}`,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: phoneNumber,
        });
      },

      expiresIn: 300,

      signUpOnVerification: {
        getTempEmail: (phoneNumber) =>
          `${phoneNumber.replace(/\D/g, "")}@coffee.local`,

        getTempName: (phoneNumber) => phoneNumber,
      },

      requireVerification: true,
    }),
  ],
});
