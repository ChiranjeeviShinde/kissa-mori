import { useState } from "react";
import { authClient } from "../lib/auth-client";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  async function sendOTP() {
    setMessage("");

    const { error } = await authClient.phoneNumber.sendOtp({
      phoneNumber,
    });

    if (error) {
      setMessage(error.message || "Failed to send OTP");
      return;
    }

    setOtpSent(true);
    setMessage("OTP sent");
  }

  async function verifyOTP() {
    setMessage("");

    const { error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code: otp,
    });

    if (error) {
      setMessage(error.message || "Invalid OTP");
      return;
    }

    setMessage("Logged in successfully");
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-semibold">Login</h1>

      {!otpSent ? (
        <>
          <input
            type="tel"
            placeholder="+919876543210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-4 w-full rounded border p-3"
          />

          <button
            onClick={sendOTP}
            className="w-full rounded bg-black p-3 text-white"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <p className="mb-4 text-sm">OTP sent to {phoneNumber}</p>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4 w-full rounded border p-3"
          />

          <button
            onClick={verifyOTP}
            className="w-full rounded bg-black p-3 text-white"
          >
            Verify OTP
          </button>
        </>
      )}

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
