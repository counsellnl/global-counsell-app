import React, { useState } from 'react';
import { Home, PlusCircle, FileText, ChevronRight, Calculator, CheckCircle, ArrowLeft, Download, ShieldCheck, Building2, TrendingUp, Globe, Briefcase } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: '',
    company: '',
    country: 'Türkiye',
    sector: 'Enerji ve Üretim',
    capex: 0,
    annualSavings: 0,
    loanAmount: 0,
    interestRate: 6,
    loanTerm: 5,
    techCategory: 'Yenilenebilir Enerji ve Depolama',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: isNaN(value) ? value : parseFloat(value) || value });
  };

  const calculateFinancials = () => {
    const { capex, annualSavings, loanAmount, interestRate, loanTerm } = projectData;
    const rate = interestRate / 100;
    
    let annualDebtService = 0;
    if (loanAmount > 0 && rate > 0 && loanTerm > 0) {
      annualDebtService = (loanAmount * rate) / (1 - Math.pow(1 + rate, -loanTerm));
    } else if (loanAmount > 0 && loanTerm > 0) {
      annualDebtService = loanAmount / loanTerm;
    }

    const dscr = annualDebtService > 0 ? (annualSavings / annualDebtService).toFixed(2) : 'N/A';
    const payback = annualSavings > 0 ? (capex / annualSavings).toFixed(1) : 0;

    const discountRate = 0.10;
    let npv = -capex;
    for (let i = 1; i <= 10; i++) {
      npv += annualSavings / Math.pow(1 + discountRate, i);
    }

    return { annualDebtService, dscr, payback, npv: npv.toFixed(0) };
  };

  const financials = calculateFinancials();

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans pb-24 text-[#0A192F]">
      {/* Kurumsal Üst Başlık */}
      <header className="fixed top-0 w-full bg-[#0A192F] text-white px-5 py-4 z-50 flex items-center justify-between shadow-lg border-b border-[#D4AF37]/30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#112A22] flex items-center justify-center border border-[#D4AF37]">
            <span className="text-xs font-bold text-[#D4AF37]">GC</span>
          </div>
          <div>
            <h1 className="text-[#D4AF37] font-bold text-base tracking-wider">GLOBAL COUNSELL</h1>
            <p className="text-[10px] text-gray-300 tracking-widest uppercase">Green Advisory & Investment</p>
          </div>
        </div>
        <span className="text-xs bg-[#112A22] text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/40 font-medium">
          {projectData.country}
        </span>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="pt-24 px-4 max-w-xl mx-auto">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Karşılama Kartı */}
            <div className="bg-[#112A22] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-[#D4AF37]/20">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37] opacity-10 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Türkiye & Benelüks Platformu</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Yeşil Yatırımını Doğru Yapıyla Hayata Geçir</h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Şirket verileriniz, finansal modelleriniz, vergi teşvikleri ve hukuki yapılanma seçenekleriniz tek bir profesyonel dosyada birleşir.
              </p>
              <button 
                onClick={() => { setActiveTab('new'); setStep(1); }}
                className="w-full bg-[#D4AF37] text-[#0A192F] font-bold py-3.5 px-4 rounded-xl flex items-center justify-center shadow-lg hover:bg-[#c29d30] transition-all"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Yeni Yatırım Projesi Başlat
              </button>
            </div>

            {/* Hızlı İstatistikler */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/60">
                <div className="flex items-center space-x-2 text-[#112A22] mb-1">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-gray-500 uppercase">Aktif Sektörler</span>
                </div>
                <p className="text-lg font-bold text-[#0A192F]">Enerji & Üretim</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/60">
                <div className="flex items-center space-x-2 text-[#112A22] mb-1">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-gray-500 uppercase">Model Motoru</span>
                </div>
                <p className="text-lg font-bold text-[#112A22]">Aktif & Deterministik</p>
              </div>
            </div>

            {/* Mevcut Proje Kartı */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Kayıtlı Projeler</h3>
              <div 
                onClick={() => { setActiveTab('new'); setStep(2); }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/80 flex items-center justify-between cursor-pointer hover:border-[#D4AF37] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A192F]/5 flex items-center justify-center text-[#0A192F]">
                    <Briefcase className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A192F]">{projectData.name || 'Örnek: Fabrika Çatı GES Projesi'}</h4>
                    <p className="text-xs text-gray-500">{projectData.sector} • {projectData.country}</p>
                  </div>
                </div>
                <ChevronRight className="text-[#D4AF37] w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'new' && (
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200/80">
            {/* Adım Başlığı */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-3">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="p-1 rounded-lg bg-gray-100 text-[#0A192F]">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Adım {step} / 3</span>
                  <h2 className="text-base font-bold text-[#0A192F]">
                    {step === 1 ? 'Şirket ve Proje Profili' : step === 2 ? 'Finansal Model & Analiz' : 'Uzman Değerlendirme Raporu'}
                  </h2>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Şirket / Proje Adı</label>
                  <input type="text" name="name" value={projectData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none" placeholder="Örn: Global Tekstil Üretim A.Ş." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Yatırım Ülkesi</label>
                    <select name="country" value={projectData.country} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none">
                      <option value="Türkiye">Türkiye</option>
                      <option value="Hollanda">Hollanda</option>
                      <option value="Belçika">Belçika</option>
                      <option value="Almanya">Almanya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Teknoloji Türü</label>
                    <select name="techCategory" value={projectData.techCategory} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none">
                      <option value="Yenilenebilir Enerji ve Depolama">Yenilenebilir Enerji & Depolama</option>
                      <option value="Enerji Verimliliği">Enerji Verimliliği</option>
                      <option value="Su Verimliliği">Su Verimliliği ve Geri Kazanım</option>
                      <option value="Döngüsel Üretim">Döngüsel Üretim ve Atık</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Yatırım Tutarı (CAPEX - $)</label>
                  <input type="number" name="capex" value={projectData.capex || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none" placeholder="500000" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Yıllık Tasarruf / İlave Gelir ($)</label>
                  <input type="number" name="annualSavings" value={projectData.annualSavings || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none" placeholder="120000" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Kredi ($)</label>
                    <input type="number" name="loanAmount" value={projectData.loanAmount || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none" placeholder="300000" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Faiz (%)</label>
                    <input type="number" name="interestRate" value={projectData.interestRate} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Vade (Yıl)</label>
                    <input type="number" name="loanTerm" value={projectData.loanTerm} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-sm outline-none" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full mt-4 bg-[#0A192F] text-white font-bold py-3.5 rounded-xl flex items-center justify-center shadow-md">
                  Finansal Hesaplamayı Çalıştır <ChevronRight className="w-5 h-5 ml-2 text-[#D4AF37]" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Geri Ödeme Süresi</p>
                    <p className="text-xl font-bold text-[#0A192F]">{financials.payback} Yıl</p>
                  </div>
                  <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">DSCR (Borç Karşılama)</p>
                    <p className={`text-xl font-bold ${financials.dscr >= 1.2 ? 'text-[#112A22]' : 'text-amber-600'}`}>{financials.dscr}</p>
                  </div>
                  <div className="col-span-2 bg-[#0A192F] p-4 rounded-xl text-white shadow-inner">
                    <p className="text-[10px] text-[#D4AF37] font-bold uppercase mb-1">Net Bugünkü Değer (NPV - 10% İskonto)</p>
                    <p className="text-2xl font-bold">${Number(financials.npv).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2">
                  <h4 className="font-bold text-xs uppercase text-[#0A192F] flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-[#D4AF37]"/> Uzman Değerlendirme Başlıkları
                  </h4>
                  <ul className="text-xs space-y-1.5 text-gray-600">
                    <li>• SPV ve Ortak Girişim (JV) Yapılandırma Analizi</li>
                    <li>• Yeşil Kredi ve Hibe Kanalları Eşleştirmesi ({projectData.country})</li>
                    <li>• Sınırda Karbon Düzenleme Mekanizması (SKDM) Uyumu</li>
                  </ul>
                </div>

                <button onClick={() => setStep(3)} className="w-full bg-[#112A22] text-white font-bold py-3.5 rounded-xl flex items-center justify-center shadow-md">
                  Karar Dosyasını Görüntüle <ChevronRight className="w-5 h-5 ml-2 text-[#D4AF37]" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-[#112A22] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-lg border border-[#D4AF37]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Karar Dosyası Hazır</h3>
                  <p className="text-xs text-gray-500">Global Counsell standartlarında veri seti oluşturuldu.</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-left text-xs space-y-1 border border-gray-200">
                  <p><strong>Proje:</strong> {projectData.name || 'Belirtilmedi'}</p>
                  <p><strong>Lokasyon:</strong> {projectData.country}</p>
                  <p><strong>Yatırım:</strong> ${Number(projectData.capex).toLocaleString()}</p>
                  <p><strong>Finansal Durum:</strong> Doğrulandı (Deterministik Motor)</p>
                </div>
                <button 
                  onClick={() => window.print()} 
                  className="w-full bg-[#0A192F] text-white font-bold py-3 rounded-xl flex items-center justify-center shadow-md"
                >
                  <Download className="w-4 h-4 mr-2 text-[#D4AF37]" /> PDF Rapor İndir / Yazdır
                </button>
                <button onClick={() => { setStep(1); setActiveTab('home'); }} className="w-full text-gray-600 font-semibold py-2.5 text-xs">
                  Ana Ekrana Dön
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sabit Alt Gezinme Çubuğu */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 z-50 shadow-lg">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-[#0A192F]' : 'text-gray-400'}`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Ana Sayfa</span>
        </button>
        <button 
          onClick={() => { setActiveTab('new'); setStep(1); }} 
          className="flex flex-col items-center -mt-6"
        >
          <div className="bg-[#112A22] p-3.5 rounded-full shadow-xl border-4 border-[#F5F5F5] text-[#D4AF37]">
            <PlusCircle className="w-6 h-6" />
          </div>
        </button>
        <button 
          onClick={() => { setActiveTab('new'); setStep(3); }} 
          className={`flex flex-col items-center ${activeTab === 'new' && step === 3 ? 'text-[#0A192F]' : 'text-gray-400'}`}
        >
          <FileText className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">Raporlar</span>
        </button>
      </nav>
    </div>
  );
}
