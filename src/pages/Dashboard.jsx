import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, Package, ShoppingCart, AlertTriangle, Truck, ArrowUpRight,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useViewMode } from '../context/ViewModeContext';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

/* ===== KPI EXECUTIVE SUMMARY ===== */
function KPIExecutiveSummary({ compact }) {
  const { kpiDirection, produitsFinis, commandes } = useData();
  const tonnagePct = (kpiDirection.tonnage_annuel / kpiDirection.tonnage_objectif) * 100;
  const caPct = (kpiDirection.ca_annuel / kpiDirection.ca_objectif) * 100;
  const alertes = produitsFinis.filter(p => p.stock_kg < p.seuil_critique_kg).length;
  const cmdActives = commandes.filter(c => c.statut !== 'livree').length;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (tonnagePct / 100) * circumference;

  const pieData = [
    { name: 'Particuliers', value: kpiDirection.repartition_ca.particuliers, color: '#B8860B' },
    { name: 'Restauration', value: kpiDirection.repartition_ca.restauration, color: '#1B2A4A' },
  ];

  if (compact) {
    return (
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 text-center card-interactive">
          <p className="label mb-2">Chiffre d'affaires</p>
          <p className="text-3xl font-light text-bleu-profond">{(kpiDirection.ca_annuel / 1000).toFixed(0)}<span className="text-lg text-gris-ardoise ml-0.5">k&euro;</span></p>
          <div className="progress-bar mt-3"><div className="progress-bar-fill bg-gradient-to-r from-or-brosse to-or-clair" style={{ width: `${caPct}%` }} /></div>
        </div>
        <div className="card p-5 text-center card-interactive">
          <p className="label mb-2">Tonnage</p>
          <p className="text-3xl font-light text-bleu-profond">{kpiDirection.tonnage_annuel}<span className="text-lg text-gris-ardoise ml-0.5">t</span></p>
          <p className="text-[10px] text-gris-ardoise mt-1">/ {kpiDirection.tonnage_objectif}t ({tonnagePct.toFixed(0)}%)</p>
        </div>
        <div className="card p-5 text-center card-interactive">
          <p className="label mb-2">Commandes actives</p>
          <p className="text-3xl font-light text-bleu-profond">{cmdActives}</p>
          <span className="badge badge-info text-[10px] mt-1">{commandes.filter(c => c.statut === 'en_preparation').length} en prep.</span>
        </div>
        <div className="card p-5 text-center card-interactive">
          <p className="label mb-2">Alertes stock</p>
          <p className={`text-3xl font-light ${alertes > 0 ? 'text-rouge-alerte' : 'text-vert-sauge'}`}>{alertes}</p>
          {alertes > 0 && <AlertTriangle className="w-4 h-4 text-rouge-alerte mx-auto mt-1" />}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} className="card p-0 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-bleu-profond via-or-brosse to-or-clair" />
      <div className="p-6 pb-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-bleu-profond">Vue d'ensemble</h2>
            <p className="text-xs text-gris-ardoise mt-0.5">Indicateurs cles - Saison 2025-2026</p>
          </div>
          <span className="badge badge-info text-[10px]">Mis a jour a l'instant</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {/* CA */}
          <div className="space-y-2">
            <p className="label">Chiffre d'affaires</p>
            <p className="text-3xl font-light text-bleu-profond tracking-tight">
              {(kpiDirection.ca_annuel / 1000).toFixed(0)}<span className="text-lg text-gris-ardoise ml-0.5">k&euro;</span>
            </p>
            <div className="progress-bar">
              <div className="progress-bar-fill bg-gradient-to-r from-or-brosse to-or-clair" style={{ width: `${caPct}%` }} />
            </div>
            <p className="text-[10px] text-gris-ardoise">Objectif {(kpiDirection.ca_objectif / 1000).toFixed(0)}k&euro;</p>
          </div>

          {/* Tonnage - circular gauge */}
          <div className="space-y-2">
            <p className="label">Tonnage annuel</p>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#E2E8F0" strokeWidth="5" />
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#B8860B" strokeWidth="5"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-bleu-profond">{tonnagePct.toFixed(0)}%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-light text-bleu-profond">{kpiDirection.tonnage_annuel}<span className="text-sm text-gris-ardoise">t</span></p>
                <p className="text-[10px] text-gris-ardoise">/ {kpiDirection.tonnage_objectif}t</p>
              </div>
            </div>
          </div>

          {/* Commandes */}
          <div className="space-y-2">
            <p className="label">Commandes actives</p>
            <p className="text-3xl font-light text-bleu-profond">{cmdActives}</p>
            <div className="flex items-center gap-1.5">
              <span className="badge badge-info text-[10px]">{commandes.filter(c => c.statut === 'en_preparation').length} preparation</span>
            </div>
            <p className="text-[10px] text-gris-ardoise">{commandes.filter(c => c.statut === 'expediee').length} en transit</p>
          </div>

          {/* Alertes stock */}
          <div className="space-y-2">
            <p className="label">Alertes stock</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-light ${alertes > 0 ? 'text-rouge-alerte' : 'text-vert-sauge'}`}>{alertes}</p>
              {alertes > 0 && <AlertTriangle className="w-4 h-4 text-rouge-alerte" />}
            </div>
            <p className="text-[10px] text-gris-ardoise">
              {alertes > 0 ? 'Produit(s) sous seuil critique' : 'Tous stocks nominaux'}
            </p>
          </div>

          {/* Repartition mini donut */}
          <div className="space-y-2">
            <p className="label">Repartition CA</p>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={16} outerRadius={26} paddingAngle={3} dataKey="value" stroke="none">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[11px] space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-bleu-profond" />
                  <span className="text-gris-ardoise">Resto <span className="font-semibold text-bleu-profond">{kpiDirection.repartition_ca.restauration}%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-or-brosse" />
                  <span className="text-gris-ardoise">Particuliers <span className="font-semibold text-bleu-profond">{kpiDirection.repartition_ca.particuliers}%</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Tendance */}
          <div className="space-y-2">
            <p className="label">Tendance</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-light text-vert-sauge">+12<span className="text-lg">%</span></p>
              <div className="w-7 h-7 rounded-full bg-vert-sauge-light flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-vert-sauge" />
              </div>
            </div>
            <p className="text-[10px] text-gris-ardoise">vs. meme periode N-1</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== CUSTOM TOOLTIP ===== */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="card !p-3 !rounded-xl text-sm shadow-lg">
        <p className="font-semibold text-bleu-profond">{label}</p>
        <p className="text-or-brosse">{payload[0].value}t produites</p>
        <p className="text-gris-ardoise">{(payload[1]?.value || 0).toLocaleString('fr-FR')}&euro; CA</p>
      </div>
    );
  }
  return null;
}

/* ===== MAIN DASHBOARD ===== */
export default function Dashboard() {
  const { produitsFinis, commandes, productionMensuelle, kpiDirection } = useData();
  const { isCompact } = useViewMode();

  const pieData = [
    { name: 'Particuliers', value: kpiDirection.repartition_ca.particuliers, color: '#B8860B' },
    { name: 'Restauration', value: kpiDirection.repartition_ca.restauration, color: '#1B2A4A' },
  ];

  const commandesEnCours = commandes.filter(c => c.statut === 'en_preparation').length;
  const commandesExpediees = commandes.filter(c => c.statut === 'expediee').length;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">

        {/* KPI Executive Summary */}
        <KPIExecutiveSummary compact={isCompact} />

        {/* Seasonality Chart — hidden in compact */}
        {!isCompact && (
          <motion.div variants={fadeUp} className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[15px] font-semibold text-bleu-profond">Saisonnalite de Production</h3>
                <p className="text-xs text-gris-ardoise mt-0.5">
                  Pic Nov/Dec = <span className="text-or-brosse font-semibold">50% du CA annuel</span>
                </p>
              </div>
              <div className="flex gap-4 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-or-brosse" /> Tonnage</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-bleu-profond/30" /> CA</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={productionMensuelle} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gTonnage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B8860B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#B8860B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B2A4A" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1B2A4A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.6} />
                <XAxis dataKey="mois" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="t" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="€" />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="tonnage" stroke="#B8860B" strokeWidth={2} fill="url(#gTonnage)" />
                <Area yAxisId="right" type="monotone" dataKey="ca" stroke="#1B2A4A" strokeWidth={1.5} strokeDasharray="5 5" fill="url(#gCA)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Bottom row */}
        <div className={`grid grid-cols-1 ${isCompact ? '' : 'lg:grid-cols-2'} gap-6`}>
          {/* CA Split — hidden in compact */}
          {!isCompact && (
            <motion.div variants={fadeUp} className="card p-6">
              <h3 className="text-[15px] font-semibold text-bleu-profond mb-5">Repartition du CA</h3>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={4} dataKey="value" stroke="none">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4 flex-1">
                  {pieData.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-sm font-medium text-bleu-profond">{item.name}</p>
                          <p className="text-[11px] text-gris-ardoise">{item.name === 'Restauration' ? 'Hotels, Stations, Restos' : 'Epiceries fines, Marches'}</p>
                        </div>
                      </div>
                      <span className="text-xl font-light text-bleu-profond">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Orders */}
          <motion.div variants={fadeUp} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-bleu-profond">Dernieres Commandes</h3>
              <span className="badge badge-info text-[10px]"><Truck className="w-3 h-3" /> {commandesEnCours + commandesExpediees} actives</span>
            </div>
            <div className="space-y-2.5">
              {commandes.slice(0, isCompact ? 3 : 5).map(cmd => (
                <div key={cmd.id} className="flex items-center justify-between py-2 border-b border-gris-clair/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-bleu-profond">{cmd.client_nom}</p>
                    {!isCompact && <p className="text-[11px] text-gris-ardoise">{cmd.id} - {cmd.produits?.map(p => p.variante).join(', ')}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-bleu-profond">{cmd.montant}&euro;</p>
                    <span className={`badge text-[10px] ${cmd.statut === 'livree' ? 'badge-success' : cmd.statut === 'expediee' ? 'badge-info' : 'badge-warning'}`}>
                      {cmd.statut === 'livree' ? 'Livree' : cmd.statut === 'expediee' ? 'Expediee' : 'En preparation'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
