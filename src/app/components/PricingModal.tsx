import React from 'react';
import { Check } from 'lucide-react';

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
      name: 'Guided (LUD)',
      price: '£15',
      period: 'per month',
      features: [
        'Everything in Supporter, plus:',
        '"Hey LUD" voice agent',
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
    <div className="fixed inset-0 bg-[#2C2C2C] bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#F5F3EF] dark:bg-[#1C1C1C] rounded-sm max-w-5xl w-full my-8">
        <div className="border-b border-[#D4CFC4] dark:border-[#3A3A3A] px-6 py-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[#2C2C2C] dark:text-[#E8E6E1] mb-2">Support Daily Luddite</h2>
              <p className="text-[#8B7355] dark:text-[#B5A896] text-[14px] leading-relaxed max-w-2xl">
                This is a quiet project. No venture capital, no growth hacking, no dark patterns. 
                Just daily invitations to return to your body. Your support keeps it that way.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[#8B7355] dark:text-[#B5A896] hover:text-[#2C2C2C] dark:hover:text-[#E8E6E1] text-[14px] ml-4"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                p-6 rounded-sm border-2 transition-all
                ${
                  tier.accent
                    ? 'border-[#8B9B7C] dark:border-[#7A8A6B] bg-[#F9F8F6] dark:bg-[#252525]'
                    : 'border-[#E5E1DA] dark:border-[#3A3A3A] bg-white dark:bg-[#202020]'
                }
              `}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#2C2C2C] dark:text-[#E8E6E1] mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] text-[#2C2C2C] dark:text-[#E8E6E1]">{tier.price}</span>
                    <span className="text-[#8B7355] dark:text-[#B5A896] text-[13px]">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex gap-3 text-[14px] leading-relaxed">
                      <Check className="w-4 h-4 text-[#8B9B7C] dark:text-[#7A8A6B] flex-shrink-0 mt-0.5" />
                      <span className="text-[#2C2C2C] dark:text-[#D4D0C8]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={tier.disabled}
                  className={`
                    w-full py-3 rounded-sm text-[14px] transition-all
                    ${
                      tier.accent
                        ? 'bg-[#8B9B7C] dark:bg-[#7A8A6B] text-white hover:bg-[#7A8A6B] dark:hover:bg-[#6A7A5B]'
                        : 'bg-[#EBE9E3] dark:bg-[#2A2A2A] text-[#2C2C2C] dark:text-[#E8E6E1] hover:bg-[#D4CFC4] dark:hover:bg-[#353535]'
                    }
                    ${tier.disabled ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#D4CFC4] dark:border-[#3A3A3A] px-6 py-4 bg-[#F9F8F6] dark:bg-[#252525]">
          <p className="text-[#8B7355] dark:text-[#B5A896] text-[13px] leading-relaxed text-center">
            All tiers respect your privacy. No tracking, no ads, no data sold. Ever. 
            Payments processed securely through Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}