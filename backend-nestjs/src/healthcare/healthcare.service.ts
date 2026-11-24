import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcareService {
  private readonly hospitals = [
    { name: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ হাসপাতাল (শজিমেক)', name_en: 'Shaheed Ziaur Rahman Medical College Hospital (SZRMC)', type: 'govt', phone: '051-69965' },
    { name: '২৫০ শয্যা বিশিষ্ট মোহাম্মদ আলী জেলা হাসপাতাল', name_en: '250-Bed Mohammad Ali District Hospital', type: 'govt', phone: '051-66550' },
    { name: 'টিএমএসএস মেডিকেল কলেজ ও রাফাতুল্লাহ কমিউনিটি হাসপাতাল', name_en: 'TMSS Medical College & Rafatullah Community Hospital', type: 'private', phone: '01713-377077' },
    { name: 'পপুলার ডায়াগনস্টিক সেন্টার লিমিটেড', name_en: 'Popular Diagnostic Centre Ltd.', type: 'diagnostic', phone: '09613-787812' }
  ];

  findAll(type?: string) {
    if (!type || type === 'all') return this.hospitals;
    return this.hospitals.filter(h => h.type === type);
  }
}

