'use client'

type LetterProps = {
  name: string
  paragraphs: string[]
  signature: string
  dateline: string
  onClose: () => void
}

export function Letter({
  name,
  paragraphs,
  signature,
  dateline,
  onClose,
}: LetterProps) {
  return (
    <div className="w-full max-w-2xl [animation:rise_900ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
      <article className="paper-texture relative overflow-hidden rounded-sm border border-ink/20 px-7 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] sm:px-14 sm:py-14">
        {/* folded-paper creases */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/3 h-px bg-ink/10"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-2/3 h-px bg-ink/10"
        />

        <header className="mb-8 flex items-baseline justify-between gap-4 border-b border-ink/20 pb-4">
          <p className="font-serif text-xs tracking-[0.35em] text-ink-soft uppercase">
            A letter, sealed &amp; sent
          </p>
          <p className="font-serif text-xs tracking-[0.2em] text-ink-soft">
            {dateline}
          </p>
        </header>

        <h1 className="font-sans text-4xl text-ink text-balance sm:text-5xl">
          Hey {name},
        </h1>

        <div className="mt-7 space-y-5 font-serif text-lg leading-relaxed text-ink sm:text-xl">
          {paragraphs.map((line) => (
            <p key={line.slice(0, 24)} className="text-pretty">
              {line}
            </p>
          ))}
        </div>

        <p className="mt-10 font-sans text-3xl text-ink">{signature}</p>

        <footer className="mt-12 flex items-center justify-between gap-4 border-t border-ink/20 pt-5">
          <span className="font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            Sealed with red wax
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer font-serif text-xs tracking-[0.3em] text-wax uppercase transition-colors hover:text-wax-dark focus-visible:ring-2 focus-visible:ring-wax focus-visible:outline-none"
          >
            Fold it back up
          </button>
        </footer>
      </article>
    </div>
  )
}
