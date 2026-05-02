import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import JourneyPage from './pages/JourneyPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';
import EligibilityPage from './pages/EligibilityPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
