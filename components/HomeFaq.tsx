import React from 'react';
import Link from 'next/link';

// Short, factual Q&A. Facts come from the portal's own district data.
// Rendered as <details> (works without JS, fully crawlable) and mirrored as FAQPage JSON-LD.
export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: 'বগুড়া জেলায় কয়টি উপজেলা ও ইউনিয়ন আছে?',
    a: 'বগুড়া জেলায় ১২টি উপজেলা, ১০৮টি ইউনিয়ন পরিষদ ও প্রায় ২,৬৯২টি গ্রাম রয়েছে। জেলার মোট আয়তন প্রায় ২,৮৯৮ বর্গ কিলোমিটার।',
  },
  {
    q: 'বগুড়ার জরুরি সেবার নম্বর কী?',
    a: 'যেকোনো জরুরি প্রয়োজনে জাতীয় জরুরি সেবা ৯৯৯ নম্বরে কল করুন। প্রতিটি উপজেলার ইউএনও, থানা ও স্বাস্থ্য কমপ্লেক্সের হটলাইন সংশ্লিষ্ট উপজেলার পাতায় দেওয়া আছে।',
  },
  {
    q: 'বগুড়ায় হাসপাতাল ও ডায়াগনস্টিক সেন্টারের তালিকা কোথায় পাব?',
    a: 'স্বাস্থ্যসেবা ডিরেক্টরিতে জেলার ৩৫২টির বেশি সরকারি-বেসরকারি হাসপাতাল, ইউনিয়ন স্বাস্থ্যকেন্দ্র, কমিউনিটি ক্লিনিক, ডায়াগনস্টিক সেন্টার, ব্লাড ব্যাংক ও অ্যাম্বুলেন্সের তথ্য ম্যাপসহ পাওয়া যায়।',
  },
  {
    q: 'বগুড়ার প্রধান দর্শনীয় স্থান কোনগুলো?',
    a: 'মহাস্থানগড় (প্রাচীন পুণ্ড্রনগর), ভাসু বিহার, গোকুল মেধ ও শেরপুরের খেরুয়া মসজিদ বগুড়ার প্রধান ঐতিহাসিক দর্শনীয় স্থান। সব স্থানের বিস্তারিত দর্শনীয় স্থান পাতায় রয়েছে।',
  },
  {
    q: 'বগুড়ার দই কি জিআই স্বীকৃত পণ্য?',
    a: 'হ্যাঁ, বগুড়ার দই ২০২৩ সালে ভৌগোলিক নির্দেশক (GI) পণ্য হিসেবে স্বীকৃতি পেয়েছে।',
  },
  {
    q: 'রক্তদাতা খুঁজতে বা নিজের তথ্য যুক্ত করতে কী করব?',
    a: 'কমিউনিটি সেকশনে রক্তের গ্রুপ ও উপজেলা অনুযায়ী রক্তদাতা খুঁজুন। নিজের তথ্য যুক্ত করতে অবদান পোর্টালে বিনামূল্যে নিবন্ধন করুন।',
  },
];

export default function HomeFaq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-8">
        <div className="flex items-end justify-between gap-3 mb-3 sm:mb-5">
          <div>
            <h2 id="faq-title" className="text-xl sm:text-2xl font-bold text-slate-900">
              বগুড়া সম্পর্কে সচরাচর জিজ্ঞাসা
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">জেলা, সেবা ও পোর্টাল নিয়ে দ্রুত উত্তর</p>
          </div>
          <Link href="/upazilas" className="hidden sm:inline text-xs font-bold text-emerald-800 hover:underline shrink-0">
            উপজেলা তথ্যভাণ্ডার →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {HOME_FAQS.map(f => (
            <details key={f.q} className="group py-2.5 sm:py-3">
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-sm sm:text-base font-semibold text-slate-900">
                <span>{f.q}</span>
                <i className="fa-solid fa-chevron-down text-xs text-slate-400 group-open:rotate-180 transition shrink-0"></i>
              </summary>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
