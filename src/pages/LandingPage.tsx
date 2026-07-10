import { Logo } from '../components/Logo';
import { LeadForm } from '../components/LeadForm';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="flex justify-center py-6">
        <Logo className="h-8 text-neutral-900" />
      </header>
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-500 sm:text-3xl">
            ¿Cuánto vale hoy tu casa en Zona Esmeralda?
          </h1>
          <p className="mt-2 text-neutral-600">
            Un asesor de Habitanza te comparte el valor estimado de tu propiedad, sin costo y sin compromiso.
          </p>
        </div>
        <LeadForm />
        <p className="text-center text-xs text-neutral-400">
          Habitanza · Zona Esmeralda, Atizapán de Zaragoza
        </p>
      </main>
    </div>
  );
}
