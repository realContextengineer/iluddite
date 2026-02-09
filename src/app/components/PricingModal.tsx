import React from 'react';
import { Check, X } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
}

export function PricingModal({ onClose }: PricingModalProps) {
  const tiers = [
    {
      name: 'Free',
      price: '£0',
      period: 'forever',
      features: [
        "Today's reading",
        'Date browser (all 365 days)',
        'Search by tag',
        'Optional breath indicator',
        'No ads, ever',
      ],
      cta: 'Current Tier',
      disabled: true,
    },
    {
      name: 'Supporter',
      price: '£3',
      period: 'per month',
      features: [
        'Everything in Free, plus:',
        'Printable PDF calendars',
        'Monthly deep-dive essays',
        'Early access to new content',
        'Support independent, calm tech',
      ],
      cta: 'Coming Soon',
      disabled: true,
      accent: true,
    },
    {
      name: 'Guided',
      price: '£15',
      period: 'per month',
      features: [
        'Everything in Supporter, plus:',
        'Audio readings (listen, don\'t scroll)',
        'Adaptive daily practices',
        'Crisis mode for doomscrolling',
        'Personal check-ins',
        'Private community access',
      ],
      cta: 'Coming 2026',
      disabled: true,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 relative border-b-2 border-[#D4793A] dark:border-[#E07A3A]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#999] dark:text-[#666] hover:text-[#2C2C2C] dark:hover:text-[#E8E6E1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-[#2C2C2C] dark:text-[#E8E6E1] text-[22px] font-semibold mb-1">Support Bitless</h2>
          <p className="text-[#888] dark:text-[#777] text-[14px] leading-relaxed max-w-xl">
            One reading a day. No ads, no tracking, no algorithm. Just a quiet nudge to look up.
          </p>
        </div>

        {/* Tiers */}
        <div className="p-6 grid md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                p-5 rounded-xl transition-all
                ${
                  tier.accent
                    ? 'bg-[#D4793A]/10 dark:bg-[#E07A3A]/10 ring-2 ring-[#D4793A] dark:ring-[#E07A3A]'
                    : 'bg-[#F5F2ED] dark:bg-[#222222]'
                }
              `}
            >
              <div className="space-y-4">
                <div>
                  <h3 className={`text-[15px] font-semibold mb-1 ${
                    tier.accent
                      ? 'text-[#D4793A] dark:text-[#E07A3A]'
                      : 'text-[#2C2C2C] dark:text-[#E8E6E1]'
                  }`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[26px] font-bold text-[#2C2C2C] dark:text-[#E8E6E1]">{tier.price}</span>
                    <span className="text-[#888] dark:text-[#777] text-[12px]">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex gap-2.5 text-[13px] leading-relaxed">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        tier.accent
                          ? 'text-[#D4793A] dark:text-[#E07A3A]'
                          : 'text-[#999] dark:text-[#666]'
                      }`} />
                      <span className="text-[#2C2C2C] dark:text-[#D4D0C8]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={tier.disabled}
                  className={`
                    w-full py-2.5 rounded-lg text-[13px] font-medium transition-all
                    ${
                      tier.accent
                        ? 'bg-[#D4793A] dark:bg-[#E07A3A] text-white hover:opacity-90'
                        : 'bg-[#E0DCD5] dark:bg-[#333333] text-[#2C2C2C] dark:text-[#E8E6E1]'
                    }
                    ${tier.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-[#F9F8F6] dark:bg-[#222222] border-t border-[#E0DCD5] dark:border-[#333333]">
          <p className="text-[#888] dark:text-[#666] text-[12px] leading-relaxed text-center">
            Your privacy is respected. No tracking, no ads, no data sold. Ever.
          </p>
        </div>
      </div>
    </div>
  );
}
