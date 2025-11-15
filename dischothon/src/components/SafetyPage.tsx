import { useState } from 'react';
import { ArrowLeft, Phone, Hospital, Shield, MapPin, AlertCircle, Clock } from 'lucide-react';

interface EmergencyService {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: JSX.Element;
  color: string;
  available: string;
}

interface SafetyPageProps {
  onBack: () => void;
}

export function SafetyPage({ onBack }: SafetyPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services: EmergencyService[] = [
    {
      id: 'police',
      name: 'Police',
      number: '10111',
      description: 'Report crime and request immediate police assistance',
      icon: <Shield size={28} />,
      color: 'blue',
      available: '24/7'
    },
    {
      id: 'ambulance',
      name: 'Emergency Medical',
      number: '10177',
      description: 'Request ambulance and emergency medical services',
      icon: <Hospital size={28} />,
      color: 'red',
      available: '24/7'
    },
    {
      id: 'gbv',
      name: 'GBV Command Centre',
      number: '0800 428 428',
      description: 'Gender-based violence support and counseling',
      icon: <Phone size={28} />,
      color: 'purple',
      available: '24/7'
    },
    {
      id: 'childline',
      name: 'Childline',
      number: '116',
      description: 'Support and protection for children in danger',
      icon: <AlertCircle size={28} />,
      color: 'orange',
      available: '24/7'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
      blue: { 
        bg: 'bg-blue-50', 
        text: 'text-blue-600', 
        border: 'border-blue-200',
        hover: 'hover:border-blue-400'
      },
      red: { 
        bg: 'bg-red-50', 
        text: 'text-red-600', 
        border: 'border-red-200',
        hover: 'hover:border-red-400'
      },
      purple: { 
        bg: 'bg-purple-50', 
        text: 'text-purple-600', 
        border: 'border-purple-200',
        hover: 'hover:border-purple-400'
      },
      orange: { 
        bg: 'bg-orange-50', 
        text: 'text-orange-600', 
        border: 'border-orange-200',
        hover: 'hover:border-orange-400'
      }
    };
    return colors[color];
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-6 flex items-center gap-4 shadow-lg">
        <button onClick={onBack} className="text-white hover:text-red-100">
          <ArrowLeft size={24} />
        </button>
        <Shield size={22} className="text-white" />
        <h1 className="text-white text-xl">Emergency Help</h1>
      </div>

      {/* Quick Alert Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl mb-1">Quick Emergency</h2>
            <p className="text-sm opacity-90">Tap the button below for immediate help</p>
          </div>
          <button className="bg-white text-red-600 rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform">
            <Phone size={28} />
          </button>
        </div>
      </div>

      {/* Current Location */}
      <div className="px-6 pt-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-gray-800 text-sm mb-1">Current Location</p>
              <p className="text-gray-600 text-xs">Johannesburg, Gauteng</p>
              <p className="text-gray-500 text-xs mt-2">Location shared when you call emergency services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Services */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h3 className="text-gray-800 mb-3">Emergency Services</h3>
        <div className="space-y-3">
          {services.map((service) => {
            const colors = getColorClasses(service.color);
            return (
              <div
                key={service.id}
                className={`bg-white border rounded-2xl p-5 transition-all cursor-pointer ${colors.border} ${colors.hover} hover:shadow-md`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`${colors.bg} rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 ${colors.text}`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-gray-800">{service.name}</h3>
                        <p className={`text-xl ${colors.text} mt-1`}>{service.number}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{service.available}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <button 
                      className={`${colors.bg} ${colors.text} px-6 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity`}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${service.number}`;
                      }}
                    >
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Tips */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="text-gray-800 mb-3 flex items-center gap-2">
            <AlertCircle size={20} className="text-amber-600" />
            Safety Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>Call from a safe location if possible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>Stay on the line until help arrives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>Share your exact location with the operator</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600">•</span>
              <span>Use the Silent Alert mode if you can't speak</span>
            </li>
          </ul>
        </div>

        {/* Nearby Resources */}
        <div className="mt-6 mb-4">
          <h3 className="text-gray-800 mb-3">Nearby Resources</h3>
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-gray-800 text-sm">Johannesburg Central Police Station</p>
                  <p className="text-gray-500 text-xs mt-1">2.3 km away</p>
                </div>
                <button className="text-blue-600 text-xs hover:text-blue-700">
                  Directions →
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-gray-800 text-sm">Charlotte Maxeke Hospital</p>
                  <p className="text-gray-500 text-xs mt-1">3.7 km away</p>
                </div>
                <button className="text-blue-600 text-xs hover:text-blue-700">
                  Directions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
