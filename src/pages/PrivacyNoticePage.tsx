import { PrivacyNoticeContent } from '../components/PrivacyNoticeContent';

export function PrivacyNoticePage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-card-lg border border-neutral-200 bg-parchment-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-emerald-deep">Aviso de Privacidad</h1>
        <div className="mt-6">
          <PrivacyNoticeContent />
        </div>
      </div>
    </div>
  );
}
