import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);


  const navigate = useNavigate();
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // TODO: call your login API here — if success:
    navigate('/campus_duo/profile');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // TODO: call your register API here — if success:
    navigate('/campus_duo/completeProfile');
  };

  const handleFormToggle = (signInSelected) => {
    setIsSignIn(signInSelected);
  };

  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-end p-20">
        <div className = "w-full max-w-md ">
          <img
            src="/public/images/pair.png"
          ></img>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-primary-100 to-indigo-600 flex items-center justify-center mx-auto mb-4 transform hover:scale-205 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-2xl">Campus Duo Stories</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome </h1>
              <p className="text-gray-600">Sign in to your account or create a new one</p>
            </div>

            {/* Toggle buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  isSignIn
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handleFormToggle(true)}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isSignIn
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handleFormToggle(false)}
              >
                Sign Up
              </button>
            </div>

            {/* Sign In Form */}
            {isSignIn && (
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-[7rem] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="username"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">@iitk.ac.in</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showSignInPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      aria-label={showSignInPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined">
                        {showSignInPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
                {/* function to change to date for renew to 7 days */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me for a week
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={handleSignInSubmit}
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {!isSignIn && (
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        placeholder="First name"
                      />
                    </div>
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-[7rem] py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="username"
                    />
                    <span className="absolute right-4 bottom-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">@iitk.ac.in</span>
                      <p className = "text-white">  .</p>
                      <button
                        class="inline-block cursor-pointer items-center justify-center rounded-xl border-[1.58px] border-zinc-600 bg-zinc-950 px-5 py-3 font-medium text-slate-200 shadow-md transition-all duration-300 hover:[transform:translateY(-.335rem)] hover:shadow-xl"
                      >
                        Generate OTP
                      </button>
                  </div>
                </div>
                
                <div>                  
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>                  
                  <div className="relative">                    
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">                                          
                      </span>                    
                      <input                      
                      type="email"                      
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"                      
                      placeholder="Enter OTP"                    
                      />                  
                  </div>                
                </div>
                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      
                    </span>
                    <input
                      type={showSignUpPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined">
                        {showSignUpPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      
                    </span>
                    <input
                      type={showSignUpConfirmPassword ? "text" : "password"}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                      aria-label={showSignUpConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <span className="material-symbols-outlined">
                        {showSignUpConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-700">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-700">
                      Privacy Policy
                    </a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={handleSignUpSubmit}
                >
                  Create Account
                </button>
              </form>
            )}
            
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Need help?{" "}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
