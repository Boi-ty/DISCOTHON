import { Phone } from 'lucide-react';

export function SupportCard() {
  return (
    <div className="bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 border border-red-200 rounded-3xl p-6 shadow-md">
      <h3 className="text-gray-900 mb-5 flex items-center gap-2">
        <div className="bg-red-500 rounded-full p-2">
          <Phone size={18} className="text-white" />
        </div>
        <span>Emergency Support</span>
      </h3>
      <div className="space-y-3">
        <a 
          href="tel:66" 
          className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all shadow-sm border border-red-100"
        >
          <div>
            <p className="text-gray-900 text-sm">GBV Hotline</p>
            <p className="text-gray-500 text-xs mt-0.5">Gender-based violence support</p>
          </div>
          <span className="text-red-600 font-semibold">66+</span>
        </a>
        <a 
          href="tel:07" 
          className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all shadow-sm border border-red-100"
        >
          <div>
            <p className="text-gray-900 text-sm">Childline</p>
            <p className="text-gray-500 text-xs mt-0.5">24/7 support for children</p>
          </div>
          <span className="text-red-600 font-semibold">07+</span>
        </a>
      </div>
    </div>
  );
}
