import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {api} from '../api/api.js';

const setpass = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [signInUser, setSignInUser] = useState('');
  const [signInPass, setSignInPass] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [first,  setFirst]  = useState('');
  const [last,   setLast]   = useState('');
  const [user,   setUser]   = useState('');
  const [pass,   setPass]   = useState('');
  const [confirm,setConfirm]= useState('');
  const [showSignUpPassword,        setShowSignUpPassword]        = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  /* message */
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleFormToggle = (signInSelected) => {
    setMsg('');
    setIsSignIn(signInSelected);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await api.post('/api/auth/login', {
    //     email: `${signInUser}@iitk.ac.in`,
    //     password: signInPass,
    //   });
    //   navigate('/study_buddy/profile');
    // } catch (err) {
    //   setMsg(err.response?.data?.msg || 'Login failed');
    // }
    navigate('/study_buddy/completeProfile'); 
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (pass !== confirm) return setMsg('Passwords do not match');

    try {
      await api.post('/api/auth/signup', {
        name: `${first} ${last}`.trim(),
        email: `${user}@iitk.ac.in`,
        password: pass,
      });
      navigate('/study_buddy/completeProfile');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gradient-to-br flex from-blue-50 via-white to-indigo-50  justify-center p-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-slate-400 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 transform hover:scale-105 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-2xl">IITK StudyBuddy </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Set Your Password  </h1>
              <p className="text-gray-600">Please avoid using personal data as password</p>
            </div>

            {/* Sign In Form */}
            {isSignIn && (
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                
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
                  <a
                    href="#"
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot password?
                  </a>


                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={handleSignInSubmit}
                >
                  Set Password 
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

export default setpass;
