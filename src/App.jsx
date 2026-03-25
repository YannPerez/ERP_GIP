import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DataProvider } from './context/DataContext';
import { ViewModeProvider } from './context/ViewModeContext';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import Dashboard from './pages/Dashboard';
import Entrepot from './pages/Entrepot';
import Commercial from './pages/Commercial';
import Production from './pages/Production';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <DataProvider>
      <ViewModeProvider>
        <div className="flex h-screen overflow-hidden bg-gris-fond">
          <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
          <main className="flex-1 flex flex-col overflow-hidden">
            <HeaderBar collapsed={sidebarCollapsed} />
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/entrepot" element={<Entrepot />} />
                  <Route path="/commercial" element={<Commercial />} />
                  <Route path="/production" element={<Production />} />
                </Routes>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </ViewModeProvider>
    </DataProvider>
  );
}
