'use client';
import { useState } from 'react';
import BodyMap from '@/components/BodyMap';
import SymptomForm from '@/components/SymptomForm';
import Report from '@/components/Report';

const SEO_ZONES = [
  { zona: 'Cabeza', ejemplos: 'dolor de cabeza, migraña, presión en las sienes' },
  { zona: 'Pecho', ejemplos: 'dolor en el pecho, presión torácica, molestia al respirar' },
  { zona: 'Abdomen', ejemplos: 'dolor de estómago, hinchazón, molestias digestivas' },
  { zona: 'Espalda', ejemplos: 'dolor de espalda, lumbalgia, tensión muscular' },
  { zona: 'Rodilla', ejemplos: 'dolor de rodilla, inflamación, crujidos' },
  { zona: 'Hombro', ejemplos: 'dolor de hombro, rigidez, dificultad al mover el brazo' },
];

export default function Home() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [report, setReport] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (symptomData: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone: selectedZone, ...symptomData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');
      setReport(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setSelectedZone(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">¿Qué zona te molesta?</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Selecciona la zona del cuerpo, describe tu síntoma y recibe orientación informativa general.{' '}
            <span className="font-medium text-slate-600">No es diagnóstico médico.</span>
          </p>
        </header>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700 text-center">
          ⚠️ Esta herramienta es exclusivamente informativa y educativa. No sustituye la consulta con un profesional médico.
          Ante síntomas graves o urgentes, llama al <strong>112</strong>.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <BodyMap onZoneSelect={(z: string) => { setSelectedZone(z); setReport(null); }} selectedZone={selectedZone} />
            {!selectedZone && (
              <p className="text-slate-400 text-sm mt-4 animate-pulse">↑ Toca la zona que te molesta</p>
            )}
          </div>

          <div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm mb-4">
                {error}
              </div>
            )}
            {!report && selectedZone && (
              <SymptomForm zone={selectedZone} onSubmit={handleAnalyze} loading={loading} />
            )}
            {report && (
              <Report data={report} onReset={handleReset} />
            )}
            {!selectedZone && !report && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-700 mb-3">¿Cómo funciona?</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <p className="text-sm text-slate-600">Toca la zona de tu cuerpo donde sientes molestia</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <p className="text-sm text-slate-600">Describe el síntoma con tus palabras</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <p className="text-sm text-slate-600">Recibe orientación informativa general al instante</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">100% anónimo · Sin registro · Orientación general, no diagnóstico</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sección SEO — visible para Google, útil para el usuario */}
        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-700 text-center mb-2">
            Consultas frecuentes por zona corporal
          </h2>
          <p className="text-sm text-slate-500 text-center mb-8">
            Selecciona cualquier zona del mapa para obtener orientación sobre tus síntomas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEO_ZONES.map((item) => (
              <div key={item.zona} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <h3 className="font-medium text-slate-700 mb-1">{item.zona}</h3>
                <p className="text-xs text-slate-500">{item.ejemplos}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-slate-400 pb-6">
          <p>Sympto+ · Orientación informativa de síntomas corporales</p>
          <p className="mt-1">Esta plataforma no proporciona diagnósticos médicos. Ante cualquier duda, consulta con tu médico.</p>
        </footer>

      </div>
    </main>
  );
}