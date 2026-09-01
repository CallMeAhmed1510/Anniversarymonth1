'use client'

import { useRef, useState } from 'react'
import { GiftBox } from '@/components/gift-box'
import { HangingRoses } from '@/components/hanging-roses'
import { Letter } from '@/components/letter'
import { WaxEnvelope } from '@/components/wax-envelope'
import { MusicPlayer, type MusicHandle } from '@/components/music-player'

/* ── everything you'd want to change lives right here ────────────── */
const HER_NAME = 'Darling'
const MONOGRAM = 'K'
const ADDRESSED_TO = 'for Kira'
const DATELINE = 'Our first month'
const SIGNATURE = 'With love, Ahmed'
const LETTER = [
  'It’s officially been a full month, and every single day of it has brought nothing but love, deep understanding, and pure joy into my life. No matter how heavy things got or how life tried to bring me down, your hand was always right there to comfort me, gently reminding me that nothing stays bad forever.',
  'The care and understanding you give me, along with that endless motivation to keep pushing forward, turn even my toughest days around. You manage to make everything better so naturally and effortlessly.',
  'I love how you get so shy when you try to flirt with me. It completely melts me every single time—not just because of what you say, but because of how endlessly cute you are when you say it. And whenever you tell me that you love me, it makes my cheeks burn with a blush so deep my face actually hurts from smiling. Just hearing your voice washes a sense of calm and peace over me, filling me with emotions I can hardly put into words.',
  'Every time I tell you how much I adore and appreciate you, you show me that exact same warmth right back, and more. Even when life gets frustrating and tries to ruin our mood, we still stand side by side, hand in hand, loving each other even more through it all. It is the purest, most unconditional kind of love.',
  'This 8-to-9-hour time difference feels like nothing when our hearts are this close. I yearn for you while you’re sleeping, and knowing you miss me just as much while I’m asleep fills me with so much happiness.',
  'So here’s to our very first month, darling. I love you so much.',
]
/* ─────────────────────────────────────────────────────────────────── */

type Stage = 'box' | 'lid-off' | 'envelope' | 'unsealing' | 'letter'

export function BirthdayScene() {
  const [stage, setStage] = useState<Stage>('box')
  const music = useRef<MusicHandle>(null)

  const openBox = () => {
    // first user gesture — start the song
    music.current?.play()
    setStage('lid-off')
    window.setTimeout(() => setStage('envelope'), 900)
  }

  const unseal = () => {
    setStage('unsealing')
    window.setTimeout(() => setStage('letter'), 1200)
  }

  const showingLetter = stage === 'letter'

  return (
    <main className="vignette relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16">
      {/* candlelit glow + drifting dust */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 42%, rgba(178,138,76,0.22) 0%, transparent 70%)',
          animation: 'flicker 5s ease-in-out infinite',
        }}
      />
      <HangingRoses />
      <MusicPlayer ref={music} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[12, 28, 44, 63, 79, 91].map((left, i) => (
          <span
            key={left}
            className="absolute bottom-24 h-1 w-1 rounded-full bg-gilt/70"
            style={{
              left: `${left}%`,
              animation: `drift ${9 + i * 1.7}s linear ${i * 1.6}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full flex-col items-center">
        {!showingLetter && (
          <p className="mb-10 font-serif text-xs tracking-[0.45em] text-gilt/80 uppercase">
            {stage === 'box' || stage === 'lid-off'
              ? 'press the box'
              : 'break the seal'}
          </p>
        )}

        {stage === 'box' || stage === 'lid-off' ? (
          <GiftBox opened={stage === 'lid-off'} onOpen={openBox} />
        ) : null}

        {stage === 'envelope' || stage === 'unsealing' ? (
          <div className="[animation:rise_900ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
            <WaxEnvelope
              unsealing={stage === 'unsealing'}
              onUnseal={unseal}
              addressedTo={ADDRESSED_TO}
              monogram={MONOGRAM}
            />
          </div>
        ) : null}

        {showingLetter ? (
          <Letter
            name={HER_NAME}
            paragraphs={LETTER}
            signature={SIGNATURE}
            dateline={DATELINE}
            onClose={() => setStage('box')}
          />
        ) : null}
      </div>
    </main>
  )
}
