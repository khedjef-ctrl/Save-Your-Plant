import React, { useState, useEffect } from 'react';
import { generate } from '@pdfme/generator';
import { text, line, rectangle } from '@pdfme/schemas';
import { Template } from '@pdfme/common';
import { BOOK_METADATA, BOOK_CHAPTERS } from '../data/bookContent';
import { FileText, Download, Eye, Sparkles, Sliders, CheckCircle2, RefreshCw, BookOpen, Globe } from 'lucide-react';

interface PdfGeneratorProps {
  initialLanguage?: 'en' | 'ar';
  sampleOnly?: boolean;
  onClose?: () => void;
}

export const PdfGenerator: React.FC<PdfGeneratorProps> = ({
  initialLanguage = 'en',
  sampleOnly = false,
  onClose
}) => {
  const [lang, setLang] = useState<'en' | 'ar'>(initialLanguage);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [previewPage, setPreviewPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'preview' | 'designer'>('preview');
  
  // Customizer state
  const [accentColor, setAccentColor] = useState('#22b06a');
  const [headerFontSize, setHeaderFontSize] = useState(24);
  const [bodyFontSize, setBodyFontSize] = useState(11);
  const [includeWatermark, setIncludeWatermark] = useState(true);

  // Build PDFMe dynamic templates
  const buildPdfmeTemplate = (isSample: boolean): { template: Template; inputs: Record<string, string>[] } => {
    const chaptersToInclude = isSample ? BOOK_CHAPTERS.slice(0, 2) : BOOK_CHAPTERS;
    
    // Page 1: Cover Page
    // Subsequent pages: Chapters and Sections
    const schemas: any[] = [];
    const inputs: Record<string, string>[] = [];

    // Page 1: Cover Page Schema
    schemas.push([
      {
        name: 'coverBg',
        type: 'rectangle',
        position: { x: 10, y: 10 },
        width: 190,
        height: 277,
        color: '#08140e',
      },
      {
        name: 'coverBorder',
        type: 'rectangle',
        position: { x: 15, y: 15 },
        width: 180,
        height: 267,
        color: '#08140e',
        borderColor: accentColor,
        borderWidth: 1.5,
      },
      {
        name: 'bookBadge',
        type: 'text',
        position: { x: 25, y: 40 },
        width: 160,
        height: 12,
        alignment: 'center',
        fontSize: 10,
        fontColor: accentColor,
      },
      {
        name: 'bookTitle',
        type: 'text',
        position: { x: 25, y: 65 },
        width: 160,
        height: 45,
        alignment: 'center',
        fontSize: headerFontSize,
        fontColor: '#ffffff',
      },
      {
        name: 'bookSubtitle',
        type: 'text',
        position: { x: 25, y: 120 },
        width: 160,
        height: 35,
        alignment: 'center',
        fontSize: 12,
        fontColor: '#9db8ac',
      },
      {
        name: 'divider',
        type: 'line',
        position: { x: 60, y: 175 },
        width: 90,
        height: 1,
        color: accentColor,
      },
      {
        name: 'bookAuthor',
        type: 'text',
        position: { x: 25, y: 195 },
        width: 160,
        height: 15,
        alignment: 'center',
        fontSize: 11,
        fontColor: '#eafaf1',
      },
      {
        name: 'bookEdition',
        type: 'text',
        position: { x: 25, y: 245 },
        width: 160,
        height: 12,
        alignment: 'center',
        fontSize: 9,
        fontColor: '#9db8ac',
      }
    ]);

    inputs.push({
      coverBg: '',
      coverBorder: '',
      bookBadge: lang === 'en' ? '★ BOTANICAL EMERGENCY GUIDE' : '★ دليل الطوارئ البستاني المعتمد',
      bookTitle: lang === 'en' ? 'SAVE YOUR PLANT\n7-Day Recovery Guide' : 'أنقذ نبتتك\nدليل التعافي في 7 أيام',
      bookSubtitle: lang === 'en' 
        ? 'Diagnose, fix, and prevent the 20 most common houseplant problems in one week.'
        : 'تشخيص وعلاج والوقاية من أكثر 20 مشكلة شائعة في نباتات الزينة خلال أسبوع.',
      divider: '',
      bookAuthor: lang === 'en' ? BOOK_METADATA.authorEn : BOOK_METADATA.authorAr,
      bookEdition: `${BOOK_METADATA.edition} · ${BOOK_METADATA.isbn}`,
    });

    // Content Pages
    chaptersToInclude.forEach((chap) => {
      schemas.push([
        {
          name: 'pageHeader',
          type: 'text',
          position: { x: 20, y: 15 },
          width: 170,
          height: 10,
          fontSize: 8,
          fontColor: '#9db8ac',
        },
        {
          name: 'chapterTitle',
          type: 'text',
          position: { x: 20, y: 30 },
          width: 170,
          height: 18,
          fontSize: headerFontSize - 6,
          fontColor: '#123326',
        },
        {
          name: 'chapterSubtitle',
          type: 'text',
          position: { x: 20, y: 50 },
          width: 170,
          height: 16,
          fontSize: 10,
          fontColor: '#335544',
        },
        {
          name: 'sec1Title',
          type: 'text',
          position: { x: 20, y: 75 },
          width: 170,
          height: 12,
          fontSize: 12,
          fontColor: '#123326',
        },
        {
          name: 'sec1Body',
          type: 'text',
          position: { x: 20, y: 92 },
          width: 170,
          height: 48,
          fontSize: bodyFontSize,
          fontColor: '#2b3a32',
        },
        {
          name: 'sec1Box',
          type: 'rectangle',
          position: { x: 20, y: 145 },
          width: 170,
          height: 22,
          color: '#eef8f2',
          borderColor: accentColor,
          borderWidth: 1,
        },
        {
          name: 'sec1Action',
          type: 'text',
          position: { x: 25, y: 150 },
          width: 160,
          height: 14,
          fontSize: 9,
          fontColor: '#0c522f',
        },
        {
          name: 'sec2Title',
          type: 'text',
          position: { x: 20, y: 180 },
          width: 170,
          height: 12,
          fontSize: 12,
          fontColor: '#123326',
        },
        {
          name: 'sec2Body',
          type: 'text',
          position: { x: 20, y: 196 },
          width: 170,
          height: 45,
          fontSize: bodyFontSize,
          fontColor: '#2b3a32',
        },
        {
          name: 'pageFooter',
          type: 'text',
          position: { x: 20, y: 275 },
          width: 170,
          height: 10,
          alignment: 'center',
          fontSize: 8,
          fontColor: '#9db8ac',
        }
      ]);

      const sec1 = chap.sections[0] || {
        headingEn: 'Clinical Observation',
        headingAr: 'الملاحظة السريرية',
        contentEn: 'Check leaf turgor and examine root hydration.',
        contentAr: 'افحص تماسك الأوراق وتفقد رطوبة الجذور.',
        actionRuleEn: 'Inspect soil with a wooden probe.',
        actionRuleAr: 'افحص التربة باستخدام مسبار خشبي.'
      };

      const sec2 = chap.sections[1] || {
        headingEn: 'Recovery Protocol',
        headingAr: 'بروتوكول الشفاء',
        contentEn: 'Adjust exposure and isolate until symptoms abate.',
        contentAr: 'عدل الإضاءة واعزل النبتة حتى استقرار الأعراض.',
        actionRuleEn: 'Follow the 7-day checklist.',
        actionRuleAr: 'اتبع جدول المهام لأسبوع كامل.'
      };

      inputs.push({
        pageHeader: lang === 'en' ? 'SAVE YOUR PLANT — OFFICIAL HANDBOOK' : 'أنقذ نبتتك — الدليل البستاني الرسمي',
        chapterTitle: lang === 'en' ? chap.titleEn : chap.titleAr,
        chapterSubtitle: lang === 'en' ? chap.subtitleEn : chap.subtitleAr,
        sec1Title: lang === 'en' ? `01. ${sec1.headingEn}` : `01. ${sec1.headingAr}`,
        sec1Body: lang === 'en' ? sec1.contentEn : sec1.contentAr,
        sec1Box: '',
        sec1Action: lang === 'en' ? sec1.actionRuleEn : sec1.actionRuleAr,
        sec2Title: lang === 'en' ? `02. ${sec2.headingEn}` : `02. ${sec2.headingAr}`,
        sec2Body: lang === 'en' ? sec2.contentEn : sec2.contentAr,
        pageFooter: lang === 'en' ? `Chapter ${chap.id} · Page ${chap.id * 2} of 60` : `الفصل ${chap.id} · صفحة ${chap.id * 2} من 60`,
      });
    });

    const template: Template = {
      basePdf: {
        width: 210,
        height: 297,
        padding: [10, 10, 10, 10],
      },
      schemas,
    };

    return { template, inputs };
  };

  // Generate PDF client-side
  const handleGeneratePdf = async (downloadImmediate: boolean = false, isSample: boolean = false) => {
    setIsGenerating(true);
    try {
      const { template, inputs } = buildPdfmeTemplate(isSample);
      
      const plugins = {
        text,
        line,
        rectangle,
      };

      const pdf = await generate({
        template,
        inputs,
        plugins,
      });

      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setGeneratedPdfUrl(url);

      if (downloadImmediate) {
        const link = document.createElement('a');
        link.href = url;
        link.download = isSample 
          ? `SaveYourPlant_Sample_${lang.toUpperCase()}.pdf` 
          : `SaveYourPlant_Complete_Guide_${lang.toUpperCase()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate initial preview on mount
  useEffect(() => {
    handleGeneratePdf(false, sampleOnly);
    return () => {
      if (generatedPdfUrl) {
        URL.revokeObjectURL(generatedPdfUrl);
      }
    };
  }, [lang, accentColor, headerFontSize, bodyFontSize]);

  const currentChapter = BOOK_CHAPTERS[previewPage - 1] || BOOK_CHAPTERS[0];

  return (
    <div className="rounded-3xl bg-[#091510] border border-white/15 p-6 sm:p-8 space-y-6">
      
      {/* Top Bar with Language and Mode Switchers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3ddc84] to-[#1e8f5a] flex items-center justify-center text-[#04170d] font-bold shadow-md">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
              {lang === 'en' ? 'Open-Source PDFMe Engine' : 'محرك PDFMe مفتوح المصدر'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {lang === 'en' ? 'Save Your Plant Handbook Studio' : 'استوديو كتاب أنقذ نبتتك'}
            </h3>
          </div>
        </div>

        {/* Controls: Language & Tabs */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                lang === 'en' ? 'bg-[#3ddc84] text-[#04170d]' : 'text-[#9db8ac] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                lang === 'ar' ? 'bg-[#3ddc84] text-[#04170d]' : 'text-[#9db8ac] hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>

          {/* View Tab Switcher */}
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'preview' ? 'bg-white/15 text-white' : 'text-[#9db8ac] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Reader' : 'معاينة'}</span>
            </button>
            <button
              onClick={() => setActiveTab('designer')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'designer' ? 'bg-white/15 text-white' : 'text-[#9db8ac] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'WYSIWYG Designer' : 'المصمم'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Designer or Reader */}
      {activeTab === 'designer' ? (
        /* WYSIWYG Template Designer */
        <div className="space-y-6 p-6 rounded-2xl bg-[#06100b] border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#3ddc84] uppercase tracking-wider">
              {lang === 'en' ? 'PDFMe Template Settings' : 'إعدادات قالب PDFMe'}
            </span>
            <span className="text-[11px] text-[#9db8ac]">A4 Standard (210 × 297 mm)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-medium text-[#9db8ac] mb-2">
                {lang === 'en' ? 'Accent Brand Color' : 'لون الهوية الرئيسي'}
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                />
                <span className="text-xs font-mono text-white/80">{accentColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9db8ac] mb-2">
                {lang === 'en' ? 'Header Font Size (pt)' : 'حجم خط العناوين (نقطة)'}
              </label>
              <input 
                type="range" 
                min={18} 
                max={32} 
                value={headerFontSize} 
                onChange={(e) => setHeaderFontSize(Number(e.target.value))}
                className="w-full accent-[#3ddc84]"
              />
              <span className="text-xs text-white/70 block mt-1">{headerFontSize}pt</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9db8ac] mb-2">
                {lang === 'en' ? 'Body Text Size (pt)' : 'حجم الخط الأساسي (نقطة)'}
              </label>
              <input 
                type="range" 
                min={9} 
                max={14} 
                value={bodyFontSize} 
                onChange={(e) => setBodyFontSize(Number(e.target.value))}
                className="w-full accent-[#3ddc84]"
              />
              <span className="text-xs text-white/70 block mt-1">{bodyFontSize}pt</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[#9db8ac]">
              {lang === 'en' 
                ? 'Changes update the client-side vector renderer instantly.'
                : 'التعديلات تتحدث فوراً داخل محرك التوليد في المتصفح.'}
            </span>
            <button
              onClick={() => handleGeneratePdf(false, sampleOnly)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Re-render Preview' : 'إعادة التصيير'}</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* Reader / Visual Page Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Chapter Browser & Navigator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-semibold text-[#9db8ac] uppercase tracking-wider">
            {lang === 'en' ? 'Select Chapter to Preview' : 'اختر الفصل للمعاينة'}
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {BOOK_CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                onClick={() => setPreviewPage(chap.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  previewPage === chap.id
                    ? 'bg-[#122b1f] border-[#3ddc84] text-white shadow-sm'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-[#9db8ac] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-[#3ddc84]">CH 0{chap.id}</span>
                  <span>{chap.estimatedPages} {lang === 'en' ? 'pages' : 'صفحات'}</span>
                </div>
                <div className="text-xs font-bold leading-snug">
                  {lang === 'en' ? chap.titleEn : chap.titleAr}
                </div>
              </button>
            ))}
          </div>

          {/* Download CTAs */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <button
              onClick={() => handleGeneratePdf(true, false)}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] text-[#04170d] font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <span>{lang === 'en' ? 'Compiling PDF Vector Document...' : 'جاري تجميع ملف الـ PDF...'}</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    {lang === 'en' 
                      ? 'Download Complete 60-Page PDF Guide' 
                      : 'تحميل الدليل الكامل بصيغة PDF (60 صفحة)'}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={() => handleGeneratePdf(true, true)}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#3ddc84]" />
              <span>
                {lang === 'en' 
                  ? 'Download Free Sample (Chapters 1 & 2)' 
                  : 'تحميل عينة مجانية (الفصلان 1 و 2)'}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Live Document View */}
        <div className="lg:col-span-7 rounded-2xl bg-[#06100b] border border-white/15 p-6 shadow-inner space-y-5">
          <div className="flex items-center justify-between text-xs text-[#9db8ac] pb-3 border-b border-white/10">
            <span className="font-mono text-[#3ddc84]">
              {lang === 'en' ? `Previewing Chapter ${previewPage} of 7` : `معاينة الفصل ${previewPage} من 7`}
            </span>
            <span className="text-[11px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              PDFMe Live Vector Renderer
            </span>
          </div>

          {/* Rendered Book Page Mockup */}
          <div className="bg-[#fcfdfc] text-[#1a2e22] rounded-xl p-8 shadow-xl border border-neutral-300 min-h-[380px] flex flex-col justify-between font-serif">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-200 pb-2">
                <span>Save Your Plant · 2026 Edition</span>
                <span>Chapter 0{currentChapter.id}</span>
              </div>

              <div>
                <h4 
                  style={{ color: accentColor }} 
                  className="font-bold text-lg sm:text-xl font-sans tracking-tight"
                >
                  {lang === 'en' ? currentChapter.titleEn : currentChapter.titleAr}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 italic font-sans">
                  {lang === 'en' ? currentChapter.subtitleEn : currentChapter.subtitleAr}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-4 pt-2">
                {currentChapter.sections.map((sec, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="text-xs font-bold text-neutral-800 font-sans">
                      {i + 1}. {lang === 'en' ? sec.headingEn : sec.headingAr}
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                      {lang === 'en' ? sec.contentEn : sec.contentAr}
                    </p>
                    <div 
                      style={{ borderLeftColor: accentColor }}
                      className="text-[11px] font-semibold text-emerald-900 bg-emerald-50/70 p-2.5 rounded-r border-l-4 font-sans"
                    >
                      {lang === 'en' ? sec.actionRuleEn : sec.actionRuleAr}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-400 font-sans">
              <span>{BOOK_METADATA.isbn}</span>
              <span>Page {currentChapter.id * 2}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#9db8ac] pt-2">
            <span>Client-side zero-latency generation via @pdfme</span>
            {generatedPdfUrl && (
              <a
                href={generatedPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3ddc84] hover:underline flex items-center gap-1 font-medium"
              >
                <span>{lang === 'en' ? 'Open Raw PDF in New Tab' : 'فتح الـ PDF الأصلي في نافذة منفصلة'} →</span>
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
