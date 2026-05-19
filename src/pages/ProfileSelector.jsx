import { motion } from 'framer-motion';
import { Briefcase, Wrench } from 'lucide-react';

export default function ProfileSelector({ onSelect }) {
  return (
    <div className="min-h-screen bg-gris-fond flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-bleu-profond mb-4">Bienvenue sur Rullier Hub</h1>
        <p className="text-gris-ardoise">Sélectionnez votre profil pour accéder à votre espace de travail personnalisé.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('directrice')}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gris-clair/50 hover:border-or-clair/50 hover:shadow-md transition-all text-left group"
        >
          <div className="w-14 h-14 bg-or-brosse/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-or-brosse/20 transition-colors">
            <Briefcase className="w-7 h-7 text-or-brosse" />
          </div>
          <h2 className="text-2xl font-bold text-bleu-profond mb-2">Directrice</h2>
          <p className="text-sm text-gris-ardoise">Accès complet au Tableau de Bord, Entrepôt, Commercial et Production.</p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('operateur')}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gris-clair/50 hover:border-bleu-info/50 hover:shadow-md transition-all text-left group"
        >
          <div className="w-14 h-14 bg-bleu-info/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-bleu-info/20 transition-colors">
            <Wrench className="w-7 h-7 text-bleu-info" />
          </div>
          <h2 className="text-2xl font-bold text-bleu-profond mb-2">Opérateur</h2>
          <p className="text-sm text-gris-ardoise">Accès limité à la gestion de l'Entrepôt et au planning de Production.</p>
        </motion.button>
      </div>
    </div>
  );
}
