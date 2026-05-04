'use client';
import { useState } from 'react';
import BodyMap from '@/components/BodyMap';
import SymptomForm from '@/components/SymptomForm';
import Report from '@/components/Report';

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
            Selecciona la zona, describe el síntoma y recibe orientación general.{' '}
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
          </div>
        </div>
      </div>
    </main>
  );
}