// src/components/AppSelector.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppSelector = () => {
  const navigate = useNavigate();

  const selectApp = (appType) => {
    navigate(`/${appType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Campus Connect
          </h1>
          <p className="text-xl text-slate-300">
            Choose your experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Study Buddy App */}
          <div 
            onClick={() => selectApp('study_buddy/login')}
            className="group cursor-pointer"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaGraduationCap className="text-3xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Study Buddy</h2>
                <p className="text-slate-300 mb-6">
                  Find study partners, track your progress with Pomodoro timer, 
                  and boost your academic performance together.
                </p>
                <div className="flex items-center justify-center text-teal-400 group-hover:text-teal-300 transition-colors">
                  <span className="mr-2">Get Started</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Campus Duo App */}
          <div 
            onClick={() => selectApp('campus_duo/ask')}
            className="group cursor-pointer"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Campus Duo</h2>
                <p className="text-slate-300 mb-6">
                  Connect with fellow students, find your campus crush, 
                  and build meaningful relationships on campus.
                </p>
                <div className="flex items-center justify-center text-pink-400 group-hover:text-pink-300 transition-colors">
                  <span className="mr-2">Get Started</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // this code in the later page  */}
        {/* Back to home link - only shows if not on root */}
        {/* <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Back to App Selection
          </button>
        </div> */}
      </div>
    </div>
  );
};
export default AppSelector;
