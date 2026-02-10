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
    <div className="fixed inset-0 bg-[#1A2A1F] bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F4F7F3] dark:bg-[#161C18] rounded-sm max-w-2xl w-full">
        <div className="border-b border-[#CED9CB] dark:border-[#2A3A30] px-6 py-4 flex justify-between items-center">
          <h2 className="text-[#1A2A1F] dark:text-[#E8EBE6]">Search by Tag</h2>
          <button
            onClick={onClose}
            className="text-[#6B8560] dark:text-[#A8B8A0] hover:text-[#1A2A1F] dark:hover:text-[#E8EBE6] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B8560] dark:text-[#A8B8A0]" />
            <input
              type="text"
              placeholder="Filter tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#E9EDE8] dark:bg-[#202A24] border border-[#CED9CB] dark:border-[#2A3A30] rounded-sm text-[#1A2A1F] dark:text-[#E8EBE6] placeholder:text-[#6B8560] dark:placeholder:text-[#748274] focus:outline-none focus:ring-2 focus:ring-[#7A9D6D] dark:focus:ring-[#6B8E5F]"
            />
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="space-y-2">
              <p className="text-[#6B8560] dark:text-[#A8B8A0] text-[13px] uppercase tracking-wide">
                Selected
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1 bg-[#7A9D6D] dark:bg-[#6B8E5F] text-white text-[12px] rounded-full hover:bg-[#6B8E5F] dark:hover:bg-[#5C7E50] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Available Tags */}
          <div className="space-y-2">
            <p className="text-[#6B8560] dark:text-[#A8B8A0] text-[13px] uppercase tracking-wide">
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
                        ? 'bg-[#7A9D6D] dark:bg-[#6B8E5F] text-white'
                        : 'bg-[#E9EDE8] dark:bg-[#202A24] text-[#4E5E54] dark:text-[#9AA89E] hover:bg-[#CED9CB] dark:hover:bg-[#2A3A2F]'
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
            className="w-full py-3 bg-[#7A9D6D] dark:bg-[#6B8E5F] text-white rounded-sm hover:bg-[#6B8E5F] dark:hover:bg-[#5C7E50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search Readings
          </button>
        </div>
      </div>
    </div>
  );
}
