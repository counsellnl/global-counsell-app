'use client'
import React, { useState } from 'react';
import { Calculator, Landmark, ShieldCheck, Download, LayoutDashboard, Briefcase, Settings, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Telefonda menüden bir öğe seçildiğinde menüyü otomatik kapatır
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gc-offwhite font-sans text-gc-navy overflow-hidden">
      
      {/* Mobil Menü Arka Plan Karartması */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sol Menü (Sidebar) - Mobilde Gizlenebilir, Masaüstünde Sabit */}
      <aside className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 w-64 bg-gc-navy text-gc-offwhite flex flex-col h-full shadow-xl md:shadow-none`}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-gc-gold">Global Counsell</h1>
            <p className="text-xs text-gray-400 mt-1">Green Investment</p>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => handleTabChange('overview')} className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'overview' ? 'bg-gc-green text-white' : 'hover:bg-gray-800'}`}>
            <LayoutDashboard size={18} className="mr-3" /> Genel Bakış
          </button>
          <button onClick={() => handleTabChange('company')} className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'company' ? 'bg-gc-green text-white' : 'hover:bg-gray-800'}`}>
            <Briefcase size={18} className="mr-3" /> Şirket ve Proje
          </button>
          <button onClick={() => handleTabChange('analysis')} className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'analysis' ? 'bg-gc-green text-white' : 'hover:bg-gray-800'}`}>
            <Calculator size={18} className="mr-3" /> Finansal Hesaplama
          </button>
          <button onClick={() => handleTabChange('tax-legal')} className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'tax-legal' ? 'bg-gc-green text-white' : 'hover:bg-gray-800'}`}>
            <ShieldCheck size={18} className="mr-3" /> Vergi ve Hukuk
          </button>
          <button onClick={() => handleTabChange('finance')} className={`w-full flex items-center p-3 rounded-md transition-colors ${activeTab === 'finance' ? 'bg-gc-green text-white' : 'hover:bg-gray-800'}`}>
            <Landmark size={18} className="mr-3" /> Finansman Seçenekleri
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
          v1.0.0 - Üretim Sürümü
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 flex flex-col overflow-hidden w-full relative">
        
        {/* Üst Bilgi Çubuğu (Header) */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center">
            <button className="md:hidden mr-4 text-gc-navy p-1 rounded-md hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-base md:text-lg font-semibold text-gc-navy truncate">Sistem Analizi</h2>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="hidden sm:inline-block text-xs md:text-sm font-medium bg-gray-100 py-1 px-2 md:px-3 rounded-full border border-gray-200">Rol: Danışman</span>
            <button className="flex items-center text-xs md:text-sm font-medium text-gc-green hover:text-gc-navy transition-colors bg-green-50 md:bg-transparent px-2 md:px-0 py-1 md:py-0 rounded-md">
              <Download size={16} className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">Rapor İndir</span>
              <span className="sm:hidden">İndir</span>
            </button>
          </div>
        </header>
        
        {/* İçerik Gövdesi */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto pb-8">
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg md:text-xl font-bold mb-2">Yeşil yatırımınızı doğru yapıyla hayata geçirin.</h3>
                  <p className="text-sm md:text-base text-gray-600">Proje durumu, tahmini NPV/IRR, finansman uygunluğu ve yapılandırma gereksinimlerini buradan yönetebilirsiniz.</p>
                </div>
                
                {/* Mobilde alt alta, bilgisayarda yan yana dizilen grid yapısı */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-gc-green">
                    <h4 className="text-xs md:text-sm text-gray-500 font-medium">Hesaplanan NPV</h4>
                    <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">€ 1,240,500</p>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-gc-navy">
                    <h4 className="text-xs md:text-sm text-gray-500 font-medium">Proje IRR</h4>
                    <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">% 14.5</p>
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 border-t-4 border-t-gc-gold">
                    <h4 className="text-xs md:text-sm text-gray-500 font-medium">Ortalama DSCR</h4>
                    <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">1.45x</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tax-legal' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h3 className="text-base md:text-lg font-bold text-gc-navy flex items-center">
                    <ShieldCheck className="mr-2 text-gc-green" size={20} /> Vergi İncelemesi ve Şirketleşme Modeli
                  </h3>
                </div>
                <div className="p-4 md:p-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 md:mb-4 border-b pb-2 text-sm md:text-base">Vergi Kontrol Listesi (VUK & Kurumlar Vergisi)</h4>
                      <ul className="space-y-4 text-xs md:text-sm">
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <span className="font-medium block">Katma Değer Vergisi (KDV) İadesi</span>
                            <span className="text-gray-500">Yatırım teşvik belgesi kapsamındaki iade süreçleri ve nakit akışına etkisi.</span>
                          </div>
                          <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-xs font-semibold self-start sm:self-auto whitespace-nowrap">İncelendi</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <span className="font-medium block">Enflasyon Düzeltmesi (VUK)</span>
                            <span className="text-gray-500">Öz kaynak ile finansman durumunda enflasyon muhasebesi kaynaklı kurumlar vergisi matrah etkileri.</span>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded text-xs font-semibold self-start sm:self-auto whitespace-nowrap">Onay Bekliyor</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <span className="font-medium block">Transfer Fiyatlandırması & FAR Analizi</span>
                            <span className="text-gray-500">Grup içi finansman sağlandığında emsallere uygunluk ilkesi (Arm's Length) ve örtülü sermaye testi.</span>
                          </div>
                          <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-xs font-semibold self-start sm:self-auto whitespace-nowrap">İncelendi</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 md:mb-4 border-b pb-2 text-sm md:text-base">Hukuki Yapılandırma Seçenekleri</h4>
                      <div className="space-y-3">
                        <div className="p-3 border border-gc-green bg-green-50 rounded">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm md:text-base">Proje Şirketi (SPV) Modeli</span>
                            <span className="text-[10px] md:text-xs bg-gc-green text-white px-2 py-1 rounded uppercase tracking-wider">Önerilen</span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600">Risk izolasyonu ve proje bazlı proje finansmanı kredibilitesi için uygun. Sorumluluk sınırlandırılır, ancak konsolide raporlama gerektirir.</p>
                        </div>
                        <div className="p-3 border border-gray-200 rounded text-gray-500 bg-gray-50">
                          <span className="font-medium block text-sm md:text-base">Mevcut Şirket İçi Yatırım</span>
                          <p className="text-xs md:text-sm mt-1">Sınır ötesi (Örn. Hollanda-Türkiye) yapılarda kurumlar vergisi stopaj maliyetleri dezavantaj yaratabilir.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'company' || activeTab === 'analysis' || activeTab === 'finance') && (
              <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 text-center mt-4">
                <Settings className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-300 mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-medium text-gray-900">Bu Modül Çalışır Durumda</h3>
                <p className="mt-2 text-xs md:text-sm text-gray-500">Veri bağlantıları ve form alanları sunucu entegrasyonuna hazırdır.</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
