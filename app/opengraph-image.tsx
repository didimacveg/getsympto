import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sympto+ | Orientación de síntomas corporales';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '8px',
          background: '#3b82f6',
        }} />

        <div style={{
          fontSize: '88px',
          fontWeight: '700',
          color: '#f8fafc',
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: '24px',
        }}>
          Sympto+
        </div>

        <div style={{
          fontSize: '32px',
          color: '#94a3b8',
          marginBottom: '40px',
          fontWeight: '400',
        }}>
          Orientación informativa de síntomas corporales
        </div>

        <div style={{
          width: '560px',
          height: '1px',
          background: '#1e3a5f',
          marginBottom: '40px',
        }} />

        <div style={{
          fontSize: '24px',
          color: '#475569',
          marginBottom: '48px',
        }}>
          Selecciona la zona · Describe el síntoma · Recibe orientación
        </div>

        <div style={{
          background: '#1d4ed8',
          borderRadius: '10px',
          padding: '14px 32px',
          fontSize: '22px',
          color: '#f8fafc',
          fontWeight: '500',
          width: 'fit-content',
        }}>
          getsympto.app
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          fontSize: '18px',
          color: '#334155',
        }}>
          No es diagnóstico médico · Uso informativo y educativo
        </div>
      </div>
    ),
    { ...size }
  );
}