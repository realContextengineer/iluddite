import React from 'react';
import { X } from 'lucide-react';

interface DateBrowserProps {
  onClose: () => void;
  onSelectDate: (day: number) => void;
  currentDay: number;
}

export function DateBrowser({ onClose, onSelectDate, currentDay }: DateBrowserProps) {
  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 29 }, // Leap year
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  let dayCounter = 1;

  return (
    <div className="fixed inset-0 bg-[#2C2C2C] bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F3EF] dark:bg-[#1C1C1C] rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#F5F3EF] dark:bg-[#1C1C1C] border-b border-[#D4CFC4] dark:border-[#3A3A3A] px-6 py-4 flex justify-between items-center">
          <h2 className="text-[#2C2C2C] dark:text-[#E8E6E1]">Browse All Days</h2>
          <button
            onClick={onClose}
            className="text-[#8B7355] dark:text-[#B5A896] hover:text-[#2C2C2C] dark:hover:text-[#E8E6E1] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {months.map((month) => {
            const monthStart = dayCounter;
            const daysInMonth = Array.from({ length: month.days }, (_, i) => {
              const day = dayCounter++;
              return day;
            });

            return (
              <div key={month.name} className="space-y-3">
                <h3 className="text-[#8B7355] dark:text-[#B5A896] text-[13px] uppercase tracking-wider">
                  {month.name}
                </h3>
                <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
                  {daysInMonth.map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        onSelectDate(day);
                        onClose();
                      }}
                      className={`
                        py-3 px-2 rounded-sm text-[14px] transition-all
                        ${
                          day === currentDay
                            ? 'bg-[#8B9B7C] dark:bg-[#7A8A6B] text-white'
                            : 'bg-[#EBE9E3] dark:bg-[#2A2A2A] text-[#2C2C2C] dark:text-[#E8E6E1] hover:bg-[#D4CFC4] dark:hover:bg-[#353535]'
                        }
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}