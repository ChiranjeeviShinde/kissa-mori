import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { authClient } from "../app/lib/auth-client";
import { ChevronDown } from "lucide-react";

const countries = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
];

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
  const [countryCode, setCountryCode] = useState("+91");
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const fullNumber = `${countryCode}${phoneNumber}`;

    setError("");
    setLoading(true);

    const { error } = await authClient.phoneNumber.sendOtp({
      phoneNumber: fullNumber,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Failed to send OTP");
      return;
    }

    setFullPhoneNumber(fullNumber);
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
      phoneNumber: fullPhoneNumber,
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

            <div className="mb-4 flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none focus:border-[#3b261c]"
              >
                {countries.map((country) => (
                  <option
                    key={`${country.name}-${country.code}`}
                    value={country.code}
                  >
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ""))
                }
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#3b261c]"
              />
            </div>

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
            <div className="mb-4 grid w-full grid-cols-6 gap-2 sm:gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    otpRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  autoFocus={index === 0}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (!value) return;

                    const newOtp = otp.split("");
                    newOtp[index] = value;
                    setOtp(newOtp.join(""));

                    if (index < 5) {
                      otpRefs.current[index + 1]?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      e.preventDefault();

                      const newOtp = otp.split("");
                      newOtp[index] = "";
                      setOtp(newOtp.join(""));

                      if (index > 0) {
                        otpRefs.current[index - 1]?.focus();
                      }
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();

                    const pasted = e.clipboardData
                      .getData("text")
                      .replace(/\D/g, "")
                      .slice(0, 6);

                    if (!pasted) return;

                    setOtp(pasted);

                    const nextIndex = Math.min(pasted.length, 5);
                    otpRefs.current[nextIndex]?.focus();
                  }}
                  className="caret-transparent h-14 w-full rounded-xl border border-gray-300 bg-white text-center text-xl font-medium outline-none focus:border-[#3b261c] focus:ring-1 focus:ring-[#3b261c] sm:h-14 sm:text-xl"
                />
              ))}
            </div>

            {error && (
              <p className="mb-4 text-center text-sm text-red-500">{error}</p>
            )}

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full rounded-xl bg-[#302019] py-3 text-sm font-medium tracking-wide text-white disabled:opacity-50"
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
