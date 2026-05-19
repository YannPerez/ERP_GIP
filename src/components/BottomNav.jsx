import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Warehouse, ShoppingCart, CalendarClock,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau' },
  { to: '/entrepot', icon: Warehouse, label: 'Entrepôt' },
  { to: '/commercial', icon: ShoppingCart, label: 'Ventes' },
  { to: '/production', icon: CalendarClock, label: 'Planning' },
];

export default function BottomNav({ profile }) {
  const filteredNavItems = navItems.filter(item => {
    if (profile === 'operateur') {
      return item.to === '/entrepot' || item.to === '/production';
    }
    return true;
  });

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass z-50 flex items-center justify-around px-2 pb-safe bg-white/90">
      {filteredNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? 'text-bleu-profond' : 'text-gris-ardoise hover:text-bleu-profond/70'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 w-8 h-1 rounded-b-full bg-or-brosse"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
