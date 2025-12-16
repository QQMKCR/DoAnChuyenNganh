/*
Top KPI:

Tổng bệnh nhân

% nguy cơ cao

Tăng trưởng
*/
// features/dashboard/components/SummaryCards.tsx
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SummaryCard {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  bgColor: string;
}

interface Props {
  cards: SummaryCard[];
}

export const SummaryCards: React.FC<Props> = ({ cards }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm text-gray-600">{card.title}</span>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
          <div className="flex items-center space-x-1 text-sm">
            <span className={card.isPositive ? 'text-green-600' : 'text-red-600'}>
              {card.change}
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};