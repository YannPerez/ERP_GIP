import { createContext, useContext } from 'react';
import useLocalData from '../hooks/useLocalData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const data = useLocalData();
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
