import useApp from '../../context/useApp';

// ActivityHeat: responsive heat row, defaulting to 30 days, palette-driven intensity
const DAYS_DEFAULT = 30;

const dateKey = (d) => d.toISOString().split('T')[0];

// We'll build a palette from the app primary color `--color-streak` at runtime.
// This creates a series of RGBA steps from faint -> strong using the same hue.

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

const buildPaletteFromHex = (hex) => {
  try {
    const [r, g, b] = hexToRgb(hex);
    return [0.08, 0.28, 0.5, 0.75, 1].map((alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`);
  } catch {
    // fallback to the original green if parsing fails
    return ['rgba(110,231,183,0.08)', 'rgba(110,231,183,0.28)', 'rgba(110,231,183,0.5)', 'rgba(110,231,183,0.75)', 'rgba(110,231,183,1)'];
  }
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const ActivityHeat = ({ days = DAYS_DEFAULT }) => {
  const { state } = useApp();

  // Derive primary color from CSS var `--color-streak` when running in the browser.
  let primaryHex = '#6ee7b7';
  if (typeof window !== 'undefined' && typeof getComputedStyle === 'function') {
    const cssVal = getComputedStyle(document.documentElement).getPropertyValue('--color-streak');
    if (cssVal) primaryHex = cssVal.trim();
  }

  const PALETTE_COLORS = buildPaletteFromHex(primaryHex);

  // Build last N days array (oldest first)
  const today = new Date();
  const daysArr = Array.from({ length: days }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (days - 1 - i));
    return d;
  });

  // Count activities per day using logEntries.time and task.createdAt if present
  const counts = daysArr.map((d) => {
    const key = dateKey(d);
    const fromLogs = (state.logEntries || []).filter((l) => {
      const t = l.time || l.createdAt || l.date;
      if (!t) return false;
      return t.split('T')[0] === key;
    }).length;

    const fromTasks = (state.tasks || []).filter((t) => {
      const created = t.createdAt || t.time || null;
      if (!created && typeof t.id === 'number') {
        // if id looks like timestamp, try to use it
        const k = new Date(t.id).toISOString().split('T')[0];
        return k === key;
      }
      if (!created) return false;
      return created.split('T')[0] === key;
    }).length;

    return fromLogs + fromTasks;
  });

  const maxCount = Math.max(...counts, 1);

  // Map count to palette index (0..palette.length-1)
  const mapToIndex = (count) => {
    if (!count) return 0;
    const levels = PALETTE_COLORS.length - 1; // excluding zero
    const idx = Math.ceil((count / maxCount) * levels);
    return clamp(idx, 1, levels);
  };

  return (
    <div className="w-full">
      {/* grid that auto-fits squares to available width, keeping them square via aspectRatio */}
      <div
        className="grid gap-2 py-2"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(12px, 20px))` }}
      >
        {daysArr.map((d, idx) => {
          const count = counts[idx];
          const color = PALETTE_COLORS[mapToIndex(count)];
          return (
            <div key={d.toISOString()} className="group relative inline-block">
              <div
                aria-hidden
                style={{ aspectRatio: '1 / 1', backgroundColor: color }}
                className={`w-full rounded-sm transition-transform transform-gpu group-hover:scale-105`}
              />

              {/* tooltip */}
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-12 z-50 w-max rounded-md bg-night px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                <div className="font-semibold">{d.toDateString()}</div>
                <div className="text-sm text-muted">{count} activity{count !== 1 ? 's' : ''}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted mr-2">Less</span>
          {PALETTE_COLORS.map((c, i) => (
            <span key={i} style={{ backgroundColor: c }} className="w-4 h-4 rounded-sm" />
          ))}
          <span className="text-xs text-muted ml-2">More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeat;
