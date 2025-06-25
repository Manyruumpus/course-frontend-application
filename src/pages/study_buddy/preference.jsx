import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PreferenceSelect= () => {
  const [formData, setFormData] = useState({
    profilePic: null,
    gender: "",
    graduationYear: "",
    branch: "",
    courses: [],
    preferredTime: "",
    hallNumber: "",
    city: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();    
    // TODO: call your login API here — if success:    
    navigate('/study_buddy/profile');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Preference for Partner</h1>

        

        <div>
          <label className="block mb-2 font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Year of Graduation</label>
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="e.g. 2025"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            min="1900"
            max="2100"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="eg. Computer Science and Engineering"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        
        
        <div>
          <label className="block mb-2 font-semibold">Courses</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Course Code eg. Cs202, Eco423"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Preferable Time</label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>
              Select Time
            </option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
            <option value="Anytime">Anytime</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Hall Number</label>
          <input
            type="text"
            name="hallNumber"
            value={formData.hallNumber}
            onChange={handleChange}
            placeholder="e.g. Hall 7"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Partner's City"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Study Location</label>
          <input
            type="text"
            name="Location"
            value={formData.city}
            onChange={handleChange}
            placeholder="Location you prefer to study eg. Library"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Preferable Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Language you prefer"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition-colors"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default PreferenceSelect;
