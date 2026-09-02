'use client'

type LetterProps = {
  name?: string
  paragraphs?: string[]
  signature?: string
  dateline?: string
  onClose?: () => void
}

export function Letter({
  name = "My Love",
  paragraphs = [
    "I wanted to write this so you would always have a piece of my heart to hold onto, no matter how many miles or time zones sit between us . Looking back at everything we have shared, every late night voice call, every co op match where we probably should have gone to sleep hours ago, and every comfortable quiet moment, I realize how much brighter my entire life is with you in it.",
    "Even though there is physical distance separating us right now, it is wild how close you actually feel. I have lost count of how many times I have caught myself grinning at my screen over the absolute dumbest things, or staying up way past my limit simply because I refuse to be the one to say goodnight first. All those hours completely vanish in what feels like seconds, leaving me wishing we had just a little more time before the real world has to kick in. It is genuinely funny how a computer screen and some fiber optics manage to vanish the second you start talking, making it feel like you are sitting right across the room instead of miles away.",
    "I still find myself smiling when I think about our growing collection of small traditions, the inside jokes that absolutely no one else would understand, and how effortlessly the clock spins around whenever it is just the two of us. You have this rare effortless way of making everything feel lighter, no matter how chaotic or exhausting things get on my end. I love how we can drift from talking about absolute nonsense for hours straight into deep meaningful conversations out of nowhere. Nothing is ever forced with you, and that natural ease is something I have honestly never found anywhere else.",
    "Thank you for being my favorite person, my ultimate gaming partner, my safe space, and my truest best friend all rolled into one. Thank you for your patience, your warmth, and for caring for me the way you do. Writing code and building this little site is just my way of trying to show what you mean to me, but words and syntax will always fall short. Typing out every line, I just kept thinking about how lucky I am to have someone who inspires me to put in genuine effort, simply because seeing you smile is worth every second.",
    "It blows my mind that we are only at the very first chapter of this story. I can not wait for all the moments we have not lived yet, the next games we are going to obsess over, and every single adventure ahead of us. One month down, and I am already counting down to everything that comes next. I hope every time you open this page, you remember that no matter where you are in the world, you have got someone in your corner who is entirely, completely crazy about you."
  ],
  signature = "Forever & Always,",
  dateline = "Month One",
  onClose,
}: LetterProps) {
  return (
    <div className="w-full max-w-2xl [animation:rise_900ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
      <article className="paper-texture relative rounded-sm border border-ink/20 px-7 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] sm:px-14 sm:py-14">
        {/* Folded paper creases */}
        <span aria-hidden="true" className="absolute inset-x-0 top-1/3 h-px bg-ink/10" />
        <span aria-hidden="true" className="absolute inset-x-0 top-2/3 h-px bg-ink/10" />

        <header className="mb-8 flex items-baseline justify-between gap-4 border-b border-ink/20 pb-4">
          <p className="font-serif text-xs tracking-[0.35em] text-ink-soft uppercase">
            A letter, sealed &amp; sent
          </p>
          <p className="font-serif text-xs tracking-[0.2em] text-ink-soft">
            {dateline}
          </p>
        </header>

        {/* Scrollable Letter Body */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <h1 className="font-sans text-4xl text-ink text-balance sm:text-5xl mb-6">
            Hey {name},
          </h1>

          <div className="space-y-5 font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {paragraphs.map((line, index) => (
              <p key={index} className="text-pretty">
                {line}
              </p>
            ))}
          </div>

          <p className="mt-10 font-sans text-3xl text-ink">{signature}</p>
        </div>

        <footer className="mt-8 flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
          <span className="font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            Sealed with red wax
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer font-serif text-xs tracking-[0.3em] text-wax uppercase transition-colors hover:text-wax-dark focus-visible:ring-2 focus-visible:ring-wax focus-visible:outline-none"
            >
              Fold it back up
            </button>
          )}
        </footer>
      </article>
    </div>
  )
}
