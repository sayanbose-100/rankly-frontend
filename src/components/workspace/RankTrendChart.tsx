import React, { useEffect, useState } from 'react';
import { keywordsApi } from '@/api/keywords.api';
import { KeywordRow, RankHistoryPoint } from '@/types/rankly';
import { formatShortDate } from '@/utils/formatters';

interface RankTrendChartProps {
  domainId: number;
  keywords: KeywordRow[];
  selectedIds: number[];
  onToggleKeyword: (id: number) => void;
}

const SERIES_COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'];

export const RankTrendChart: React.FC<RankTrendChartProps> = ({
  domainId,
  keywords,
  selectedIds,
  onToggleKeyword,
}) => {
  const [seriesMap, setSeriesMap] = useState<Record<number, RankHistoryPoint[]>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      selectedIds.map(async (kwId) => {
        const points = await keywordsApi.getRankHistory(domainId, kwId);
        return [kwId, points] as const;
      })
    ).then((entries) => {
      if (cancelled) return;
      const next: Record<number, RankHistoryPoint[]> = {};
      entries.forEach(([id, pts]) => {
        next[id] = pts;
      });
      setSeriesMap(next);
    });
    return () => {
      cancelled = true;
    };
  }, [domainId, selectedIds, keywords]);

  const width = 760;
  const height = 250;
  const padLeft = 44;
  const padRight = 24;
  const padTop = 20;
  const padBottom = 32;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  // Invert Y-axis: Rank #1 is at the top, Rank #50+ near bottom
  const maxRankScale = 50;
  const rankToY = (rank: number | null) => {
    const clamped = rank === null ? maxRankScale : Math.min(Math.max(rank, 1), maxRankScale);
    return padTop + ((clamped - 1) / (maxRankScale - 1)) * innerH;
  };

  const firstSeries = selectedIds.length > 0 ? seriesMap[selectedIds[0]] ?? [] : [];
  const yTicks = [1, 10, 25, 50];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            SERP Position Trajectory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Higher curve indicates better Google ranking (#1 at top). Toggle up to 4 keywords.
          </p>
        </div>

        {/* Keyword Series Pills */}
        <div className="flex flex-wrap gap-2">
          {keywords.slice(0, 6).map((kw) => {
            const idx = selectedIds.indexOf(kw.id);
            const active = idx !== -1;
            const color = active ? SERIES_COLORS[idx % SERIES_COLORS.length] : undefined;

            return (
              <button
                key={kw.id}
                type="button"
                onClick={() => onToggleKeyword(kw.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? 'border-transparent text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
                style={active ? { backgroundColor: color } : undefined}
              >
                <span className="max-w-[160px] truncate">{kw.phrase}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedIds.length === 0 ? (
        <div className="mt-6 flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-slate-800">
          Select at least one keyword above to visualize rank progression.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-60 w-full min-w-[540px]">
            {/* Horizontal Grid Lines */}
            {yTicks.map((tick) => {
              const y = rankToY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={width - padRight}
                    y2={y}
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-slate-400 font-mono text-[11px]"
                  >
                    #{tick === 50 ? '50+' : tick}
                  </text>
                </g>
              );
            })}

            {/* X-Axis Dates */}
            {firstSeries.map((pt, i) => {
              const x =
                firstSeries.length > 1
                  ? padLeft + (i / (firstSeries.length - 1)) * innerW
                  : padLeft + innerW / 2;
              return (
                <text
                  key={pt.id}
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-slate-400 font-mono text-[11px]"
                >
                  {formatShortDate(pt.checkedAt)}
                </text>
              );
            })}

            {/* Keyword Trend Lines */}
            {selectedIds.map((kwId, sIdx) => {
              const points = seriesMap[kwId] ?? [];
              if (points.length === 0) return null;
              const color = SERIES_COLORS[sIdx % SERIES_COLORS.length];

              const coords = points.map((pt, i) => {
                const x =
                  points.length > 1
                    ? padLeft + (i / (points.length - 1)) * innerW
                    : padLeft + innerW / 2;
                const y = rankToY(pt.rankPosition);
                return { x, y, rank: pt.rankPosition };
              });

              const d = coords
                .map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x} ${c.y}`)
                .join(' ');

              return (
                <g key={kwId}>
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={2.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {coords.map((c, idx) => (
                    <circle
                      key={idx}
                      cx={c.x}
                      cy={c.y}
                      r={4}
                      fill={color}
                      className="stroke-white dark:stroke-slate-900"
                      strokeWidth={2}
                    >
                      <title>{c.rank ? `Rank #${c.rank}` : 'Unranked (>100)'}</title>
                    </circle>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};
