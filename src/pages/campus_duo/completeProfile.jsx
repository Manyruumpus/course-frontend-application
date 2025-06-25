// CompleteProfile.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = ({ initialData = {} }) => {
  const navigate = useNavigate();

  const defaultData = {
    name: 'John Doe',
    gender: 'Male',
    yearOfGrad: '2024',
    photo: '/images/pair.png',
    branch: 'Computer Science',
    city: 'Bangalore',
  };
  const [profileData, setProfileData] = useState({ ...defaultData, ...initialData });

  const [editingKey, setEditingKey] = useState(null);
  const [tempValue, setTempValue] = useState(''); // <— local text while typing

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    hobbies: '',
    bio: '',
    favCampusHangout: '',
    funFact: '',
    lookingFor: '',
  });

  const startEdit = (key) => {
    if (key === 'photo') {
      fileInputRef.current?.click();
      return;
    }
    setEditingKey(key);
    setTempValue(profileData[key] ?? '');
  };

  const commitEdit = () => {
    if (!editingKey) return;
    setProfileData((prev) => ({ ...prev, [editingKey]: tempValue }));
    cancelEdit(); 
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setTempValue('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send the darta to the backend
    navigate('/campus_duo/preference');
  };
  const handleComplete = () => { 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-500 to-slate-800 px-4 py-8">
      {/* hidden file input (photo) */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setProfileData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
        }}
      />

      <div className="mx-auto max-w-4xl">
        {/* header */}
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Complete Your Profile</h1>
          <p className="text-slate-300">Let others know who you are</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-700 bg-slate-800/70 p-8 shadow-lg"
        >
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* avatar */}
            <div className="flex flex-col items-center">
              <img
                src={profileData.photo}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-rose-400 object-cover shadow-md"
              />
              <button
                type="button"
                onClick={() => startEdit('photo')}
                className="mt-3 rounded-md bg-rose-500 px-4 py-1 text-sm font-medium text-white
                           transition-colors duration-200 hover:bg-rose-400 focus:outline-none
                           focus:ring-2 focus:ring-rose-300"
              >
                Edit Photo
              </button>
            </div>

            <div className="space-y-4">
              {[
                ['Name', 'name'],
                ['Gender', 'gender'],
                ['Year of Graduation', 'yearOfGrad'],
                ['Branch', 'branch'],
                ['City', 'city'],
              ].map(([label, key]) => (
                <div key={key} className="rounded-lg bg-slate-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{label}</h3>

                    {editingKey === key ? (
                      <button
                        type="button"
                        onClick={commitEdit}
                        className="text-sm text-rose-400"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(key)}
                        className="text-sm text-rose-400 transition-colors duration-200 hover:text-rose-300"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {editingKey === key ? (
                    <input
                      type="text"
                      autoFocus
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="mt-1 w-full rounded-md bg-slate-800 px-2 py-1 text-slate-200"
                    />
                  ) : (
                    <p className="mt-1 text-slate-300">{profileData[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-800 px-4 text-slate-400">
                  Tell us more about yourself
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <InputField
              id="hobbies"
              label="Hobbies & Interests"
              value={formData.hobbies}
              onChange={handleChange}
              placeholder="e.g., Photography, Reading, Gaming…"
            />
            <TextareaField
              id="bio"
              label="About Me"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell others about yourself…"
            />
            <InputField
              id="favCampusHangout"
              label="Favorite Campus Hangout"
              value={formData.favCampusHangout}
              onChange={handleChange}
              placeholder="e.g., Library coffee corner…"
            />
            <InputField
              id="funFact"
              label="Fun Fact About Me"
              value={formData.funFact}
              onChange={handleChange}
              placeholder="Share something interesting…"
            />
            <SelectField
              id="lookingFor"
              label="I'm Looking For"
              value={formData.lookingFor}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select what you’re looking for…' },
                { value: 'friendship', label: 'New Friends' },
                { value: 'study-partner', label: 'Study Partner' },
                { value: 'dating', label: 'Dating & Romance' },
                { value: 'activity-partner', label: 'Activity Partner' },
                { value: 'networking', label: 'Professional Networking' },
                { value: 'anything', label: 'Open to Anything' },
              ]}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-3 text-lg font-semibold text-white
                         shadow-lg transition-all duration-200 hover:from-rose-400 hover:to-pink-400
                         hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              OnClick = {handleComplete}
            >
              Complete My Profile ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-md border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-200
                 placeholder-slate-500 transition-all duration-200 focus:border-rose-400
                 focus:outline-none focus:ring-2 focus:ring-rose-300"
    />
  </div>
);

const TextareaField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full resize-none rounded-md border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-200
                 placeholder-slate-500 transition-all duration-200 focus:border-rose-400
                 focus:outline-none focus:ring-2 focus:ring-rose-300"
    />
  </div>
);

const SelectField = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full rounded-md border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-200
                 transition-all duration-200 focus:border-rose-400 focus:outline-none focus:ring-2
                 focus:ring-rose-300"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default CompleteProfile;
