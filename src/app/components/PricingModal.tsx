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
      <div className="bg-white dark:bg-[#141A16] rounded-2xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 relative border-b-2 border-[#6B8E5F] dark:border-[#7A9D6D]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8A9488] dark:text-[#5A6A5E] hover:text-[#1A2A1F] dark:hover:text-[#E8EBE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-[#1A2A1F] dark:text-[#E8EBE6] text-[22px] font-semibold mb-1">Support Bitless</h2>
          <p className="text-[#7A8A7E] dark:text-[#6A7A6E] text-[14px] leading-relaxed max-w-xl">
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
                    ? 'bg-[#6B8E5F]/10 dark:bg-[#7A9D6D]/10 ring-2 ring-[#6B8E5F] dark:ring-[#7A9D6D]'
                    : 'bg-[#F5F7F4] dark:bg-[#1A221D]'
                }
              `}
            >
              <div className="space-y-4">
                <div>
                  <h3 className={`text-[15px] font-semibold mb-1 ${
                    tier.accent
                      ? 'text-[#6B8E5F] dark:text-[#7A9D6D]'
                      : 'text-[#1A2A1F] dark:text-[#E8EBE6]'
                  }`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[26px] font-bold text-[#1A2A1F] dark:text-[#E8EBE6]">{tier.price}</span>
                    <span className="text-[#7A8A7E] dark:text-[#6A7A6E] text-[12px]">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex gap-2.5 text-[13px] leading-relaxed">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        tier.accent
                          ? 'text-[#6B8E5F] dark:text-[#7A9D6D]'
                          : 'text-[#8A9488] dark:text-[#5A6A5E]'
                      }`} />
                      <span className="text-[#1A2A1F] dark:text-[#D6DDD3]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={tier.disabled}
                  className={`
                    w-full py-2.5 rounded-lg text-[13px] font-medium transition-all
                    ${
                      tier.accent
                        ? 'bg-[#6B8E5F] dark:bg-[#7A9D6D] text-white hover:opacity-90'
                        : 'bg-[#D9E3D6] dark:bg-[#283328] text-[#1A2A1F] dark:text-[#E8EBE6]'
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
        <div className="px-8 py-4 bg-[#F7F9F6] dark:bg-[#1A221D] border-t border-[#D9E3D6] dark:border-[#283328]">
          <p className="text-[#7A8A7E] dark:text-[#5A6A5E] text-[12px] leading-relaxed text-center">
            Your privacy is respected. No tracking, no ads, no data sold. Ever.
          </p>
        </div>
      </div>
    </div>
  );
}
