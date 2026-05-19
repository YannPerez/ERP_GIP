import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Truck, Filter, Search, Send,
  CheckCircle2, Clock, Plus, Settings
} from 'lucide-react';
import { useData } from '../context/DataContext';

const pageV = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0, y: -8 } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const statutLabels = {
  'En préparation': { label: 'En préparation', badge: 'badge-warning', icon: Clock },
  'Expédiée': { label: 'Expédiée', badge: 'badge-info', icon: Send },
  'Livrée': { label: 'Livrée', badge: 'badge-success', icon: CheckCircle2 },
};

function CommandesTable() {
  const { commandes } = useData();
  const [filter, setFilter] = useState('Tous');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = commandes.filter(cmd => {
    const mF = filter === 'Tous' || cmd.statut === filter;
    const mS = cmd.client.toLowerCase().includes(search.toLowerCase()) || cmd.id.toLowerCase().includes(search.toLowerCase());
    return mF && mS;
  });

  return (
    <motion.div variants={fadeUp} className="card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center">
            <ShoppingCart className="w-4.5 h-4.5 text-bleu-info" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-bleu-profond">Commandes</h3>
            <p className="text-[11px] text-gris-ardoise">{commandes.length} commandes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowModal(true)} className="btn-secondary text-[13px]"><Settings className="w-4 h-4" /> Réglages</button>
          <button onClick={() => setShowModal(true)} className="btn-primary text-[13px]"><Plus className="w-4 h-4" /> Nouvelle</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-ardoise" />
          <input type="text" placeholder="Rechercher..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-gris-ardoise flex-shrink-0" />
          {['Tous', 'En préparation', 'Expédiée', 'Livrée'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${filter === f ? 'bg-bleu-profond text-white shadow-sm' : 'bg-white text-gris-ardoise hover:bg-gris-fond border border-gris-clair/60'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="data-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Date</th>
              <th>Client</th>
              <th>Produits</th>
              <th>Format</th>
              <th>Montant</th>
              <th>Transport</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cmd => {
              const s = statutLabels[cmd.statut] || statutLabels['En préparation']; 
              const SI = s.icon;
              return (
                <tr key={cmd.id}>
                  <td><span className="text-[13px] font-mono font-semibold text-or-brosse">{cmd.id}</span></td>
                  <td><p className="text-[11px] text-gris-ardoise">{cmd.date}</p></td>
                  <td className="font-medium text-bleu-profond text-[13px]">{cmd.client}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {(cmd.produits || []).map((p, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded border border-gris-clair bg-white text-[10px]">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.couleur }}></span>
                          <span className="font-medium">{p.nom}</span>
                          <span className="text-gris-ardoise">({p.qte}kg)</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td><span className={`badge text-[10px] ${cmd.format === '5kg' ? 'badge-info' : 'badge-neutral'}`}>{cmd.format}</span></td>
                  <td className="font-semibold text-[13px]">{cmd.montant}&euro;</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-gris-ardoise" />
                      <span className="text-[13px]">{cmd.transport}</span>
                    </div>
                  </td>
                  <td><span className={`badge text-[10px] ${s.badge}`}><SI className="w-3 h-3" />{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Placeholder Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bleu-profond/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center"
            >
              <div className="w-12 h-12 bg-or-brosse/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-or-brosse" />
              </div>
              <h3 className="text-lg font-bold text-bleu-profond mb-2">Fonctionnalité à venir</h3>
              <p className="text-sm text-gris-ardoise mb-6">Cette section est en cours de développement.</p>
              <button onClick={() => setShowModal(false)} className="btn-primary w-full">Fermer</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Commercial() {
  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="h-full">
      <CommandesTable />
    </motion.div>
  );
}
