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
    <div className="fixed inset-0 bg-[#1A2A1F] bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F4F7F3] dark:bg-[#161C18] rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#F4F7F3] dark:bg-[#161C18] border-b border-[#CED9CB] dark:border-[#2A3A30] px-6 py-4 flex justify-between items-center">
          <h2 className="text-[#1A2A1F] dark:text-[#E8EBE6]">Browse All Days</h2>
          <button
            onClick={onClose}
            className="text-[#6B8560] dark:text-[#A8B8A0] hover:text-[#1A2A1F] dark:hover:text-[#E8EBE6] transition-colors"
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
                <h3 className="text-[#6B8560] dark:text-[#A8B8A0] text-[13px] uppercase tracking-wider">
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
                            ? 'bg-[#7A9D6D] dark:bg-[#6B8E5F] text-white'
                            : 'bg-[#E9EDE8] dark:bg-[#202A24] text-[#1A2A1F] dark:text-[#E8EBE6] hover:bg-[#CED9CB] dark:hover:bg-[#2A3A2F]'
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
