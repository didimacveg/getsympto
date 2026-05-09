import jsPDF from 'jspdf';

// Limpia caracteres que jsPDF no puede renderizar
function clean(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')   // emoji
    .replace(/[\u{2600}-\u{26FF}]/gu, '')       // símbolos misc
    .replace(/[\u{2700}-\u{27BF}]/gu, '')       // dingbats
    .replace(/⏱|⚠️|⚠|🔴|🟠|🟡|🟢/gu, '')
    .replace(/&amp;/g, 'y')
    .replace(/\s+/g, ' ')
    .trim();
}

const SEVERITY_LABELS: Record<string, Record<string, string>> = {
  bajo:    { es: 'Bajo',    en: 'Low',    zh: 'Bajo',   ru: 'Bajo'    },
  medio:   { es: 'Medio',   en: 'Medium', zh: 'Medio',  ru: 'Medio'   },
  alto:    { es: 'Alto',    en: 'High',   zh: 'Alto',   ru: 'Alto'    },
  urgente: { es: 'Urgente', en: 'Urgent', zh: 'Urgente',ru: 'Urgente' },
};

const ACTION_LABELS: Record<string, Record<string, string>> = {
  observar:             { es: 'Observar en casa',  en: 'Monitor at home', zh: 'Observar en casa', ru: 'Observar en casa' },
  medico_general:       { es: 'Consultar medico',  en: 'See a doctor',    zh: 'Consultar medico', ru: 'Consultar medico' },
  especialista:         { es: 'Especialista',       en: 'Specialist',      zh: 'Especialista',     ru: 'Especialista'     },
  urgencias:            { es: 'Ir a urgencias',     en: 'Go to emergency', zh: 'Ir a urgencias',   ru: 'Ir a urgencias'   },
  emergencia_inmediata: { es: 'Llamar al 112',      en: 'Call 112',        zh: 'Llamar al 112',    ru: 'Llamar al 112'    },
};

const FREQ_LABELS: Record<string, Record<string, string>> = {
  comun:       { es: 'Frecuente',       en: 'Common',      zh: 'Frecuente',       ru: 'Frecuente'       },
  menos_comun: { es: 'Menos frecuente', en: 'Less common', zh: 'Menos frecuente', ru: 'Menos frecuente' },
  rara:        { es: 'Poco frecuente',  en: 'Rare',        zh: 'Poco frecuente',  ru: 'Poco frecuente'  },
};

const HEADINGS: Record<string, Record<string, string>> = {
  title:         { es: 'Informe de Sintoma - Sympto+',      en: 'Symptom Report - Sympto+'        },
  date:          { es: 'Fecha',                             en: 'Date'                            },
  zone:          { es: 'Zona corporal',                     en: 'Body zone'                       },
  severity:      { es: 'Nivel de severidad',                en: 'Severity level'                  },
  description:   { es: 'Descripcion',                       en: 'Description'                     },
  explanation:   { es: 'Explicacion',                       en: 'Explanation'                     },
  contexts:      { es: 'Posibles contextos',                en: 'Possible contexts'               },
  recommendation:{ es: 'Recomendacion',                     en: 'Recommendation'                  },
  timeframe:     { es: 'Cuando actuar',                     en: 'When to act'                     },
  red_flags:     { es: 'Senales de alarma',                 en: 'Warning signs'                   },
  general_info:  { es: 'Informacion general',               en: 'General information'             },
  footer:        { es: 'Este informe es orientativo. Consulta siempre con un profesional sanitario.',
                   en: 'This report is for informational purposes only. Always consult a healthcare professional.' },
};

function h(key: string, locale: string): string {
  return HEADINGS[key]?.[locale] || HEADINGS[key]?.es || key;
}

function wrapText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const lines = doc.splitTextToSize(clean(text), maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export function generateReportPDF(query: {
  zone: string;
  description: string;
  severity: string;
  created_at: string;
  locale: string;
  report_data: {
    severity_explanation?: string;
    possible_contexts?: { context: string; description: string; frequency: string }[];
    action_recommendation?: { primary: string; explanation: string; timeframe: string };
    red_flags?: string[];
    general_info?: string;
    disclaimer?: string;
  } | null;
}): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const locale = ['es', 'en'].includes(query.locale) ? query.locale : 'es';
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  const lineH = 6;
  let y = margin;

  const checkPage = (needed = 20) => {
    if (y + needed > 272) { doc.addPage(); y = margin; }
  };

  // Header
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Sympto+', margin, 12);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(h('title', locale), margin + 24, 12);
  y = 28;

  // Fecha
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  const dateStr = new Date(query.created_at).toLocaleDateString(
    locale === 'en' ? 'en-GB' : 'es-ES',
    { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  );
  doc.text(`${h('date', locale)}: ${dateStr}`, margin, y);
  y += 10;

  // Zona y severidad
  const sevLabel = SEVERITY_LABELS[query.severity]?.[locale] || query.severity;
  const sevColors: Record<string, [number,number,number]> = {
    bajo:[220,252,231], medio:[254,249,195], alto:[255,237,213], urgente:[254,226,226],
  };
  const sevTextColors: Record<string, [number,number,number]> = {
    bajo:[21,128,61], medio:[161,98,7], alto:[154,52,18], urgente:[185,28,28],
  };
  const bgColor = sevColors[query.severity] || sevColors.bajo;
  const txtColor = sevTextColors[query.severity] || sevTextColors.bajo;

  doc.setFillColor(...bgColor);
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
  doc.setTextColor(...txtColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`${h('zone', locale)}: ${clean(query.zone)}`, margin + 4, y + 7);
  doc.text(`${h('severity', locale)}: ${sevLabel}`, margin + 4, y + 15);
  y += 28;

  // Descripcion
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(h('description', locale), margin, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  y = wrapText(doc, query.description, margin, y, contentWidth, lineH);
  y += 8;

  const report = query.report_data;
  if (!report) {
    doc.setFontSize(9);
    doc.setTextColor(148,163,184);
    doc.text('Informe detallado no disponible.', margin, y);
  } else {

    // Explicacion severidad
    if (report.severity_explanation) {
      checkPage(20);
      doc.setTextColor(30,41,59);
      doc.setFont('helvetica','bold');
      doc.setFontSize(10);
      doc.text(h('explanation', locale), margin, y); y += 6;
      doc.setFont('helvetica','normal');
      doc.setFontSize(9);
      doc.setTextColor(71,85,105);
      y = wrapText(doc, report.severity_explanation, margin, y, contentWidth, lineH);
      y += 8;
    }

    // Posibles contextos
    if (report.possible_contexts?.length) {
      checkPage(20);
      doc.setTextColor(30,41,59);
      doc.setFont('helvetica','bold');
      doc.setFontSize(10);
      doc.text(h('contexts', locale), margin, y); y += 7;

      for (const ctx of report.possible_contexts) {
        checkPage(20);
        const freqKey = ctx.frequency?.replace('ú','u').replace('ó','o') || 'comun';
        const freqLabel = FREQ_LABELS[freqKey]?.[locale] || ctx.frequency;
        const titleLine = `${clean(ctx.context)} (${freqLabel})`;
        const descLines = doc.splitTextToSize(clean(ctx.description), contentWidth - 8);
        const boxH = 14 + descLines.length * (lineH - 1);

        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, y, contentWidth, boxH, 2, 2, 'F');
        doc.setFont('helvetica','bold');
        doc.setFontSize(9);
        doc.setTextColor(30,41,59);
        doc.text(`- ${titleLine}`, margin + 3, y + 7);
        doc.setFont('helvetica','normal');
        doc.setFontSize(8.5);
        doc.setTextColor(71,85,105);
        doc.text(descLines, margin + 3, y + 13);
        y += boxH + 3;
      }
      y += 4;
    }

    // Recomendacion
    if (report.action_recommendation) {
      checkPage(28);
      const actionKey = report.action_recommendation.primary;
      const actionLabel = ACTION_LABELS[actionKey]?.[locale] || clean(actionKey);
      const expLines = doc.splitTextToSize(clean(report.action_recommendation.explanation), contentWidth - 8);
      const recH = 28 + expLines.length * lineH;

      doc.setFillColor(239, 246, 255);
      doc.roundedRect(margin, y, contentWidth, recH, 3, 3, 'F');
      doc.setTextColor(29, 78, 216);
      doc.setFont('helvetica','bold');
      doc.setFontSize(10);
      doc.text(h('recommendation', locale), margin + 4, y + 8);
      doc.setFontSize(9);
      doc.text(actionLabel, margin + 4, y + 15);
      doc.setFont('helvetica','normal');
      doc.setFontSize(8.5);
      doc.setTextColor(59, 130, 246);
      doc.text(expLines, margin + 4, y + 22);
      y += recH + 4;

      if (report.action_recommendation.timeframe) {
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`${h('timeframe', locale)}: ${clean(report.action_recommendation.timeframe)}`, margin, y);
        y += 8;
      }
      y += 4;
    }

    // Senales de alarma
    if (report.red_flags?.length) {
      checkPage(20);
      const flagLines = report.red_flags.flatMap(f => doc.splitTextToSize(`- ${clean(f)}`, contentWidth - 8));
      const flagH = 14 + flagLines.length * (lineH - 1);

      doc.setFillColor(254, 242, 242);
      doc.roundedRect(margin, y, contentWidth, flagH, 3, 3, 'F');
      doc.setTextColor(185, 28, 28);
      doc.setFont('helvetica','bold');
      doc.setFontSize(10);
      doc.text(`[!] ${h('red_flags', locale)}`, margin + 4, y + 8);
      doc.setFont('helvetica','normal');
      doc.setFontSize(8.5);
      let fy = y + 14;
      for (const f of report.red_flags) {
        const fl = doc.splitTextToSize(`- ${clean(f)}`, contentWidth - 8);
        doc.text(fl, margin + 4, fy);
        fy += fl.length * (lineH - 1);
      }
      y += flagH + 8;
    }

    // Info general
    if (report.general_info) {
      checkPage(20);
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica','bold');
      doc.setFontSize(10);
      doc.text(h('general_info', locale), margin, y); y += 6;
      doc.setFont('helvetica','normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      y = wrapText(doc, report.general_info, margin, y, contentWidth, lineH);
      y += 8;
    }
  }

  // Footer en cada pagina
  const totalPages = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 282, pageWidth, 15, 'F');
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7);
    doc.setFont('helvetica','normal');
    doc.text(h('footer', locale), margin, 289);
    doc.text(`${i} / ${totalPages}`, pageWidth - margin, 289, { align: 'right' });
  }

  const fileName = `sympto-informe-${clean(query.zone)}-${new Date(query.created_at).toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}