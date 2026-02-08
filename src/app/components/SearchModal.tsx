import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSearch: (tags: string[]) => void;
}

const availableTags = [
  'breath',
  'rest',
  'morning',
  'embodiment',
  'presence',
  'nervous-system',
  'silence',
  'letting-go',
  'meals',
  'solstice',
  'nature',
  'cycles',
  'light',
  'darkness',
  'winter',
  'milestone',
  'awareness',
  'gratitude',
  'new-year',
];

export function SearchModal({ onClose, onSearch }: SearchModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearch = () => {
    onSearch(selectedTags);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#2C2C2C] bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F3EF] dark:bg-[#1C1C1C] rounded-sm max-w-2xl w-full">
        <div className="border-b border-[#D4CFC4] dark:border-[#3A3A3A] px-6 py-4 flex justify-between items-center">
          <h2 className="text-[#2C2C2C] dark:text-[#E8E6E1]">Search by Tag</h2>
          <button
            onClick={onClose}
            className="text-[#8B7355] dark:text-[#B5A896] hover:text-[#2C2C2C] dark:hover:text-[#E8E6E1] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355] dark:text-[#B5A896]" />
            <input
              type="text"
              placeholder="Filter tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#EBE9E3] dark:bg-[#2A2A2A] border border-[#D4CFC4] dark:border-[#3A3A3A] rounded-sm text-[#2C2C2C] dark:text-[#E8E6E1] placeholder:text-[#8B7355] dark:placeholder:text-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#8B9B7C] dark:focus:ring-[#7A8A6B]"
            />
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="space-y-2">
              <p className="text-[#8B7355] dark:text-[#B5A896] text-[13px] uppercase tracking-wide">
                Selected
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1 bg-[#8B9B7C] dark:bg-[#7A8A6B] text-white text-[12px] rounded-full hover:bg-[#7A8A6B] dark:hover:bg-[#6A7A5B] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Available Tags */}
          <div className="space-y-2">
            <p className="text-[#8B7355] dark:text-[#B5A896] text-[13px] uppercase tracking-wide">
              Available Tags
            </p>
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-1 text-[12px] rounded-full transition-colors
                    ${
                      selectedTags.includes(tag)
                        ? 'bg-[#8B9B7C] dark:bg-[#7A8A6B] text-white'
                        : 'bg-[#EBE9E3] dark:bg-[#2A2A2A] text-[#5A5A5A] dark:text-[#A0A0A0] hover:bg-[#D4CFC4] dark:hover:bg-[#353535]'
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={selectedTags.length === 0}
            className="w-full py-3 bg-[#8B9B7C] dark:bg-[#7A8A6B] text-white rounded-sm hover:bg-[#7A8A6B] dark:hover:bg-[#6A7A5B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search Readings
          </button>
        </div>
      </div>
    </div>
  );
}