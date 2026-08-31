import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { authClient } from "../app/lib/auth-client";

type LoginModalProps = {
  tableId: string;
  showGuest?: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export default function LoginModal({
  tableId,
  showGuest = true,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  async function sendOTP() {
    if (!phoneNumber) {
      setError("Enter your phone number");
      return;
    }

    setError("");
    setLoading(true);

    const { error } = await authClient.phoneNumber.sendOtp({
      phoneNumber,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to send OTP");
      return;
    }

    setOtpSent(true);
  }

  async function verifyOTP() {
    if (!otp) {
      setError("Enter the OTP");
      return;
    }

    setError("");
    setLoading(true);

    const { error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code: otp,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Invalid OTP");
      return;
    }

    onClose();

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  }

  function continueAsGuest() {
    sessionStorage.setItem(`guest-${tableId}`, "true");
    onClose();
  }

  async function resendOTP() {
    if (resendCooldown > 0) return;

    setError("");
    setLoading(true);

    const { error } = await authClient.phoneNumber.sendOtp({
      phoneNumber,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to resend OTP");
      return;
    }

    setResendCooldown(30);
    setError("OTP resent successfully");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-[#2c211b]">
            Welcome to Kissa Mori
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {otpSent
              ? `Enter the OTP sent to ${phoneNumber}`
              : "Login to continue your order"}
          </p>
        </div>

        {!otpSent ? (
          <>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone number
            </label>

            <input
              type="tel"
              placeholder="+91 9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#3b261c]"
            />

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full rounded-xl bg-[#302019] py-3 text-sm font-medium tracking-wide text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Continue with OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-lg tracking-[0.4em] outline-none focus:border-[#3b261c]"
            />

            {error && (
              <p className="mb-4 text-center text-sm text-red-500">{error}</p>
            )}

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full rounded-xl bg-[#302019] py-3 text-sm font-medium uppercase tracking-wide text-white disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={resendOTP}
              disabled={loading || resendCooldown > 0}
              className="mt-4 w-full text-sm text-text-secondary disabled:opacity-50"
            >
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
            </button>

            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError("");
              }}
              className="mt-3 w-full text-sm text-gray-500 hover:text-gray-800"
            >
              Change phone number
            </button>
          </>
        )}

        {showGuest && (
          <>
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              onClick={continueAsGuest}
              className="w-full rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Continue as Guest
            </button>
          </>
        )}
      </div>
    </div>
  );
}
