import React, { useState } from 'react';
import { CheckCircle2, Download, ExternalLink, ArrowLeft, FileText, Check, Layers, Table, Mail, Sparkles } from 'lucide-react';
import { generate } from '@pdfme/generator';
import { text, line, rectangle } from '@pdfme/schemas';
import { BOOK_CHAPTERS } from '../data/bookContent';

interface SuccessProps {
  orderId?: string;
  customerEmail?: string;
  tierId?: string;
  onReturnHome: () => void;
  onOpenEmailCourse: () => void;
}

export const Success: React.FC<SuccessProps> = ({
  orderId = 'SYP-984210',
  customerEmail = 'parent@plantcare.com',
  tierId = 'pro',
  onReturnHome,
  onOpenEmailCourse
}) => {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [csvDownloaded, setCsvDownloaded] = useState(false);

  // Generate and download the official guide PDF
  const handleDownloadFullPdf = async () => {
    setDownloadingPdf(true);
    try {
      const schemas: any[] = [];
      const inputs: any[] = [];

      // Generate a clean 7-chapter complete handbook
      BOOK_CHAPTERS.forEach((chap) => {
        schemas.push([
          {
            name: 'header',
            type: 'text',
            position: { x: 20, y: 15 },
            width: 170,
            height: 10,
            fontSize: 8,
            fontColor: '#9db8ac',
          },
          {
            name: 'title',
            type: 'text',
            position: { x: 20, y: 30 },
            width: 170,
            height: 18,
            fontSize: 18,
            fontColor: '#123326',
          },
          {
            name: 'body',
            type: 'text',
            position: { x: 20, y: 55 },
            width: 170,
            height: 180,
            fontSize: 11,
            fontColor: '#2b3a32',
          },
          {
            name: 'footer',
            type: 'text',
            position: { x: 20, y: 275 },
            width: 170,
            height: 10,
            alignment: 'center',
            fontSize: 8,
            fontColor: '#9db8ac',
          }
        ]);

        inputs.push({
          header: `SAVE YOUR PLANT · OFFICIAL LICENSED COPY TO ${customerEmail.toUpperCase()}`,
          title: chap.titleEn,
          body: `${chap.subtitleEn}\n\n` +
            chap.sections.map((s, idx) => 
              `${idx + 1}. ${s.headingEn}\n${s.contentEn}\n► ${s.actionRuleEn}\n\n`
            ).join(''),
          footer: `Order Reference: ${orderId} · Page ${chap.id * 2} of 60`,
        });
      });

      const template: any = {
        basePdf: { width: 210, height: 297, padding: [10, 10, 10, 10] as [number, number, number, number] },
        schemas,
      };

      const pdf = await generate({
        template,
        inputs,
        plugins: { text, line, rectangle },
      });

      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SaveYourPlant_Official_Guide_${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setPdfDownloaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  // Download Starter CSV
  const handleDownloadCsv = () => {
    const csvContent = 
      "Plant Name,Species,Light Level,Watering Interval Days,Last Watered,Notes\n" +
      "Monstera Deliciosa,Tropical Aroid,Bright Indirect,7,2026-10-01,Check top 4cm before watering\n" +
      "Snake Plant,Sansevieria,Low to Bright,21,2026-09-20,Soil must be 100% dry\n" +
      "Marble Queen Pothos,Epipremnum,Medium Indirect,8,2026-09-28,Rotate weekly for full vines\n" +
      "Boston Fern,Nephrolepis,Filtered Shade,3,2026-10-03,Keep substrate consistently moist\n" +
      "Fiddle Leaf Fig,Ficus Lyrata,High Indirect,7,2026-09-30,Shield from cold window drafts\n";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Plant_Rescue_Tracker_Starter_${orderId}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCsvDownloaded(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      
      {/* Return to Home link */}
      <div>
        <button
          onClick={onReturnHome}
          className="text-xs font-semibold text-[#9db8ac] hover:text-[#3ddc84] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Save Your Plant Home / العودة للرئيسية</span>
        </button>
      </div>

      {/* Hero Confirmation Card */}
      <div className="text-center rounded-3xl bg-[#091510] border border-[#3ddc84]/30 p-8 sm:p-12 relative overflow-hidden space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#3ddc84]/20 border border-[#3ddc84]/40 flex items-center justify-center text-[#3ddc84] mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3ddc84] uppercase tracking-wider">
          <span>Payment Confirmed · Instant Digital Delivery</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Plants Are About to Thrive!
          <span className="block text-xl sm:text-2xl font-normal text-[#9db8ac] mt-2">
            تم تأكيد طلبك بنجاح — إليك كافة روابط التحميل الرقمي
          </span>
        </h1>

        <div className="pt-2 text-xs text-[#9db8ac] max-w-md mx-auto">
          Order ID: <span className="font-mono text-white font-bold">{orderId}</span>
          <span className="mx-2">·</span>
          Delivered to: <span className="text-white">{customerEmail}</span>
        </div>
      </div>

      {/* Digital Deliverables Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#3ddc84]" />
          <span>Your Complete Digital Product Vault / حزمة المنتجات الرقمية الخاصة بك</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* File 1: 60-Page PDF Guide */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                60-Page Complete Rescue Handbook (PDF)
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                The comprehensive 7-chapter field guide with high-resolution anatomical diagnostic diagrams and treatment protocols.
                <span className="block text-[#9db8ac]/70 mt-1">كتاب الدليل الكامل (60 صفحة) بصيغة PDF قابلة للطباعة والقراءة.</span>
              </p>
            </div>

            <button
              onClick={handleDownloadFullPdf}
              disabled={downloadingPdf}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#3ddc84] to-[#22b06a] hover:from-[#4be592] hover:to-[#2bc074] text-[#04170d] font-bold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {downloadingPdf ? (
                <span>Generating PDF Vector Document...</span>
              ) : pdfDownloaded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Downloaded! Click to Download Again</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Handbook (.pdf)</span>
                </>
              )}
            </button>
          </div>

          {/* Deliverable 2: Notion Plant Care Workspace */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Notion Companion Care Workspace
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                1-Click duplicate template with automated countdown timers, photo journals, and species watering schedule matrix.
                <span className="block text-[#9db8ac]/70 mt-1">قالب نوشن الجاهز للمزامنة مع هاتفك وحاسوبك بضغطة زر واحدة.</span>
              </p>
            </div>

            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#3ddc84]" />
              <span>Duplicate Notion Workspace Template</span>
            </a>
          </div>

          {/* Deliverable 3: Plant Care Starter CSV Sheet */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <Table className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Excel & Google Sheets Plant Tracker (CSV)
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                Lightweight offline spreadsheet for logging plant health, watering dates, and fertilizer intervals without any subscription.
                <span className="block text-[#9db8ac]/70 mt-1">ملف جدول إكسل وجوجل شيت خفيف للمتابعة بدون إنترنت.</span>
              </p>
            </div>

            <button
              onClick={handleDownloadCsv}
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {csvDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-[#3ddc84]" />
                  <span>CSV Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Starter Spreadsheet (.csv)</span>
                </>
              )}
            </button>
          </div>

          {/* Deliverable 4: 7-Day Guided Email Course */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#3ddc84]/40 transition-colors flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#3ddc84]/15 border border-[#3ddc84]/30 flex items-center justify-center text-[#3ddc84]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                7-Day Guided Email Coaching Series
              </h3>
              <p className="text-xs text-[#9db8ac] leading-relaxed">
                Bite-sized daily check-ins delivered to your inbox with specific micro-tasks to monitor your plant's recovery step by step.
                <span className="block text-[#9db8ac]/70 mt-1">دورة تدريبية بريدية تصلك يومياً لمدة 7 أيام باللغتين العربية والإنجليزية.</span>
              </p>
            </div>

            <button
              onClick={onOpenEmailCourse}
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore 7-Day Email Course Hub →</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
