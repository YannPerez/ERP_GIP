import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Entrepot from './pages/Entrepot';
import Commercial from './pages/Commercial';
import Production from './pages/Production';
import ProfileSelector from './pages/ProfileSelector';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profile, setProfile] = useState(() => localStorage.getItem('erp_profile'));
  const location = useLocation();

  const handleSelectProfile = (p) => {
    localStorage.setItem('erp_profile', p);
    setProfile(p);
  };

  const handleLogout = () => {
    localStorage.removeItem('erp_profile');
    setProfile(null);
  };

  if (!profile) {
    return <ProfileSelector onSelect={handleSelectProfile} />;
  }

  const isOperator = profile === 'operateur';

  return (
    <div className="flex h-screen overflow-hidden bg-gris-fond">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} profile={profile} />
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0 relative">
        <HeaderBar collapsed={sidebarCollapsed} onLogout={handleLogout} profile={profile} />
        <div className="flex-1 overflow-y-auto px-4 py-6 md:p-8">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Operator Restrictions */}
              <Route path="/" element={isOperator ? <Navigate to="/entrepot" replace /> : <Dashboard />} />
              <Route path="/commercial" element={isOperator ? <Navigate to="/entrepot" replace /> : <Commercial />} />
              
              <Route path="/entrepot" element={<Entrepot />} />
              <Route path="/production" element={<Production />} />
            </Routes>
          </AnimatePresence>
        </div>
        <BottomNav profile={profile} />
      </main>
    </div>
  );
}
