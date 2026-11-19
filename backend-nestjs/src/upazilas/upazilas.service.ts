import { Injectable } from '@nestjs/common';

@Injectable()
export class UpazilasService {
  private readonly upazilas = [
    { serialBn: '০১', name: 'বগুড়া সদর', enName: 'Bogura Sadar', area: '১৭৬.৫৮ বর্গকিমি', unions: '১১টি ইউনিয়ন' },
    { serialBn: '০২', name: 'শিবগঞ্জ', enName: 'Shibganj', area: '৩১৫.৩৩ বর্গকিমি', unions: '১২টি ইউনিয়ন' },
    { serialBn: '০৩', name: 'শেরপুর', enName: 'Sherpur', area: '২৯৬.২৭ বর্গকিমি', unions: '১০টি ইউনিয়ন' },
    { serialBn: '০৪', name: 'সোনাতলা', enName: 'Sonatala', area: '১৫৬.৭৫ বর্গকিমি', unions: '৭টি ইউনিয়ন' },
    { serialBn: '০৫', name: 'সারিয়াকান্দি', enName: 'Sariakandi', area: '৪০৮.৫০ বর্গকিমি', unions: '১২টি ইউনিয়ন' },
    { serialBn: '০৬', name: 'গাবতলী', enName: 'Gabtali', area: '২৩৯.৬০ বর্গকিমি', unions: '১১টি ইউনিয়ন' },
    { serialBn: '০৭', name: 'ধুনট', enName: 'Dhunat', area: '২৪৭.৭৩ বর্গকিমি', unions: '১০টি ইউনিয়ন' },
    { serialBn: '০৮', name: 'নন্দীগ্রাম', enName: 'Nandigram', area: '২৬৫.৪৭ বর্গকিমি', unions: '৫টি ইউনিয়ন' },
    { serialBn: '০৯', name: 'কাহালু', enName: 'Kahaloo', area: '২৪০.৪২ বর্গকিমি', unions: '৯টি ইউনিয়ন' },
    { serialBn: '১০', name: 'দুপচাঁচিয়া', enName: 'Dupchanchia', area: '১৬২.৪৫ বর্গকিমি', unions: '৬টি ইউনিয়ন' },
    { serialBn: '১১', name: 'আদমদীঘি', enName: 'Adamdighi', area: '১৬৮.৮৩ বর্গকিমি', unions: '৬টি ইউনিয়ন' },
    { serialBn: '১২', name: 'শাজাহানপুর', enName: 'Shajahanpur', area: '২২১.৬৯ বর্গকিমি', unions: '৯টি ইউনিয়ন' },
  ];

  findAll(query?: string) {
    if (!query) return this.upazilas;
    const q = query.toLowerCase();
    return this.upazilas.filter(u => u.name.toLowerCase().includes(q) || u.enName.toLowerCase().includes(q));
  }
}
