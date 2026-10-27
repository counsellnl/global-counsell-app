import React, { useState } from 'react';
import { Home, PlusCircle, FileText, ChevronRight, Calculator, CheckCircle, ArrowLeft, Download } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: '',
    capex: 0,
    annualSavings: 0,
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: parseFloat(value) || value });
  };

  const calculateFinancials = () => {
    const { capex, annualSavings, loanAmount, interestRate, loanTerm } = projectData;
    const rate = interestRate / 100;
    
    // Basit Kredi Taksiti Hesaplama (PMT)
    let annualDebtService = 0;
    if (loanAmount > 0 && rate > 0 && loanTerm > 0) {
      annualDebtService = (loanAmount * rate) / (1 - Math.pow(1 + rate, -loanTerm));
    } else if (loanAmount > 0 && loanTerm > 0) {
      annualDebtService = loanAmount / loanTerm;
    }

    // Basit DSCR (Borç Servisi Karşılama Oranı)
    const dscr = annualDebtService > 0 ? (annualSavings / annualDebtService).toFixed(2) : 'N/A';

    // Basit Geri Ödeme Süresi
    const payback = annualSavings > 0 ? (capex / annualSavings).toFixed(1) : 0;

    // Basit NPV (Net Bugünkü Değer) - %10 iskonto oranı varsayımı
    const discountRate = 0.10;
    let npv = -capex;
    for (let i = 1; i <= 10; i++) {
      npv += annualSavings / Math.pow(1 + discountRate, i);
    }

    return { annualDebtService, dscr, payback, npv: npv.toFixed(0) };
  };

  const financials = calculateFinancials();

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans pb-20">
      {/* Sabit Üst Başlık (Header) */}
      <header className="fixed top-0 w-full bg-[#0A192F] text-white p-4 z-50 flex items-center justify-between shadow-md">
        <h1 className="text-[#D4AF37] font-bold text-xl tracking-wide">Global Counsell</h1>
        <div className="w-8 h-8 rounded-full bg-[#112A22] flex items-center justify-center border border-[#D4AF37]">
          <span className="text-xs font-bold text-[#D4AF37]">GC</span>
        </div>
      </header>

      {/* İçerik Alanı */}
      <main className="pt-20 px-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-[#112A22] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-10 rounded-bl-full"></div>
              <h2 className="text-sm text-[#D4AF37] font-semibold mb-1 uppercase tracking-wider">Hoş Geldiniz</h2>
              <h3 className="text-2xl font-bold mb-4">Yeşil Dönüşüm Başlıyor</h3>
              <p className="text-sm text-gray-300 opacity-90">
                Projelerinizin finansal, hukuki ve vergisel altyapısını kurumsal standartlarda hazırlayın.
              </p>
              <button 
                onClick={() => setActiveTab('new')}
                className="mt-6 bg-[#D4AF37] text-[#0A192F] font-bold py-2 px-4 rounded-lg flex items-center shadow-md w-full justify-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Yeni Proje Başlat
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A192F] mb-3">Son Projeler</h3>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#0A192F]">Güneş Enerjisi (GES)</h4>
                  <p className="text-xs text-gray-500">Durum: Taslak • Türkiye</p>
                </div>
                <ChevronRight className="text-[#D4AF37] w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'new' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[70vh]">
            {/* Sihirbaz İlerleme Çubuğu */}
            <div className="flex items-center mb-6 border-b pb-4">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="mr-3">
                  <ArrowLeft className="w-5 h-5 text-[#0A192F]" />
                </button>
              )}
              <h2 className="text-lg font-bold text-[#0A192F]">
                Adım {step}: {step === 1 ? 'Proje Verileri' : step === 2 ? 'Finansal Analiz' : 'Rapor'}
              </h2>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Proje Adı</label>
                  <input type="text" name="name" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-[#D4AF37] outline-none" placeholder="Örn: Fabrika Çatı GES" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Yatırım Tutarı (CAPEX - $)</label>
                  <input type="number" name="capex" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Yıllık Tasarruf ($)</label>
                  <input type="number" name="annualSavings" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kredi Tutarı ($)</label>
                  <input type="number" name="loanAmount" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none" placeholder="0" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Faiz (%)</label>
                    <input type="number" name="interestRate" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vade (Yıl)</label>
                    <input type="number" name="loanTerm" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 outline-none" placeholder="5" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full mt-4 bg-[#0A192F] text-white font-bold py-3 rounded-lg flex items-center justify-center">
                  Analiz Et <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold mb-1">Amortisman Süresi</p>
                    <p className="text-xl font-bold text-[#0A192F]">{financials.payback} Yıl</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold mb-1">DSCR Oranı</p>
                    <p className={`text-xl font-bold ${financials.dscr >= 1.2 ? 'text-[#112A22]' : 'text-red-600'}`}>{financials.dscr}</p>
                  </div>
                  <div className="col-span-2 bg-[#0A192F] p-4 rounded-xl text-white">
                    <p className="text-xs text-[#D4AF37] font-semibold mb-1">Net Bugünkü Değer (NPV)</p>
                    <p className="text-2xl font-bold">${Number(financials.npv).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-[#0A192F] mb-3 flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-[#D4AF37]"/> Hukuki Kontrol Listesi</h4>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li className="flex items-start">• SPV (Özel Amaçlı Şirket) Kurulum İhtiyacı</li>
                    <li className="flex items-start">• EPC Sözleşmesi Teminat Yapısı</li>
                    <li className="flex items-start">• Vergi Teşvikleri (Bölgesel/Sektörel) Uygunluğu</li>
                  </ul>
                </div>

                <button onClick={() => setStep(3)} className="w-full bg-[#112A22] text-white font-bold py-3 rounded-lg flex items-center justify-center">
                  Raporu Görüntüle <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#D4AF37] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F] mb-2">Rapor Hazır</h3>
                <p className="text-sm text-gray-500 mb-6">Finansal model ve hukuki tavsiyeler sisteme kaydedildi.</p>
                <button 
                  onClick={() => window.print()} 
                  className="w-full mb-3 bg-[#0A192F] text-white font-bold py-3 rounded-lg flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" /> PDF Olarak İndir
                </button>
                <button onClick={() => { setStep(1); setActiveTab('home'); }} className="w-full text-[#0A192F] font-bold py-3 rounded-lg border border-[#0A192F]">
                  Ana Ekrana Dön
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Sabit Alt Gezinme Çubuğu (Bottom Navigation) */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 z-50 pb-safe">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-[#0A192F]' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-semibold">Ana Sayfa</span>
        </button>
        <button 
          onClick={() => { setActiveTab('new'); setStep(1); }} 
          className="flex flex-col items-center -mt-6"
        >
          <div className="bg-[#112A22] p-3 rounded-full shadow-lg border-4 border-[#F5F5F5]">
            <PlusCircle className="w-7 h-7 text-[#D4AF37]" />
          </div>
        </button>
        <button 
          className="flex flex-col items-center p-2 text-gray-400"
        >
          <FileText className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-semibold">Raporlar</span>
        </button>
      </nav>
    </div>
  );
}
