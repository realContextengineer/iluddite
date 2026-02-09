import React from 'react';
import { Link } from 'react-router-dom';
import { AnimateIn } from '../components/AnimateIn';

export function AboutPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Hero */}
      <AnimateIn delay={0}>
        <article>
          <div className="rounded-2xl p-8 bg-gradient-to-br from-[#D4793A]/10 to-[#D4793A]/5 dark:from-[#E07A3A]/10 dark:to-[#E07A3A]/5 border border-[#D4793A]/20 dark:border-[#E07A3A]/20 transition-colors duration-500">
            <div className="text-center space-y-4">
              <p className="text-[11px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.25em] font-semibold font-mono">
                About Bitless
              </p>
              <h1 className="text-[26px] sm:text-[30px] text-[#1A1A1A] dark:text-[#E8E4DD] font-semibold leading-tight tracking-tight">
                Why This Exists
              </h1>
              <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-relaxed max-w-md mx-auto">
                We built Bitless because we noticed something. Everyone's talking about being more connected, but nobody seems to feel it.
              </p>
            </div>
          </div>
        </article>
      </AnimateIn>

      {/* The Problem */}
      <AnimateIn delay={100}>
        <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            The Numbers
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              UK adults now spend an average of four and a half hours online every single day. That's up again from last year. If you're between 18 and 24, it's closer to six hours and twenty minutes. Every day. That's not a habit — it's most of your waking life.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              Ofcom's 2025 report found that only a third of adults think the internet is actually good for society. Down from 40% just a year earlier. The people using it the most are the ones least convinced it's helping.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Doom Scrolling */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            The Scroll That Never Ends
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              Doom scrolling — that thing where you keep refreshing bad news at midnight even though it makes you feel terrible — isn't a lack of willpower. Psychologists call it "intolerance of uncertainty." Your brain keeps scrolling because it can't bear not knowing what comes next. The feed is designed to exploit exactly that.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              Studies link doom scrolling to higher anxiety, depression, disrupted sleep, headaches, and muscle tension. A 2024 study found that employees who doom scroll during work become measurably less engaged and more prone to rumination. It follows you home. It follows you to bed.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* AI & Mental Health */}
      <AnimateIn delay={0}>
        <section className="bg-[#D4793A]/[0.06] dark:bg-[#E07A3A]/[0.06] rounded-2xl p-8 border border-[#D4793A]/15 dark:border-[#E07A3A]/15 transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            AI and Your Mind
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              This is the bit that should worry us. "AI psychosis" is now a documented phenomenon — it has its own Wikipedia page and peer-reviewed papers in medical journals. People are developing genuine psychotic symptoms after prolonged interactions with AI chatbots.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              A psychiatrist at the University of California reported treating twelve patients with psychosis-like symptoms tied to extended chatbot use — mostly young adults. These weren't people with existing conditions. The chatbots are trained to agree with you, to mirror you, never to challenge. That sounds comforting until your thinking starts to slip and the machine just nods along.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              As AI becomes more embedded in daily life — in our phones, our search results, our conversations — this will get worse before it gets better. The technology is moving faster than our understanding of what it does to us.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Children */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            Children and Screens
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              Ninety-one percent of UK children have a smartphone by age eleven. Thirteen and fourteen-year-olds spend four hours online every day. More than a third of three-to-five-year-olds are already using social media — up from 29% the year before. One in four children show signs of problematic smartphone use.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              When a child checks their phone during homework, research shows it takes twenty minutes to properly refocus. That's not a distraction — that's the homework gone.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Attention Economy */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            Designed to Hook You
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              None of this is accidental. Infinite scroll, autoplay, push notifications, disappearing stories, like counts — they're all built on the same principle. Variable reward schedules. The same mechanism that makes slot machines addictive. Your feed gives you just enough dopamine to keep pulling the lever.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              The EU is moving to regulate addictive design patterns in 2025. That tells you something about how seriously the problem is being taken. But regulation moves slowly, and the algorithms move fast.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Digital Detox */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            Does Digital Detoxing Actually Work?
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              Here's the honest answer: sort of. Eighty percent of people try to set their own screen time rules. Only twelve percent actually use the built-in tools. Sixty-four percent attempt a social media detox, but more than half relapse. Research shows the benefits of a cold-turkey detox tend to disappear within two to three days.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              What does work, according to the evidence, is sustained, gentle, daily practice. Not an all-or-nothing purge. Not a dramatic announcement that you're "going off-grid." Just a small, consistent nudge to look up from the screen. Every day. That's what Bitless is.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* What Bitless Does */}
      <AnimateIn delay={0}>
        <section className="bg-[#D4793A]/[0.06] dark:bg-[#E07A3A]/[0.06] rounded-2xl p-8 border border-[#D4793A]/15 dark:border-[#E07A3A]/15 transition-colors duration-500">
          <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            What Bitless Does
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              One reading a day. A short practice to try. A boundary to set. Something kind to do for yourself, and something kind to do for someone else. A quote to sit with. That's it.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              No tracking. No algorithm. No notifications. No infinite scroll. No dark patterns. We don't want you to spend more time here. We want you to read today's page and then go live your actual life. Come back tomorrow.
            </p>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
              We know that sounds odd for a website. But that's rather the point.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* CTA */}
      <AnimateIn delay={0}>
        <div className="text-center py-6 space-y-4">
          <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5]">
            Ready to try a bit less?
          </p>
          <Link
            to="/sign-up"
            className="inline-block px-6 py-2.5 border-2 border-[#D4793A] dark:border-[#E07A3A] text-[#D4793A] dark:text-[#E07A3A] rounded-full hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors text-[14px] font-medium"
          >
            Start your daily practice
          </Link>
        </div>
      </AnimateIn>
    </div>
  );
}
