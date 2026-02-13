import React, { useState, useEffect } from 'react';
import { DailyReading } from '../components/DailyReading';
import { Seo } from '../components/Seo';
import readingsData from '../../data/readings.json';
import promptsData from '../../data/prompts.json';

interface Reading {
  day: number;
  date: string;
  title: string;
  holidayNote?: string;
  somaticInvitation: string;
  practice: string;
  niceSelf: string;
  niceOther: string;
  quote: string;
  quoteSource: string;
  techBoundary: string;
  tags: string[];
}

export function HomePage() {
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReading = async () => {
      try {
        const response = await fetch('/api/today');
        if (response.ok) {
          const data = await response.json();
          setReading(data as Reading);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('API not available, using fallback readings');
      }

      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const localReading = readingsData.find((r) => r.day === dayOfYear);
      if (localReading) {
        setReading(localReading as Reading);
      } else {
        const todayPrompt = promptsData.find((p) => p.day === dayOfYear);
        if (todayPrompt) {
          setReading({
            day: todayPrompt.day,
            date: todayPrompt.date,
            title: todayPrompt.title,
            somaticInvitation: "Today's reading is being prepared. In the meantime, take a breath. Look away from this screen for a moment. Notice what's around you — the light, the sounds, the temperature of the air. That's the practice. You're already doing it.",
            practice: "Close your eyes for one minute. Just one. See what your mind does when it's not being fed.",
            niceSelf: "Make yourself a cup of something warm and drink it without looking at a screen.",
            niceOther: "Send a short message to someone you haven't spoken to in a while. No reason needed.",
            quote: "The greatest thing in the world is to know how to belong to oneself.",
            quoteSource: "Michel de Montaigne",
            techBoundary: "Put your phone in another room for the next hour. It'll survive. So will you.",
            tags: ["presence", "rest", "awareness"],
          });
        } else {
          setReading(readingsData[0] as Reading);
        }
      }
      setLoading(false);
    };

    fetchReading();
  }, []);

  if (loading) {
    return (
      <>
        <Seo
          title="Daily Digital Detox Reading"
          description="Read one daily digital detox reading at Bitless. A five-minute daily reflection to reduce screen time and build a calmer relationship with technology."
          path="/"
          keywords="daily digital detox reading, digital detox daily reading, reduce screen time, daily reflection app, unplug from technology"
        />
        <div className="max-w-xl mx-auto text-center py-24">
          <div className="inline-flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#7A9D6D]/30 border-t-[#7A9D6D] rounded-full animate-spin" />
            <p className="text-[#7A8A7E] dark:text-[#5A6A5E] text-[14px]">
              Loading today's reading...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!reading) {
    return (
      <>
        <Seo
          title="Daily Digital Detox Reading"
          description="Read one daily digital detox reading at Bitless. A five-minute daily reflection to reduce screen time and build a calmer relationship with technology."
          path="/"
          keywords="daily digital detox reading, digital detox daily reading, reduce screen time, daily reflection app, unplug from technology"
        />
        <div className="max-w-xl mx-auto text-center py-24">
          <p className="text-[#7A8A7E] dark:text-[#5A6A5E] text-[14px]">
            No reading available. Check back soon.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Daily Digital Detox Reading"
        description="Read one daily digital detox reading at Bitless. A five-minute daily reflection to reduce screen time and build a calmer relationship with technology."
        path="/"
        keywords="daily digital detox reading, digital detox daily reading, reduce screen time, daily reflection app, unplug from technology"
      />
      <DailyReading reading={reading} />
    </>
  );
}
