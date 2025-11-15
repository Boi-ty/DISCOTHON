interface FeatureCardProps {
  title: string;
  icon: string;
  subtitle: string;
}

export function FeatureCard({ title, icon, subtitle }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 rounded-3xl p-5 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl hover:border-purple-300 hover:scale-105 transition-all duration-300 shadow-sm">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-gray-900 text-sm">{title}</h3>
      <p className="text-gray-500 text-xs mt-1.5 text-center">{subtitle}</p>
    </div>
  );
}
