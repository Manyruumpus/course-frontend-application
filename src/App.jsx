import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import AppSelector from './components/AppSelector.jsx';
import StudyBuddyApp from './apps/StudyBuddyApp.jsx';
import CampusDuoApp from './apps/CampusDuoApp.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route shows app selector */}
        <Route path="/" element={<AppSelector />} />
        
        {/* Study Buddy App Routes */}
        <Route path="/study_buddy/*" element={<StudyBuddyApp />} />
        
        {/* Campus Duo App Routes */}
        <Route path="/campus_duo/*" element={<CampusDuoApp />} />

        
      </Routes>
    </Router>
  );
};

export default App;
