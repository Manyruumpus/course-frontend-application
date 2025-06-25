  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  const userData = [
    { id: 0, name: 'Courses', number: 'Eco423,cs330,cs330,cs330,cs330' },
    { id: 1, name: 'Batch', number: '2023' },
    { id: 3, name: 'Hall', number: '12' },
    { id: 4, name: 'City', number: 'Indore' },
    { id: 5, name: 'Region', number: 'Indore' },
    { id: 6, name: 'Degree', number: 'Btech' },
    { id: 7, name: 'Language', number: 'English' },
    { id: 8, name: 'Meet Location', number: 'Library' },
  ];

  const billsData = [
    { id: 1, label: 'Course', status: 'Cs202, Eco423,Cs330,ESO207' },
    { id: 2, label: 'Preferred Time', status: 'Morning' },
    { id: 3, label: 'Language', status: 'English' },
    { id: 4, label: 'Gender', status: 'Female' },
    { id: 5, label: 'Location', status: 'Anywhere' },
    { id: 6, label: 'Degree', status: 'Btech' },
    { id: 8, label: 'Region', status: 'Any' },
    { id: 9, label: 'Hall', status: 'Any' },
  ];

  const ProfilePage = () => {
    const navigate = useNavigate();
    const handleEditProfile = (e)=>{
      // take back to profile change 
      e.preventDefault();
      navigate('/campus_duo/completeProfile');
    }
    const handleEditPreference = (e)=>{
      // take back to profile change 
      e.preventDefault();
      navigate('/campus_duo/preference');
    }
    const [user, setUser] = useState({
      name: 'Mohit Parihar',
      phone: '+860 *** ***8',
      email: 'mohitp23@iitk.ac.in',
      avatar: '/avatar.jpg',
      smsActivated: true,
    });

    const toggleSMS = () => {
      setUser(prev => ({ ...prev, smsActivated: !prev.smsActivated }));
    };

    // Split out first items and chunk the rest into rows of 3
    const [firstAccount, ...otherAccounts] = userData;
    const [firstBill, ...otherBills] = billsData;

    const gridRowsAccounts = [];
    for (let i = 0; i < otherAccounts.length; i += 3) {
      gridRowsAccounts.push(otherAccounts.slice(i, i + 3));
    }

    const gridRowsBills = [];
    for (let i = 0; i < otherBills.length; i += 3) {
      gridRowsBills.push(otherBills.slice(i, i + 3));
    }

    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Profile Card */}
          <div className="bg-slate-300 bg-opacity-80 backdrop-blur-md border-2 border-black rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-md">
              <img
                src={user.avatar}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-gray-800">
              {user.name}
            </h1>
            <div className="mt-4 w-full space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Phone</span>
                <span>{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">IITK Email</span>
                <span>{user.email}</span>
              </div>
            </div>
            <div className="mt-6 w-full flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Search for Buddy
              </span>
              <button
                onClick={toggleSMS}
                className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
                  user.smsActivated ? 'bg-green-400' : ''
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                    user.smsActivated ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>
            <button className="mt-6 px-6 py-2 bg-gradient-to-r from-red-400 to-yellow-400 text-white font-semibold rounded-full hover:opacity-90 transition">
              Save
            </button>
          </div>

          {/* Accounts Card */}
          <div className="col-span-2 grid grid-cols-1 gap-6">
            <div className="bg-slate-300 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Data
                </h2>
                <button className="text-gray-500 hover:text-slate-400 focus:outline-none"
                type = "submit"
                onClick = {handleEditProfile}
                >
                  Edit
                </button>
              </div>
              <table className="min-w-full divide-y divide-slate-400">
                <tbody className="bg-slate-300 divide-y divide">
                  {/* First row spans full width */}
                  
                  {/* 3×2 grid for the rest */}
                  {gridRowsAccounts.map((row, idx) => (
                    <tr key={idx}>
                      {row.map(item => (
                        <td key={item.id} className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-700">
                              {item.name}:
                            </span>
                            <span className="text-gray-500">
                              {item.number}
                            </span>
                          </div>
                        </td>
                      ))}
                      {row.length < 3 &&
                        Array.from({ length: 3 - row.length }).map((_, i) => (
                          <td key={i} className="px-6 py-4" />
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bills Card */}
            <div className="bg-slate-300 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Preference
                </h2>
                <button 
                type = "submit"
                onClick = {handleEditPreference}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Edit
                </button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-slate-300 divide-y divide-gray-200">
                  
                  {gridRowsBills.map((row, idx) => (
                    <tr key={idx}>
                      {row.map(item => (
                        <td key={item.id} className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-700">
                              {item.label}:
                            </span>
                            <span className="text-gray-500">
                              {item.status}
                            </span>
                          </div>
                        </td>
                      ))}
                      {row.length < 3 &&
                        Array.from({ length: 3 - row.length }).map((_, i) => (
                          <td key={i} className="px-6 py-4" />
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProfilePage;
