import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreferenceSelect = () => {
  const [formData, setFormData] = useState({
    profilePic: null,
    gender: '',
    graduationYear: '',
    branch: '',
    courses: '',
    preferredTime: '',
    hallNumber: '',
    city: '',
    location: '',
    language: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files : value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    /* send formData to API … */
    navigate('/campus_duo/profile');
  };

  return (
    /* page can scroll; no inner scrollbar */
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl rounded-2xl border border-rose-400/60
                   bg-slate-800/70 shadow-xl backdrop-blur-lg px-10 py-8 space-y-6"
      >
        <h1 className="text-center text-3xl font-bold text-pink-200">
          Partner Preferences
        </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          <Field label="Gender">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="romantic-input"
            >
              <option value="" disabled>Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </Field>

          <Field label="Year of Graduation">
            <input
              type="number"
              name="graduationYear"
              placeholder="2025"
              min="1900"
              max="2100"
              value={formData.graduationYear}
              onChange={handleChange}
              required
              className="romantic-input"
            />
          </Field>

          <Field label="Branch">
            <input
              type="text"
              name="branch"
              placeholder="eg CSE"
              value={formData.branch}
              onChange={handleChange}
              required
              className="romantic-input"
            />
          </Field>

          <Field label="Preferred Time">
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="romantic-input"
            >
              <option value="" disabled>Select time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Night</option>
              <option>Anytime</option>
            </select>
          </Field>

          <Field label="Hall Number">
            <input
              type="text"
              name="hallNumber"
              placeholder="eg Hall-12"
              value={formData.hallNumber}
              onChange={handleChange}
              required
              className="romantic-input"
            />
          </Field>

          <Field label="City">
            <input
              type="text"
              name="city"
              placeholder="eg Bangalore"
              value={formData.city}
              onChange={handleChange}
              required
              className="romantic-input"
            />
          </Field>

          <Field label="Study Location">
            <input
              type="text"
              name="location"
              placeholder="eg library"
              value={formData.location}
              onChange={handleChange}
              required
              className="romantic-input"
            />
          </Field>

          <Field label="Preferred Language">
            <input
              type="text"
              name="language"
              placeholder="eg Tamil"
              value={formData.language}
              onChange={handleChange}
              required
              className="romantic-input"
            />
          </Field>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500
                     py-3 font-semibold text-white shadow-lg transition-all
                     hover:from-pink-400 hover:via-rose-400 hover:to-purple-400 hover:shadow-xl"
        >
          Save Preferences
        </button>
      </form>
    </section>
  );
};

/* helper */
const Field = ({ label, children, full = false }) => (
  <div className={full ? 'md:col-span-2' : ''}>
    <label className="mb-2 block font-semibold text-pink-300">{label}</label>
    {children}
  </div>
);

export default PreferenceSelect;
