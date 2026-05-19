import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, ShoppingCart, AlertTriangle, Factory, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const pageV = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };
const fadeUp  = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card !p-3 !rounded-xl text-sm shadow-lg">
      <p className="font-semibold text-bleu-profond">{label}</p>
      <p className="text-or-brosse">{payload[0].value} t produites</p>
      <p className="text-gris-ardoise">{(payload[1]?.value || 0).toLocaleString('fr-FR')} € CA</p>
    </div>
  );
}

export default function Dashboard() {
  const { productionMensuelle, commandes, matierespremieres, produitsFinis } = useData();

  const currentMonth  = new Date().getMonth();
  const tonnageMois   = productionMensuelle[currentMonth]?.tonnage ?? 0;
  const nbEnCours     = commandes.filter(c => c.statut !== 'Livrée').length;
  const nbAlertes     = [
    ...matierespremieres.filter(mp => mp.statut === 'Critique'),
    ...produitsFinis.filter(pf => pf.quantite_kg <= pf.seuil_kg),
  ].length;

  return (
    <motion.div
      variants={pageV} initial="initial" animate="animate" exit="exit"
      className="h-full flex flex-col gap-4"
    >
      <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4 h-full">

        {/* ── KPIs ──────────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="card p-7 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <p className="text-sm font-semibold text-gris-ardoise">CA du mois</p>
              <div className="w-8 h-8 rounded-lg bg-or-brosse/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-or-brosse" />
              </div>
            </div>
            <p className="text-4xl font-light text-bleu-profond">68 450 <span className="text-base text-gris-ardoise">€</span></p>
            <div className="flex items-center gap-1.5 mt-3">
              <ArrowUpRight className="w-3.5 h-3.5 text-vert-sauge" />
              <span className="text-sm font-semibold text-vert-sauge">+12%</span>
              <span className="text-sm text-gris-ardoise">vs N-1</span>
            </div>
          </div>

          <div className="card p-7 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <p className="text-sm font-semibold text-gris-ardoise">Commandes</p>
              <div className="w-8 h-8 rounded-lg bg-bleu-info/10 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-bleu-info" />
              </div>
            </div>
            <p className="text-4xl font-light text-bleu-profond">{nbEnCours}</p>
            <p className="text-sm text-gris-ardoise mt-3">en cours</p>
          </div>

          <div className="card p-7 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <p className="text-sm font-semibold text-gris-ardoise">Alertes stocks</p>
              <div className="w-8 h-8 rounded-lg bg-rouge-alerte/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-rouge-alerte" />
              </div>
            </div>
            <p className="text-4xl font-light text-rouge-alerte">{nbAlertes}</p>
            <p className="text-sm text-gris-ardoise mt-3">critiques</p>
          </div>

          <div className="card p-7 flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4">
              <p className="text-sm font-semibold text-gris-ardoise">Production</p>
              <div className="w-8 h-8 rounded-lg bg-vert-sauge/10 flex items-center justify-center">
                <Factory className="w-4 h-4 text-vert-sauge" />
              </div>
            </div>
            <p className="text-4xl font-light text-bleu-profond">{tonnageMois} <span className="text-base text-gris-ardoise">t</span></p>
            <p className="text-sm text-gris-ardoise mt-3">ce mois-ci</p>
          </div>
        </motion.div>

        {/* ── Graphique — occupe tout l'espace restant ───────────────── */}
        <motion.div variants={fadeUp} className="card p-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-semibold text-bleu-profond">Saisonnalité de Production</h3>
              <p className="text-sm text-gris-ardoise mt-1">
                Pic Nov/Déc = <span className="text-or-brosse font-semibold">50% du CA annuel</span>
              </p>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-or-brosse" /> Tonnage</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-bleu-profond/30" /> CA</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionMensuelle} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gTonnage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#B8860B" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#B8860B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1B2A4A" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1B2A4A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" strokeOpacity={0.6} />
                <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left"  tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} unit="t" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} unit="€" />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left"  type="step" dataKey="tonnage" stroke="#B8860B" strokeWidth={2.5} fill="url(#gTonnage)" />
                <Area yAxisId="right" type="step" dataKey="ca"      stroke="#1B2A4A" strokeWidth={2}   strokeDasharray="5 5" fill="url(#gCA)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
