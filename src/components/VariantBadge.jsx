export default function VariantBadge({ variante, couleur, size = 'sm' }) {
  const sizes = {
    xs: { dot: 'w-2 h-2', text: 'text-[10px]', px: 'px-2 py-0.5' },
    sm: { dot: 'w-2.5 h-2.5', text: 'text-xs', px: 'px-2.5 py-1' },
    md: { dot: 'w-3 h-3', text: 'text-sm', px: 'px-3 py-1.5' },
  };
  const s = sizes[size] || sizes.sm;

  return (
    <span className={`inline-flex items-center gap-1.5 ${s.px} rounded-full bg-slate-100/80 border border-slate-200/50 ${s.text} font-medium text-bleu-profond`}>
      <span className={`${s.dot} rounded-full flex-shrink-0`} style={{ backgroundColor: couleur }} />
      {variante}
    </span>
  );
}
