import { ADVISORS } from '@shared/advisors';
import { AdvisorAvatar } from './AdvisorAvatar';

// A starting point for a "meet the team" module -- currently just the two
// real advisors already used elsewhere (AdvisorCTA, the reveal screen's
// firma block). Expand with more advisors/bios here as the roster grows.
export function TeamSection() {
  return (
    <div className="space-y-3 text-left">
      <div className="text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-brass">
          Tu equipo en la zona
        </p>
        <h3 className="mt-1 text-base font-bold text-neutral-900">Personas reales, no un call center</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {ADVISORS.map((advisor) => (
          <div
            key={advisor.name}
            className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-parchment-card p-4 text-center"
          >
            <AdvisorAvatar advisor={advisor} className="h-14 w-14 border border-neutral-200" iconClassName="h-6 w-6 text-neutral-400" />
            <div>
              <p className="text-sm font-bold text-neutral-900">{advisor.name}</p>
              <p className="text-xs text-neutral-500">{advisor.roleLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
