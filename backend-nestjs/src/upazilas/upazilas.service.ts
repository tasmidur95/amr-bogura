import { Injectable } from '@nestjs/common';

@Injectable()
export class UpazilasService {
  private readonly upazilas = [
    { serial: '০১', name: 'বগুড়া সদর', name_en: 'Bogura Sadar', area: '১৭৬.৫৮ বর্গকিমি', unions: '১১টি ইউনিয়ন' },
    { serial: '০২', name: 'শিবগঞ্জ', name_en: 'Shibganj', area: '৩১৫.৩৩ বর্গকিমি', unions: '১২টি ইউনিয়ন' },
    { serial: '০৩', name: 'শেরপুর', name_en: 'Sherpur', area: '২৯৬.২৭ বর্গকিমি', unions: '১০টি ইউনিয়ন' },
    { serial: '০৪', name: 'সোনাতলা', name_en: 'Sonatala', area: '১৫৬.৭৫ বর্গকিমি', unions: '৭টি ইউনিয়ন' },
    { serial: '০৫', name: 'সারিয়াকান্দি', name_en: 'Sariakandi', area: '৪০৮.৫০ বর্গকিমি', unions: '১২টি ইউনিয়ন' },
    { serial: '০৬', name: 'গাবতলী', name_en: 'Gabtali', area: '২৩৯.৬০ বর্গকিমি', unions: '১১টি ইউনিয়ন' },
    { serial: '০৭', name: 'ধুনট', name_en: 'Dhunat', area: '২৪৭.৭৩ বর্গকিমি', unions: '১০টি ইউনিয়ন' },
    { serial: '০৮', name: 'নন্দীগ্রাম', name_en: 'Nandigram', area: '২৬৫.৪৭ বর্গকিমি', unions: '৫টি ইউনিয়ন' },
    { serial: '০৯', name: 'কাহালু', name_en: 'Kahaloo', area: '২৪০.৪২ বর্গকিমি', unions: '৯টি ইউনিয়ন' },
    { serial: '১০', name: 'দুপচাঁচিয়া', name_en: 'Dupchanchia', area: '১৬২.৪৫ বর্গকিমি', unions: '৬টি ইউনিয়ন' },
    { serial: '১১', name: 'আদমদীঘি', name_en: 'Adamdighi', area: '১৬৮.৮৩ বর্গকিমি', unions: '৬টি ইউনিয়ন' },
    { serial: '১২', name: 'শাজাহানপুর', name_en: 'Shajahanpur', area: '২২১.৬৯ বর্গকিমি', unions: '৯টি ইউনিয়ন' },
  ];

  findAll(query?: string) {
    if (!query) return this.upazilas;
    const q = query.toLowerCase();
    return this.upazilas.filter(u => u.name.toLowerCase().includes(q) || u.name_en.toLowerCase().includes(q));
  }
}

