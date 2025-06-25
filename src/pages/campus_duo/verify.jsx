// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const verify = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Submitting:', formValues);    // replace with real auth call
    navigate('/campus_duo/completeProfile'); 
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-slate-800/60 p-8 shadow-lg ring-1 ring-slate-700">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Campus Duo 
        </h1>
        <p
        className = " text-white text-center text-lg font-medium"
        > Verify Your IITK Study Buddy Account </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-200" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
            //   required
              value={formValues.username}
              onChange={handleChange}
              className="w-full rounded-md bg-slate-900/70 px-3 py-2 text-slate-200 placeholder-slate-500
                         focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="johndoe"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
            //   required
              value={formValues.password}
              onChange={handleChange}
              className="w-full rounded-md bg-slate-900/70 px-3 py-2 text-slate-200 placeholder-slate-500
                         focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="••••••••"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 py-2 text-center text-sm font-semibold text-white
                       hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            onCLick = {handleSubmit}
          >
            Verify Me 
          </button>
        </form>
      </div>
    </main>
  );
};

export default verify;
