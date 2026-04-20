import { useLocation } from 'react-router-dom';
import { ChevronRight, Mountain } from 'lucide-react';

const routeMeta = {
  '/': { title: 'Tableau de Bord', breadcrumb: ['Direction'] },
  '/entrepot': { title: 'Entrepôt', breadcrumb: ['Stocks & MP'] },
  '/commercial': { title: 'Commercial & CRM', breadcrumb: ['Ventes'] },
  '/production': { title: 'Planning de Prod', breadcrumb: ['Sem. 11 — 2026'] },
};

export default function HeaderBar() {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || routeMeta['/'];

  return (
    <header className="glass sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between border-b border-slate-200/60">
      <div className="flex items-center gap-2 text-sm">
        {/* Mobile icon instead of "Maison Rullier" text */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-or-brosse to-or-clair items-center justify-center flex-shrink-0 shadow-sm md:hidden flex">
          <Mountain className="w-4 h-4 text-white" />
        </div>
        
        <span className="text-gris-ardoise font-medium hidden md:block">Maison Rullier</span>
        <ChevronRight className="w-3.5 h-3.5 text-gris-ardoise/40 hidden md:block" />
        <span className="text-bleu-profond font-semibold">{meta.title}</span>
        
        <div className="hidden sm:flex items-center gap-2">
          {meta.breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-gris-ardoise/40" />
              <span className="text-gris-ardoise text-xs">{crumb}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-xs text-gris-ardoise hidden md:block">Saison 2025–2026</span>
        <div className="w-px h-4 bg-gris-clair hidden md:block" />
        <span className="text-[10px] md:text-xs text-or-brosse font-medium">12 mars 2026</span>
      </div>
    </header>
  );
}
