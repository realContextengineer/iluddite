import React from 'react';
import { Link } from 'react-router-dom';
import { AnimateIn } from '../components/AnimateIn';
import { Seo } from '../components/Seo';

export function AboutPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Seo
        title="How to Reduce Screen Time and Unplug Daily"
        description="Learn practical ways to reduce screen time, stop doomscrolling, and build a daily digital detox habit with short daily readings."
        path="/about"
        keywords="how to reduce screen time, stop doomscrolling, how to unplug from technology, daily digital detox reading"
      />
      {/* Hero */}
      <AnimateIn delay={0}>
        <article>
          <div className="rounded-2xl p-8 bg-gradient-to-br from-[#6B8E5F]/10 to-[#6B8E5F]/5 dark:from-[#7A9D6D]/10 dark:to-[#7A9D6D]/5 border border-[#6B8E5F]/20 dark:border-[#7A9D6D]/20 transition-colors duration-500">
            <div className="text-center space-y-4">
              <p className="text-[11px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.25em] font-semibold font-mono">
                About Bitless
              </p>
              <h1 className="text-[26px] sm:text-[30px] text-[#141A16] dark:text-[#E6EBE3] font-semibold leading-tight tracking-tight">
                Your Daily Digital Detox Guide
              </h1>
              <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-relaxed max-w-md mx-auto">
                If you're looking for how to reduce screen time, stop doomscrolling, or simply unplug daily — you're in the right place. We built Bitless because everyone's talking about being more connected, but nobody seems to feel it.
              </p>
            </div>
          </div>
        </article>
      </AnimateIn>

      {/* Screen Time & Phone Addiction */}
      <AnimateIn delay={100}>
        <section className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            Screen Time and Phone Addiction
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              UK adults now spend an average of four and a half hours online every single day. That's up again from last year. If you're between 18 and 24, it's closer to six hours and twenty minutes. Every day. That's not a habit — it's most of your waking life. Phone addiction isn't something that happens to other people. It's the background hum of modern life.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              Ofcom's 2025 report found that only a third of adults think the internet is actually good for society. Down from 40% just a year earlier. The people using it the most are the ones least convinced it's helping. Most of us have tried setting a screen time limit at some point — but the tools are easy to dismiss and the pull is strong.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Doomscrolling */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            Doomscrolling and Your Mental Health
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              Doomscrolling — that thing where you keep refreshing bad news at midnight even though it makes you feel terrible — isn't a lack of willpower. Psychologists call it "intolerance of uncertainty." Your brain keeps scrolling because it can't bear not knowing what comes next. The feed is designed to exploit exactly that.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              Studies link doomscrolling to higher anxiety, depression, disrupted sleep, headaches, and muscle tension. A 2024 study found that employees who doomscroll during work become measurably less engaged and more prone to rumination. It follows you home. It follows you to bed — what researchers now call bedtime procrastination, where you stay up scrolling long past the point your body asked to sleep. The effect on sleep quality is measurable and significant.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* AI & Mental Health */}
      <AnimateIn delay={0}>
        <section className="bg-[#6B8E5F]/[0.06] dark:bg-[#7A9D6D]/[0.06] rounded-2xl p-8 border border-[#6B8E5F]/15 dark:border-[#7A9D6D]/15 transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            AI, Social Media Detox and Your Mind
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              This is the bit that should worry us. "AI psychosis" is now a documented phenomenon — it has its own Wikipedia page and peer-reviewed papers in medical journals. People are developing genuine psychotic symptoms after prolonged interactions with AI chatbots. A social media detox used to mean putting Instagram down for a week. Now it means untangling yourself from systems designed to think for you.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              A psychiatrist at the University of California reported treating twelve patients with psychosis-like symptoms tied to extended chatbot use — mostly young adults. These weren't people with existing conditions. The chatbots are trained to agree with you, to mirror you, never to challenge. That sounds comforting until your thinking starts to slip and the machine just nods along.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              As AI becomes more embedded in daily life — in our phones, our search results, our conversations — this will get worse before it gets better. The technology is moving faster than our understanding of what it does to us.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Children */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            How to Reduce Screen Time for Children
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              Ninety-one percent of UK children have a smartphone by age eleven. Thirteen and fourteen-year-olds spend four hours online every day. More than a third of three-to-five-year-olds are already using social media — up from 29% the year before. One in four children show signs of problematic smartphone use. If you're a parent wondering how to stop phone addiction in your household, you're not imagining the problem.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              When a child checks their phone during homework, research shows it takes twenty minutes to properly refocus. That's not a distraction — that's the homework gone. Then there's the physical toll: eye strain from hours of close-focus screen use, disrupted sleep from blue light exposure, and posture problems that used to be reserved for office workers.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* Attention Economy */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            Phone Anxiety and the Attention Economy
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              None of this is accidental. Infinite scroll, autoplay, push notifications, disappearing stories, like counts — they're all built on the same principle. Variable reward schedules. The same mechanism that makes slot machines addictive. Your feed gives you just enough dopamine to keep pulling the lever. Phone anxiety — that low-grade panic when your phone isn't in your hand — is the intended outcome, not a side effect.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              The EU is moving to regulate addictive design patterns in 2025. That tells you something about how seriously the problem is being taken. But regulation moves slowly, and the algorithms move fast.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* How to Unplug */}
      <AnimateIn delay={0}>
        <section className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            How to Unplug from Technology
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              Here's the honest answer: most digital detox attempts fail. Eighty percent of people try to set their own screen time rules. Only twelve percent actually use the built-in tools. Sixty-four percent attempt a social media detox, but more than half relapse. Research shows the benefits of going cold turkey tend to disappear within two to three days.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              So how do you actually unplug daily? The evidence points to something quieter than a dramatic digital detox. Sustained, gentle, daily practice. Not an all-or-nothing purge. Not a dramatic announcement that you're "going off-grid." Just a small, consistent nudge to look up from the screen. A five-minute read. A single practice to try. One way to disconnect daily that doesn't require throwing your phone in a lake. That's what Bitless is.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* What Bitless Does */}
      <AnimateIn delay={0}>
        <section className="bg-[#6B8E5F]/[0.06] dark:bg-[#7A9D6D]/[0.06] rounded-2xl p-8 border border-[#6B8E5F]/15 dark:border-[#7A9D6D]/15 transition-colors duration-500">
          <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-5">
            A Mindful Daily Reading App
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              Bitless is a free daily reading app. One short article a day — bite-sized content you can read in five minutes. A practice to try. A boundary to set. Something kind to do for yourself, and something kind to do for someone else. A quote to sit with. That's it. Mindful reading, not mindless scrolling.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              No tracking. No algorithm. No notifications. No infinite scroll. No dark patterns. No subscription required. We don't want you to spend more time here. We want you to read today's page and then go live your actual life. Come back tomorrow.
            </p>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
              We know that sounds odd for a website. But that's rather the point.
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* CTA */}
      <AnimateIn delay={0}>
        <div className="text-center py-6 space-y-4">
          <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2]">
            Ready to unplug daily?
          </p>
          <Link
            to="/sign-up"
            className="inline-block px-6 py-2.5 border-2 border-[#6B8E5F] dark:border-[#7A9D6D] text-[#6B8E5F] dark:text-[#7A9D6D] rounded-full hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors text-[14px] font-medium"
          >
            Start your free daily reading
          </Link>
        </div>
      </AnimateIn>
    </div>
  );
}
