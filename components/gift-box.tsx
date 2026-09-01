'use client'

type GiftBoxProps = {
  opened: boolean
  onOpen: () => void
}

export function GiftBox({ opened, onOpen }: GiftBoxProps) {
  return (
    <div className="relative flex h-[22rem] w-[20rem] items-end justify-center sm:h-[24rem] sm:w-[24rem]">
      {/* shadow on the table */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 h-6 w-[17rem] rounded-[50%] bg-black/55 blur-xl sm:w-[19rem]"
      />

      <button
        type="button"
        onClick={onOpen}
        disabled={opened}
        aria-label="Open the anniversary box"
        className="group absolute bottom-6 left-1/2 h-[13rem] w-[16rem] -translate-x-1/2 cursor-pointer rounded-sm transition-transform duration-500 focus-visible:ring-2 focus-visible:ring-gilt focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-default sm:w-[18rem]"
      >
        {/* box body */}
        <span
          aria-hidden="true"
          className="wrap-texture absolute inset-x-0 bottom-0 top-8 block overflow-hidden rounded-sm border border-black/40 shadow-[inset_0_18px_40px_rgba(0,0,0,0.45),inset_0_-10px_30px_rgba(0,0,0,0.5)]"
        >
          {/* ribbon down the front */}
          <span className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-gilt/80 shadow-[0_0_14px_rgba(0,0,0,0.45)]" />
          <span className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-gradient-to-r from-black/35 via-transparent to-black/35" />
          {/* worn edge light */}
          <span className="absolute inset-x-0 top-0 h-px bg-paper/25" />
        </span>

        {/* dark interior seen once the lid is gone */}
        <span
          aria-hidden="true"
          className="absolute inset-x-2 top-7 block h-5 rounded-[50%] bg-[#0d0906] shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)]"
        />

        {/* lid */}
        <span
          aria-hidden="true"
          className={`wrap-texture absolute -left-3 -right-3 top-0 block h-16 rounded-sm border border-black/40 shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(236,224,196,0.2)] ${
            opened
              ? '[animation:lid-off_1.1s_cubic-bezier(0.25,0.9,0.3,1)_forwards]'
              : 'transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-1'
          }`}
        >
          <span className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-gilt/80" />
          {/* bow */}
          <span className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 -rotate-45 rounded-full border-[6px] border-gilt/85" />
          <span className="absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 rounded-full border-[6px] border-gilt/85" />
          <span className="absolute -top-1 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gilt shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]" />
        </span>
      </button>
    </div>
  )
}
