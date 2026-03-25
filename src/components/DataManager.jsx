import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Database, RotateCcw, Plus, Trash2, Save,
  ShoppingCart, Package, Wheat, Users, CalendarClock, ChevronDown
} from 'lucide-react';
import { useData } from '../context/DataContext';

const tabs = [
  { key: 'commandes', label: 'Commandes', icon: ShoppingCart },
  { key: 'produitsFinis', label: 'Produits', icon: Package },
  { key: 'matierespremieres', label: 'Matieres Premieres', icon: Wheat },
  { key: 'clients', label: 'Clients', icon: Users },
  { key: 'planningProduction', label: 'Planning', icon: CalendarClock },
];

const fieldMeta = {
  commandes: {
    fields: [
      { key: 'id', label: 'N Commande', type: 'text', placeholder: 'CMD-2026-0143' },
      { key: 'client_nom', label: 'Client', type: 'text', placeholder: 'Nom du client' },
      { key: 'montant', label: 'Montant (euros)', type: 'number', placeholder: '0' },
      { key: 'statut', label: 'Statut', type: 'select', options: ['en_preparation', 'expediee', 'livree'] },
      { key: 'format', label: 'Format', type: 'select', options: ['400g', '5kg'] },
      { key: 'transporteur', label: 'Transport', type: 'select', options: ['interne', 'TFE'] },
      { key: 'date', label: 'Date', type: 'text', placeholder: '2026-03-15' },
    ],
    defaults: { id: '', client_nom: '', montant: 0, statut: 'en_preparation', format: '400g', transporteur: 'interne', date: '', produits: [], client_id: 0 },
    displayField: 'id',
    subField: 'client_nom',
  },
  produitsFinis: {
    fields: [
      { key: 'nom', label: 'Nom', type: 'text', placeholder: 'Crozets ...' },
      { key: 'variante', label: 'Variante', type: 'text', placeholder: 'Nature' },
      { key: 'stock_kg', label: 'Stock (kg)', type: 'number', placeholder: '0' },
      { key: 'seuil_critique_kg', label: 'Seuil critique (kg)', type: 'number', placeholder: '100' },
      { key: 'prix_vente_kg', label: 'Prix vente (euros/kg)', type: 'number', placeholder: '8.50' },
      { key: 'couleur', label: 'Couleur (hex)', type: 'text', placeholder: '#8B6F47' },
    ],
    defaults: { nom: '', variante: '', stock_kg: 0, seuil_critique_kg: 100, prix_vente_kg: 0, couleur: '#8B6F47' },
    displayField: 'nom',
    subField: 'variante',
  },
  matierespremieres: {
    fields: [
      { key: 'nom', label: 'Nom', type: 'text', placeholder: 'Farine de ble T55' },
      { key: 'categorie', label: 'Categorie', type: 'text', placeholder: 'Farine' },
      { key: 'stock_actuel_kg', label: 'Stock actuel (kg)', type: 'number', placeholder: '0' },
      { key: 'stock_securite_kg', label: 'Stock securite (kg)', type: 'number', placeholder: '500' },
      { key: 'fournisseur', label: 'Fournisseur', type: 'text', placeholder: 'Moulin de Savoie' },
      { key: 'prix_kg', label: 'Prix (euros/kg)', type: 'number', placeholder: '0.85' },
    ],
    defaults: { nom: '', categorie: '', stock_actuel_kg: 0, stock_securite_kg: 500, fournisseur: '', prix_kg: 0, unite: 'kg', allergene: false },
    displayField: 'nom',
    subField: 'fournisseur',
  },
  clients: {
    fields: [
      { key: 'nom', label: 'Nom', type: 'text', placeholder: 'Nom du client' },
      { key: 'type', label: 'Type', type: 'select', options: ['epicerie_fine', 'hotel_prestige', 'station_ski', 'restauration'] },
      { key: 'ville', label: 'Ville', type: 'text', placeholder: 'Annecy' },
      { key: 'ca_annuel', label: 'CA annuel (euros)', type: 'number', placeholder: '10000' },
      { key: 'format_commande', label: 'Format', type: 'select', options: ['400g', '5kg'] },
      { key: 'contact', label: 'Contact', type: 'text', placeholder: 'M. Dupont' },
    ],
    defaults: { nom: '', type: 'epicerie_fine', ville: '', ca_annuel: 0, format_commande: '400g', contact: '', email: '' },
    displayField: 'nom',
    subField: 'ville',
  },
  planningProduction: {
    fields: [
      { key: 'jour', label: 'Jour', type: 'text', placeholder: 'Lundi' },
      { key: 'date', label: 'Date', type: 'text', placeholder: '2026-03-16' },
      { key: 'parfum', label: 'Parfum', type: 'text', placeholder: 'Nature' },
      { key: 'objectif_kg', label: 'Objectif (kg)', type: 'number', placeholder: '180' },
      { key: 'statut', label: 'Statut', type: 'select', options: ['planifie', 'en_cours', 'termine'] },
      { key: 'couleur', label: 'Couleur', type: 'text', placeholder: '#8B6F47' },
    ],
    defaults: { jour: '', date: '', parfum: '', objectif_kg: 180, statut: 'planifie', couleur: '#8B6F47' },
    displayField: 'jour',
    subField: 'parfum',
  },
};

function InlineForm({ fields, defaults, onSave, onCancel }) {
  const [form, setForm] = useState({ ...defaults });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="p-4 rounded-xl bg-or-brosse/4 border border-or-brosse/15 space-y-3 mb-3">
        <div className="grid grid-cols-2 gap-3">
          {fields.map(f => (
            <div key={f.key}>
              <label className="label mb-1 block">{f.label}</label>
              {f.type === 'select' ? (
                <select className="input text-[13px]" value={form[f.key] || ''} onChange={e => set(f.key, e.target.value)}>
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="input text-[13px]"
                  value={form[f.key] || ''}
                  onChange={e => set(f.key, f.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="btn-secondary text-[12px] !py-1.5 !px-3">Annuler</button>
          <button onClick={() => onSave(form)} className="btn-primary text-[12px] !py-1.5 !px-3"><Save className="w-3.5 h-3.5" /> Sauvegarder</button>
        </div>
      </div>
    </motion.div>
  );
}

function EditableRow({ item, meta, collectionKey, data }) {
  const [expanded, setExpanded] = useState(false);
  const [editForm, setEditForm] = useState({ ...item });
  const set = (k, v) => setEditForm(p => ({ ...p, [k]: v }));

  return (
    <div className="border border-gris-clair/40 rounded-xl overflow-hidden transition-all hover:border-gris-clair">
      <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 rounded-full bg-or-brosse/30" />
          <div>
            <p className="text-[13px] font-medium text-bleu-profond">{item[meta.displayField]}</p>
            {meta.subField && <p className="text-[10px] text-gris-ardoise">{item[meta.subField]}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); data.deleteItem(collectionKey, item.id); }}
            className="p-1.5 rounded-lg hover:bg-rouge-alerte/10 text-gris-ardoise hover:text-rouge-alerte transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <ChevronDown className={`w-4 h-4 text-gris-ardoise transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 grid grid-cols-2 gap-2">
              {meta.fields.map(f => (
                <div key={f.key}>
                  <label className="label mb-0.5 block text-[9px]">{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="input text-[12px] !py-1.5" value={editForm[f.key] || ''} onChange={e => set(f.key, e.target.value)}>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={f.type}
                      className="input text-[12px] !py-1.5"
                      value={editForm[f.key] ?? ''}
                      onChange={e => set(f.key, f.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
                    />
                  )}
                </div>
              ))}
              <div className="col-span-2 flex justify-end mt-1">
                <button
                  onClick={() => { data.updateItem(collectionKey, item.id, editForm); setExpanded(false); }}
                  className="btn-primary text-[11px] !py-1 !px-3"
                >
                  <Save className="w-3 h-3" /> Mettre a jour
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DataManager({ open, onClose }) {
  const data = useData();
  const [activeTab, setActiveTab] = useState('commandes');
  const [showAdd, setShowAdd] = useState(false);
  const meta = fieldMeta[activeTab];
  const items = data[activeTab] || [];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-[520px] max-w-[90vw] bg-white shadow-2xl z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gris-clair/60 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-or-brosse to-or-clair flex items-center justify-center">
                  <Database className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-bleu-profond">Data Manager</h2>
                  <p className="text-[10px] text-gris-ardoise">Donnees stockees dans le navigateur</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { data.resetToDefaults(); }} className="btn-secondary text-[11px] !py-1.5 !px-3 !gap-1.5 text-rouge-alerte border-rouge-alerte/20 hover:bg-rouge-alerte/5">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
                </button>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-gris-fond text-gris-ardoise"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-5 py-2 border-b border-gris-clair/40 flex gap-1 overflow-x-auto flex-shrink-0">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setShowAdd(false); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.key ? 'bg-bleu-profond text-white shadow-sm' : 'text-gris-ardoise hover:bg-gris-fond'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-2">
              {/* Add button */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] text-gris-ardoise font-medium">{items.length} element{items.length > 1 ? 's' : ''}</p>
                <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-[11px] !py-1.5 !px-3">
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </button>
              </div>

              {/* Add form */}
              <AnimatePresence>
                {showAdd && (
                  <InlineForm
                    fields={meta.fields}
                    defaults={meta.defaults}
                    onSave={(item) => { data.addItem(activeTab, item); setShowAdd(false); }}
                    onCancel={() => setShowAdd(false)}
                  />
                )}
              </AnimatePresence>

              {/* Items list */}
              <div className="space-y-2">
                {items.map((item, i) => (
                  <EditableRow key={item.id || i} item={item} meta={meta} collectionKey={activeTab} data={data} />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
