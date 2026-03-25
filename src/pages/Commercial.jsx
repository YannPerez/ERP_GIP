import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Truck, FileText, Filter, Search, Send, UserCircle,
  CheckCircle2, Clock, PackageCheck, ChevronRight, Building2, Hotel, Mountain,
  UtensilsCrossed, Plus
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useViewMode } from '../context/ViewModeContext';
import VariantBadge from '../components/VariantBadge';

const pageV = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, exit: { opacity: 0, y: -8 } };
const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

const statutLabels = {
  en_preparation: { label: 'En preparation', badge: 'badge-warning', icon: Clock },
  expediee: { label: 'Expediee', badge: 'badge-info', icon: Send },
  livree: { label: 'Livree', badge: 'badge-success', icon: CheckCircle2 },
};

const typeIcons = { epicerie_fine: Building2, hotel_prestige: Hotel, station_ski: Mountain, restauration: UtensilsCrossed };
const typeLabels = { epicerie_fine: 'Epicerie Fine', hotel_prestige: 'Hotel de Prestige', station_ski: 'Station de Ski', restauration: 'Restauration' };

function CommandesTable({ compact }) {
  const { commandes, produitsFinis, transporteurs } = useData();
  const [filter, setFilter] = useState('tous');
  const [search, setSearch] = useState('');
  const filtered = commandes.filter(cmd => {
    const mF = filter === 'tous' || cmd.statut === filter;
    const mS = cmd.client_nom.toLowerCase().includes(search.toLowerCase()) || cmd.id.toLowerCase().includes(search.toLowerCase());
    return mF && mS;
  });

  if (compact) {
    return (
      <motion.div variants={fadeUp} className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><ShoppingCart className="w-4.5 h-4.5 text-bleu-info" /></div>
            <div><h3 className="text-[15px] font-semibold text-bleu-profond">Commandes</h3><p className="text-[11px] text-gris-ardoise">{commandes.length} commandes</p></div>
          </div>
        </div>
        <div className="space-y-2">
          {commandes.map(cmd => {
            const s = statutLabels[cmd.statut];
            return (
              <div key={cmd.id} className="flex items-center justify-between py-2.5 border-b border-gris-clair/40 last:border-0">
                <div>
                  <p className="text-[13px] font-medium text-bleu-profond">{cmd.client_nom}</p>
                  <p className="text-[10px] text-gris-ardoise">{cmd.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-bleu-profond">{cmd.montant}&euro;</span>
                  <span className={`badge text-[10px] ${s.badge}`}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-bleu-info/8 flex items-center justify-center"><ShoppingCart className="w-4.5 h-4.5 text-bleu-info" /></div>
          <div><h3 className="text-[15px] font-semibold text-bleu-profond">Commandes</h3><p className="text-[11px] text-gris-ardoise">{commandes.length} commandes</p></div>
        </div>
        <button onClick={() => window.dispatchEvent(new Event('open-data-manager'))} className="btn-primary text-[13px]"><Plus className="w-4 h-4" /> Nouvelle</button>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-ardoise" />
          <input type="text" placeholder="Rechercher..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-gris-ardoise" />
          {['tous', 'en_preparation', 'expediee', 'livree'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${filter === f ? 'bg-bleu-profond text-white shadow-sm' : 'bg-white text-gris-ardoise hover:bg-gris-fond border border-gris-clair/60'}`}>
              {f === 'tous' ? 'Tous' : statutLabels[f].label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead><tr><th>N</th><th>Client</th><th>Produits</th><th>Format</th><th>Montant</th><th>Transport</th><th>Statut</th></tr></thead>
          <tbody>
            {filtered.map(cmd => {
              const s = statutLabels[cmd.statut]; const SI = s.icon;
              return (
                <tr key={cmd.id}>
                  <td><span className="text-[13px] font-mono font-semibold text-or-brosse">{cmd.id}</span><p className="text-[11px] text-gris-ardoise">{cmd.date}</p></td>
                  <td className="font-medium text-bleu-profond text-[13px]">{cmd.client_nom}</td>
                  <td><div className="flex flex-wrap gap-1">{(cmd.produits || []).map((p, i) => {
                    const pf = produitsFinis.find(x => x.variante === p.variante);
                    return <VariantBadge key={i} variante={`${p.variante} (${p.qte_kg}kg)`} couleur={pf?.couleur || '#888'} size="xs" />;
                  })}</div></td>
                  <td><span className={`badge text-[10px] ${cmd.format === '5kg' ? 'badge-info' : 'badge-neutral'}`}>{cmd.format === '5kg' ? '5kg' : '400g'}</span></td>
                  <td className="font-semibold text-[13px]">{cmd.montant}&euro;</td>
                  <td><div className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-gris-ardoise" /><span className="text-[13px]">{cmd.transporteur === 'interne' ? 'Interne' : 'TFE'}</span></div></td>
                  <td><span className={`badge text-[10px] ${s.badge}`}><SI className="w-3 h-3" />{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function ExpeditionsTracker() {
  const { commandes, transporteurs } = useData();
  const exps = commandes.filter(c => c.statut !== 'livree');
  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-vert-sauge/10 flex items-center justify-center"><Truck className="w-4.5 h-4.5 text-vert-sauge" /></div>
        <div><h3 className="text-[15px] font-semibold text-bleu-profond">Suivi Expeditions</h3><p className="text-[11px] text-gris-ardoise">{exps.length} en cours</p></div>
      </div>
      <div className="space-y-2.5">
        {exps.map(exp => (
          <div key={exp.id} className="flex items-center gap-4 p-3 rounded-xl border border-gris-clair/40 bg-gris-fond/50 hover:bg-white transition-all">
            <div className={`w-1.5 h-9 rounded-full ${exp.statut === 'expediee' ? 'bg-bleu-info' : 'bg-orange-terreux'}`} />
            <div className="flex-1">
              <div className="flex items-center gap-2"><span className="text-[13px] font-semibold text-bleu-profond">{exp.client_nom}</span><ChevronRight className="w-3 h-3 text-gris-ardoise/40" /><span className="text-[11px] text-gris-ardoise">{exp.id}</span></div>
              <p className="text-[11px] text-gris-ardoise mt-0.5">{(exp.produits || []).reduce((a, p) => a + p.qte_kg, 0)}kg - {exp.format}</p>
            </div>
            <div className="text-right">
              <span className={`text-[11px] font-medium ${exp.transporteur === 'interne' ? 'text-vert-sauge' : 'text-bleu-info'}`}>{exp.transporteur === 'interne' ? 'Interne' : 'TFE'}</span>
              <span className={`badge text-[9px] mt-1 block ${statutLabels[exp.statut].badge}`}>{statutLabels[exp.statut].label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gris-clair/40">
        <p className="label mb-2">Transporteurs</p>
        <div className="grid grid-cols-2 gap-2">
          {transporteurs.map(t => (
            <div key={t.id} className="p-2.5 rounded-lg border border-gris-clair/40 bg-white">
              <div className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${t.disponible ? 'bg-vert-sauge' : 'bg-rouge-alerte'}`} /><span className="text-[13px] font-medium text-bleu-profond">{t.nom}</span></div>
              <p className="text-[11px] text-gris-ardoise mt-0.5">{t.zone}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GrandsComptesForm() {
  const { clients, produitsFinis } = useData();
  const [selClient, setSelClient] = useState('');
  const [selProds, setSelProds] = useState([]);
  const client = clients.find(c => c.id === parseInt(selClient));
  const format = client?.format_commande || '400g';

  return (
    <motion.div variants={fadeUp} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-or-brosse/8 flex items-center justify-center"><FileText className="w-4.5 h-4.5 text-or-brosse" /></div>
        <div><h3 className="text-[15px] font-semibold text-bleu-profond">Saisie Grands Comptes</h3><p className="text-[11px] text-gris-ardoise">Format adapte automatiquement</p></div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="label mb-2 block">Client</label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gris-ardoise" />
            <select value={selClient} onChange={e => setSelClient(e.target.value)} className="input pl-9 appearance-none cursor-pointer">
              <option value="">Selectionner un client...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.nom} - {typeLabels[c.type]}</option>)}
            </select>
          </div>
        </div>
        {client && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 rounded-xl bg-or-brosse/4 border border-or-brosse/12">
            <p className="text-[13px] font-semibold text-bleu-profond">{client.nom}</p>
            <p className="text-[11px] text-gris-ardoise">{client.ville} - {typeLabels[client.type]}</p>
            <div className="flex gap-3 mt-2">
              <div className="text-center p-2 rounded-lg bg-white/80"><p className="text-lg font-semibold text-or-brosse">{client.format_commande}</p><p className="text-[9px] text-gris-ardoise uppercase">Format</p></div>
              <div className="text-center p-2 rounded-lg bg-white/80"><p className="text-lg font-semibold text-bleu-profond">{(client.ca_annuel / 1000).toFixed(1)}k&euro;</p><p className="text-[9px] text-gris-ardoise uppercase">CA</p></div>
            </div>
          </motion.div>
        )}
        <div>
          <label className="label mb-2 block">Produits</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {produitsFinis.map(pf => (
              <button key={pf.id} onClick={() => setSelProds(p => p.includes(pf.id) ? p.filter(x => x !== pf.id) : [...p, pf.id])}
                className={`p-3 rounded-xl border text-left transition-all text-[13px] ${selProds.includes(pf.id) ? 'border-or-brosse bg-or-brosse/5 ring-1 ring-or-brosse/20' : 'border-gris-clair/50 bg-white hover:bg-gris-fond'}`}>
                <VariantBadge variante={pf.variante} couleur={pf.couleur} size="xs" />
                <p className="text-[11px] text-gris-ardoise mt-1.5">{format === '5kg' ? `Sac 5kg - ${(pf.prix_vente_kg * 5).toFixed(0)}e` : `400g - ${(pf.prix_vente_kg * 0.4).toFixed(2)}e`}</p>
              </button>
            ))}
          </div>
        </div>
        {selProds.length > 0 && client && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {selProds.map(pid => {
              const pf = produitsFinis.find(p => p.id === pid);
              return (
                <div key={pid} className="flex items-center gap-3 p-3 rounded-lg border border-gris-clair/40 bg-white">
                  <VariantBadge variante={pf.variante} couleur={pf.couleur} size="xs" />
                  <span className="text-[13px] flex-1" />
                  <input type="number" placeholder="Qte" className="input w-20 text-center text-[13px]" min="1" />
                  <span className="text-[11px] text-gris-ardoise">{format === '5kg' ? 'sacs' : 'cartons'}</span>
                </div>
              );
            })}
            <button className="btn-primary btn-primary-lg w-full"><PackageCheck className="w-4 h-4" /> Valider la commande</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Commercial() {
  const { clients } = useData();
  const { isCompact } = useViewMode();

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit">
      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
        {!isCompact && (
          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(typeLabels).map(([type, label]) => {
              const TI = typeIcons[type];
              const count = clients.filter(c => c.type === type).length;
              const ca = clients.filter(c => c.type === type).reduce((a, c) => a + c.ca_annuel, 0);
              return (
                <div key={type} className="card p-4 text-center card-interactive">
                  <TI className="w-5 h-5 text-or-brosse mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-bleu-profond">{label}</p>
                  <p className="text-[11px] text-gris-ardoise">{count} client{count > 1 ? 's' : ''}</p>
                  <p className="text-lg font-light text-or-brosse mt-1">{(ca / 1000).toFixed(1)}k&euro;</p>
                </div>
              );
            })}
          </motion.div>
        )}
        <CommandesTable compact={isCompact} />
        {!isCompact && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpeditionsTracker />
            <GrandsComptesForm />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
