import { api } from "./api";

/**
 * @param {string} email
 * @returns {Promise<string>} – success message from server
 */
export const requestOtp = async (email) => {
  if (!email) throw new Error("E-mail is required");

  const { data } = await api.post("/api/auth/generate-otp", { email });
  return data.message;  // e.g. “OTP sent”
};
