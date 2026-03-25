import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Warehouse, ShoppingCart, CalendarClock,
  Mountain, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de Bord', sub: 'Direction' },
  { to: '/entrepot', icon: Warehouse, label: 'Entrepot', sub: 'Stocks & MP' },
  { to: '/commercial', icon: ShoppingCart, label: 'Commercial', sub: 'CRM & Ventes' },
  { to: '/production', icon: CalendarClock, label: 'Production', sub: 'Planning' },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <motion.aside
      className="sidebar h-full flex flex-col flex-shrink-0 relative z-50"
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Floating toggle button — edge-mounted */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-7 z-[60] w-7 h-7 rounded-full
          bg-gradient-to-br from-bleu-profond to-bleu-nuit
          border-2 border-white/20 shadow-lg shadow-bleu-profond/30
          flex items-center justify-center text-white/80 hover:text-white
          hover:scale-110 hover:shadow-xl hover:shadow-or-brosse/20
          hover:border-or-brosse/40 transition-all duration-200 cursor-pointer
          sidebar-toggle-pulse"
      >
        {collapsed
          ? <PanelLeftOpen className="w-3.5 h-3.5" />
          : <PanelLeftClose className="w-3.5 h-3.5" />
        }
      </button>

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8 flex items-center gap-3 min-h-[68px]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-or-brosse to-or-clair flex items-center justify-center flex-shrink-0 shadow-lg shadow-or-brosse/20">
          <Mountain className="w-4.5 h-4.5 text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <h1 className="text-[15px] font-bold text-white leading-tight">Maison Rullier</h1>
            <p className="text-[10px] text-white/40 tracking-[0.15em] uppercase">Hub ERP</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl transition-all duration-150 group relative ${
                collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-white/12 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/6'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-or-clair"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                    isActive
                      ? 'bg-or-brosse/20'
                      : 'bg-white/5 group-hover:bg-white/8'
                  }`}
                >
                  <item.icon className="w-[16px] h-[16px]" />
                </div>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: 0.1 }}
                  >
                    <span className="text-[13px] font-medium block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-white/30">{item.sub}</span>
                  </motion.div>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 rounded-lg bg-bleu-profond text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg z-50">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 py-3 border-t border-white/6"
        >
          <p className="text-[10px] text-white/25">Crozets artisanaux - depuis 1935</p>
        </motion.div>
      )}
    </motion.aside>
  );
}
