'use client'

type WaxEnvelopeProps = {
  unsealing: boolean
  onUnseal: () => void
  addressedTo: string
  monogram: string
}

export function WaxEnvelope({
  unsealing,
  onUnseal,
  addressedTo,
  monogram,
}: WaxEnvelopeProps) {
  return (
    <button
      type="button"
      onClick={onUnseal}
      disabled={unsealing}
      aria-label="Break the wax seal and open the letter"
      className="group relative block h-[13rem] w-[19rem] cursor-pointer rounded-sm transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-default disabled:hover:translate-y-0 sm:h-[15rem] sm:w-[23rem]"
      style={{ perspective: '900px' }}
    >
      {/* the letter peeking out as the flap opens */}
      <span
        aria-hidden="true"
        className={`paper-texture absolute inset-x-6 top-0 block h-[80%] rounded-sm border border-ink/15 shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-transform duration-[900ms] ease-out ${
          unsealing ? '-translate-y-16' : 'translate-y-6'
        }`}
      />

      {/* envelope back / body */}
      <span
        aria-hidden="true"
        className="paper-texture absolute inset-0 block rounded-sm border border-ink/20 shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
      />

      {/* lower pocket with folded side seams */}
      <span
        aria-hidden="true"
        className="paper-texture absolute inset-0 block rounded-sm border border-ink/20 shadow-[inset_0_10px_24px_rgba(58,43,28,0.18)]"
        style={{
          clipPath: 'polygon(0 38%, 50% 78%, 100% 38%, 100% 100%, 0 100%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 block"
        style={{
          background:
            'linear-gradient(to bottom right, transparent 49.6%, rgba(58,43,28,0.22) 50%, transparent 50.4%)',
          clipPath: 'polygon(0 38%, 50% 78%, 0 100%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 block"
        style={{
          background:
            'linear-gradient(to bottom left, transparent 49.6%, rgba(58,43,28,0.22) 50%, transparent 50.4%)',
          clipPath: 'polygon(100% 38%, 50% 78%, 100% 100%)',
        }}
      />

      {/* the flap */}
      <span
        aria-hidden="true"
        className={`paper-texture absolute inset-x-0 top-0 block h-[62%] origin-top border-x border-t border-ink/20 shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-transform duration-[900ms] ease-[cubic-bezier(0.3,0.8,0.3,1)] ${
          unsealing ? '[transform:rotateX(-172deg)]' : '[transform:rotateX(0deg)]'
        }`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      />

      {/* wax seal — two halves so it can crack apart */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[52%] block h-16 w-16 -translate-x-1/2 -translate-y-1/2"
      >
        {(['left', 'right'] as const).map((side) => (
          <span
            key={side}
            className={`absolute inset-0 block transition-all duration-700 ease-out ${
              unsealing
                ? side === 'left'
                  ? '-translate-x-8 translate-y-6 -rotate-45 opacity-0'
                  : 'translate-x-8 translate-y-7 rotate-45 opacity-0'
                : ''
            }`}
            style={{
              clipPath:
                side === 'left'
                  ? 'polygon(0 0, 52% 0, 48% 100%, 0 100%)'
                  : 'polygon(52% 0, 100% 0, 100% 100%, 48% 100%)',
            }}
          >
            <span
              className="absolute inset-0 rounded-full shadow-[inset_0_-4px_8px_rgba(0,0,0,0.45),inset_0_3px_6px_rgba(255,255,255,0.18),0_6px_12px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  'radial-gradient(circle at 34% 30%, #b23a26 0%, var(--wax) 45%, var(--wax-dark) 100%)',
                clipPath:
                  'polygon(50% 0%, 66% 6%, 82% 4%, 92% 18%, 100% 32%, 96% 50%, 100% 66%, 88% 80%, 74% 94%, 56% 98%, 38% 96%, 22% 88%, 8% 76%, 2% 58%, 4% 40%, 12% 22%, 26% 8%, 40% 2%)',
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="mt-px font-serif text-[1.6rem] leading-none font-semibold text-wax-dark/60 [text-shadow:0_1px_0_rgba(255,255,255,0.18)]">
                {monogram}
              </span>
            </span>
            <span className="absolute inset-[18%] rounded-full border border-wax-dark/40" />
          </span>
        ))}
      </span>

      {/* addressed by hand */}
      <span
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-2xl text-ink/75 transition-opacity duration-500 ${
          unsealing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {addressedTo}
      </span>
    </button>
  )
}
