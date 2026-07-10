import { TEAM_MEMBERS } from '@shared/team';
import { AdvisorAvatar } from './AdvisorAvatar';

// The full active roster (see shared/team.ts), not just the smaller pool
// used for the WhatsApp CTA rotation -- this is a "meet the team" trust
// module, so everyone real should show up here.
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
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-parchment-card p-4 text-center"
          >
            <AdvisorAvatar advisor={member} className="h-14 w-14 border border-neutral-200" iconClassName="h-6 w-6 text-neutral-400" />
            <div>
              <p className="text-sm font-bold text-neutral-900">{member.name}</p>
              <p className="text-xs text-neutral-500">{member.roleLabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
