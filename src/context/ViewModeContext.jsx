import { createContext, useContext, useState } from 'react';

const ViewModeContext = createContext(null);

export function ViewModeProvider({ children }) {
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' | 'compact'
  const toggleViewMode = () => setViewMode(v => v === 'detailed' ? 'compact' : 'detailed');
  const isCompact = viewMode === 'compact';

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode, isCompact }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error('useViewMode must be used within ViewModeProvider');
  return ctx;
}
