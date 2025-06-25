// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isSignIn, setIsSignIn]                 = useState(true);
  // Sign-in
  const [signInUser, setSignInUser]             = useState("");
  const [signInPass, setSignInPass]             = useState("");
  const [showSignInPassword, setShowSignInPwd]  = useState(false);

  const [email, setEmail]                       = useState("");   // NEW
  const [otp,   setOtp]                         = useState("");

  const [msg, setMsg]= useState("");
  const navigate = useNavigate();
  const handleFormToggle = (signIn) => {
    setMsg("");
    setIsSignIn(signIn);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
  };

  const checkEmail = (e) => {
    e.preventDefault();
  };

  return (
    <div id="webcrumbs">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <img
          src="/images/pair.png"
          alt=""
          className="hidden lg:block w-1/3 max-w-md mr-10"
        />

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl
                        border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined
                               bg-gradient-to-r from-slate-400 to-indigo-600
                               text-white text-2xl rounded-lg px-4 py-2">
                IITK Study Buddy
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                Welcome
              </h1>
              <p className="text-gray-600">
                Sign in to your account or create a new one
              </p>
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium transition
                  ${isSignIn ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600"}`}
                onClick={() => handleFormToggle(true)}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 rounded-md text-sm font-medium transition
                  ${!isSignIn ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600"}`}
                onClick={() => handleFormToggle(false)}
              >
                Sign Up
              </button>
            </div>
{/* sign in form  */}
            {isSignIn && (
              <form className="space-y-4" onSubmit={handleSignInSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    IITK Email Address
                  </label>
                  <input
                    type="text"
                    value={signInUser}
                    onChange={(e) => setSignInUser(e.target.value)}
                    placeholder="username"
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showSignInPassword ? "text" : "password"}
                      value={signInPass}
                      onChange={(e) => setSignInPass(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full border rounded-lg px-4 py-3 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPwd(!showSignInPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      <span className="material-symbols-outlined">
                        {showSignInPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <a href="#" className="text-indigo-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                {msg && <p className="text-red-600 text-sm">{msg}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-500 to-indigo-600
                             text-white py-3 rounded-lg mt-2 hover:opacity-90"
                >
                  Sign In
                </button>
              </form>
            )}
{/* signup form */}

            {!isSignIn && (
              <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    IITK Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={checkEmail}
                      placeholder="yourname@iitk.ac.in"
                      className="w-full border rounded-lg px-4 py-3 pr-28"
                    />
                    <button
                      // onClick={generateOTP}
                      className="absolute right-2 top-2 bg-zinc-900
                                 text-white rounded-lg px-3 py-1 text-xs"
                    >
                      Generate OTP
                    </button>
                  </div>
                </div>
                <label className="block text-sm font-medium mb-2">
                  One Time Password</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
                <div className="flex justify-between text-sm">
                  <a href="#" className="text-indigo-600 hover:underline">
                    Resend OTP
                  </a>
                </div>
                {msg && <p className="text-red-600 text-sm">{msg}</p>}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-500 to-indigo-600
                             text-white py-3 rounded-lg mt-2 hover:opacity-90"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>

          <div className="px-8 py-6 bg-gray-50 text-center text-sm">
            Need help?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Contact Support``
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;