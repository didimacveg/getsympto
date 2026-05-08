import jsPDF from 'jspdf';

const SEVERITY_LABELS: Record<string, Record<string, string>> = {
  bajo:    { es: 'Bajo',    en: 'Low',    zh: '低',   ru: 'Низкий'  },
  medio:   { es: 'Medio',   en: 'Medium', zh: '中',   ru: 'Средний' },
  alto:    { es: 'Alto',    en: 'High',   zh: '高',   ru: 'Высокий' },
  urgente: { es: 'Urgente', en: 'Urgent', zh: '紧急', ru: 'Срочно'  },
};

const ACTION_LABELS: Record<string, Record<string, string>> = {
  observar:             { es: 'Observar en casa',  en: 'Monitor at home', zh: '居家观察', ru: 'Наблюдать дома' },
  medico_general:       { es: 'Consultar médico',  en: 'See a doctor',    zh: '看医生',   ru: 'К врачу'        },
  especialista:         { es: 'Especialista',       en: 'Specialist',      zh: '专科医生', ru: 'К специалисту'  },
  urgencias:            { es: 'Ir a urgencias',     en: 'Go to emergency', zh: '去急诊',   ru: 'В скорую'       },
  emergencia_inmediata: { es: 'Llamar al 112',      en: 'Call 112',        zh: '拨打急救', ru: 'Вызвать 112'    },
};

const FREQ_LABELS: Record<string, Record<string, string>> = {
  común:       { es: 'Frecuente',       en: 'Common',      zh: '常见',  ru: 'Часто'  },
  menos_común: { es: 'Menos frecuente', en: 'Less common', zh: '较少见',ru: 'Реже'   },
  rara:        { es: 'Poco frecuente',  en: 'Rare',        zh: '罕见',  ru: 'Редко'  },
};

const HEADINGS: Record<string, Record<string, string>> = {
  title:        { es: 'Informe de Síntoma — Sympto+',       en: 'Symptom Report — Sympto+',         zh: '症状报告 — Sympto+',      ru: 'Отчёт о симптоме — Sympto+' },
  date:         { es: 'Fecha',                              en: 'Date',                             zh: '日期',                    ru: 'Дата'                       },
  zone:         { es: 'Zona corporal',                      en: 'Body zone',                        zh: '身体部位',                ru: 'Зона тела'                  },
  description:  { es: 'Descripción',                        en: 'Description',                      zh: '描述',                    ru: 'Описание'                   },
  severity:     { es: 'Nivel de severidad',                 en: 'Severity level',                   zh: '严重程度',                ru: 'Уровень серьёзности'        },
  explanation:  { es: 'Explicación',                        en: 'Explanation',                      zh: '说明',                    ru: 'Объяснение'                 },
  contexts:     { es: 'Posibles contextos',                 en: 'Possible contexts',                zh: '可能的情况',              ru: 'Возможные причины'          },
  recommendation:{ es: 'Recomendación',                     en: 'Recommendation',                   zh: '建议',                    ru: 'Рекомендация'               },
  timeframe:    { es: 'Cuándo actuar',                      en: 'When to act',                      zh: '何时行动',                ru: 'Когда действовать'          },
  red_flags:    { es: 'Señales de alarma',                  en: 'Warning signs',                    zh: '警告信号',                ru: 'Тревожные признаки'         },
  general_info: { es: 'Información general',                en: 'General information',              zh: '一般信息',                ru: 'Общая información'          },
  disclaimer:   { es: 'Aviso importante',                   en: 'Important notice',                 zh: '重要提示',                ru: 'Важное уведомление'         },
  footer:       { es: 'Este informe es exclusivamente informativo. No sustituye la consulta médica.',
                  en: 'This report is for informational purposes only. It does not replace medical advice.',
                  zh: '此报告仅供参考，不能替代医疗建议。',
                  ru: 'Этот отчёт носит исключительно информационный характер и не заменяет медицинскую консультацию.' },
};

function h(key: string, locale: string): string {
  return HEADINGS[key]?.[locale] || HEADINGS[key]?.es || key;
}

function wrapText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
  const lines = doc.splitTextToSize(text, maxWidth);
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
  const locale = query.locale || 'es';
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  const lineH = 6;
  let y = margin;

  const addPage = () => {
    doc.addPage();
    y = margin;
  };

  const checkPage = (needed = 20) => {
    if (y + needed > 275) addPage();
  };

  // Header bar
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Sympto+', margin, 12);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(h('title', locale), margin + 22, 12);
  y = 28;

  // Date
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  const dateStr = new Date(query.created_at).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-GB' : 'es-ES',
    { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  );
  doc.text(`${h('date', locale)}: ${dateStr}`, margin, y);
  y += 10;

  // Zone + Severity box
  const sevLabel = SEVERITY_LABELS[query.severity]?.[locale] || query.severity;
  const sevColors: Record<string, [number, number, number]> = {
    bajo:    [220, 252, 231],
    medio:   [254, 249, 195],
    alto:    [255, 237, 213],
    urgente: [254, 226, 226],
  };
  const sevTextColors: Record<string, [number, number, number]> = {
    bajo:    [21, 128, 61],
    medio:   [161, 98, 7],
    alto:    [154, 52, 18],
    urgente: [185, 28, 28],
  };
  const bgColor = sevColors[query.severity] || sevColors.bajo;
  const txtColor = sevTextColors[query.severity] || sevTextColors.bajo;

  doc.setFillColor(...bgColor);
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
  doc.setTextColor(...txtColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`${h('zone', locale)}: ${query.zone}`, margin + 4, y + 7);
  doc.text(`${h('severity', locale)}: ${sevLabel}`, margin + 4, y + 15);
  y += 28;

  // Description
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
    doc.setTextColor(148, 163, 184);
    doc.text('Informe detallado no disponible.', margin, y);
  } else {
    // Severity explanation
    if (report.severity_explanation) {
      checkPage(20);
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(h('explanation', locale), margin, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      y = wrapText(doc, report.severity_explanation, margin, y, contentWidth, lineH);
      y += 8;
    }

    // Possible contexts
    if (report.possible_contexts?.length) {
      checkPage(20);
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(h('contexts', locale), margin, y);
      y += 7;
      for (const ctx of report.possible_contexts) {
        checkPage(18);
        const freqLabel = FREQ_LABELS[ctx.frequency]?.[locale] || ctx.frequency;
        doc.setFillColor(248, 250, 252);
        const ctxLines = doc.splitTextToSize(ctx.description, contentWidth - 16);
        const boxH = 14 + ctxLines.length * lineH;
        doc.roundedRect(margin, y, contentWidth, boxH, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(`• ${ctx.context}`, margin + 3, y + 7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(8);
        doc.text(`(${freqLabel})`, margin + 3 + doc.getTextWidth(`• ${ctx.context}`) + 2, y + 7);
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(8.5);
        doc.text(ctxLines, margin + 3, y + 13);
        y += boxH + 3;
      }
      y += 4;
    }

    // Recommendation
    if (report.action_recommendation) {
      checkPage(28);
      doc.setFillColor(239, 246, 255);
      const recLines = doc.splitTextToSize(report.action_recommendation.explanation, contentWidth - 8);
      const recH = 28 + recLines.length * lineH;
      doc.roundedRect(margin, y, contentWidth, recH, 3, 3, 'F');
      doc.setTextColor(29, 78, 216);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(h('recommendation', locale), margin + 4, y + 8);
      const actionLabel = ACTION_LABELS[report.action_recommendation.primary]?.[locale] || report.action_recommendation.primary;
      doc.setFontSize(9);
      doc.text(actionLabel, margin + 4, y + 15);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(59, 130, 246);
      doc.text(recLines, margin + 4, y + 22);
      y += recH + 4;
      if (report.action_recommendation.timeframe) {
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(`⏱ ${h('timeframe', locale)}: ${report.action_recommendation.timeframe}`, margin, y);
        y += 8;
      }
      y += 4;
    }

    // Red flags
    if (report.red_flags?.length) {
      checkPage(20);
      doc.setFillColor(254, 242, 242);
      const flagLines = report.red_flags.flatMap(f => doc.splitTextToSize(`• ${f}`, contentWidth - 8));
      const flagH = 14 + flagLines.length * (lineH - 1);
      doc.roundedRect(margin, y, contentWidth, flagH, 3, 3, 'F');
      doc.setTextColor(185, 28, 28);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`⚠ ${h('red_flags', locale)}`, margin + 4, y + 8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      let fy = y + 14;
      for (const f of report.red_flags) {
        const fl = doc.splitTextToSize(`• ${f}`, contentWidth - 8);
        doc.text(fl, margin + 4, fy);
        fy += fl.length * (lineH - 1);
      }
      y += flagH + 8;
    }

    // General info
    if (report.general_info) {
      checkPage(20);
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(h('general_info', locale), margin, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      y = wrapText(doc, report.general_info, margin, y, contentWidth, lineH);
      y += 8;
    }
  }

  // ✅ FIX: usar doc.getNumberOfPages() directamente (API pública de jsPDF moderno)
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 282, pageWidth, 15, 'F');
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(h('footer', locale), margin, 289);
    doc.text(`${i} / ${totalPages}`, pageWidth - margin, 289, { align: 'right' });
  }

  const fileName = `sympto-informe-${query.zone}-${new Date(query.created_at).toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}