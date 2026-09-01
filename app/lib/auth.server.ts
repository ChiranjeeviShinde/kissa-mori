import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { phoneNumber } from "better-auth/plugins";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import client, { db } from "./mongodb.server";

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
        console.log(`OTP for ${phoneNumber}: ${code}`);
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
