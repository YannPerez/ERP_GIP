import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, Zap, Database } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import DataManager from './DataManager';

const routeMeta = {
  '/': { title: 'Tableau de Bord', breadcrumb: ['Direction'] },
  '/entrepot': { title: 'Entrepot', breadcrumb: ['Stocks & MP'] },
  '/commercial': { title: 'Commercial & CRM', breadcrumb: ['Ventes'] },
  '/production': { title: 'Planning de Production', breadcrumb: ['Sem. 11 — Mars 2026'] },
};

export default function HeaderBar() {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || routeMeta['/'];
  const { viewMode, toggleViewMode, isCompact } = useViewMode();
  const [dmOpen, setDmOpen] = useState(false);

  useEffect(() => {
    const handler = () => setDmOpen(true);
    window.addEventListener('open-data-manager', handler);
    return () => window.removeEventListener('open-data-manager', handler);
  }, []);

  return (
    <>
      <header className="glass sticky top-0 z-40 px-8 py-3.5 flex items-center justify-between border-b border-slate-200/60">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gris-ardoise font-medium">Maison Rullier</span>
          <ChevronRight className="w-3.5 h-3.5 text-gris-ardoise/40" />
          <span className="text-bleu-profond font-semibold">{meta.title}</span>
          {meta.breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-gris-ardoise/40" />
              <span className="text-gris-ardoise text-xs">{crumb}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <button
            onClick={toggleViewMode}
            className="view-toggle-pill"
          >
            <motion.div
              className="view-toggle-indicator"
              animate={{ x: isCompact ? 76 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
            <span className={`view-toggle-option ${!isCompact ? 'active' : ''}`}>
              <LayoutGrid className="w-3 h-3" />
              Detaillee
            </span>
            <span className={`view-toggle-option ${isCompact ? 'active' : ''}`}>
              <Zap className="w-3 h-3" />
              Express
            </span>
          </button>

          <div className="w-px h-4 bg-gris-clair" />

          {/* Data Manager Button */}
          <button
            onClick={() => setDmOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-gradient-to-r from-or-brosse/10 to-or-clair/10
              border border-or-brosse/20 hover:border-or-brosse/40
              text-or-brosse hover:text-or-hover
              text-[11px] font-semibold transition-all hover:shadow-sm"
          >
            <Database className="w-3.5 h-3.5" />
            Data
          </button>

          <div className="w-px h-4 bg-gris-clair" />

          <span className="text-xs text-gris-ardoise">Saison 2025-2026</span>
          <div className="w-px h-4 bg-gris-clair" />
          <span className="text-xs text-or-brosse font-medium">
            {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </header>
      <DataManager open={dmOpen} onClose={() => setDmOpen(false)} />
    </>
  );
}
