'use client'

/**
 * Dried roses hung around the frame, drawn entirely in CSS so there are no
 * image dependencies. Purely decorative: sits behind the letter, ignores
 * pointer events, and sways very slightly so the page feels like a room with
 * air moving through it.
 */

/* ---------------------------------------------------------------- a bloom */

type BloomProps = {
  /** bloom diameter in px */
  size: number
  /** rotation of the whole flower head */
  rotate?: number
  /** dried-rose body colour */
  petal: string
  /** shadowed underside of each petal */
  shade: string
  /** sun-caught petal edge */
  light: string
}

function Bloom({ size, rotate = 0, petal, shade, light }: BloomProps) {
  // five outer petals fanned around the head, then three tighter inner ones
  const outer = [0, 72, 144, 216, 288]
  const inner = [30, 150, 270]

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* outer petal ring */}
      {outer.map((deg, i) => (
        <div
          key={`o-${deg}`}
          className="absolute left-1/2 top-1/2"
          style={{
            width: size * 0.62,
            height: size * 0.62,
            marginLeft: -size * 0.31,
            marginTop: -size * 0.31,
            transform: `rotate(${deg}deg) translateY(${-size * 0.2}px)`,
            borderRadius: '68% 68% 42% 42% / 78% 78% 30% 30%',
            background: `linear-gradient(170deg, ${light} 0%, ${petal} 46%, ${shade} 100%)`,
            boxShadow: `inset 0 ${-size * 0.03}px ${size * 0.06}px ${shade}`,
            opacity: 0.94 - i * 0.02,
          }}
        />
      ))}

      {/* inner cup */}
      {inner.map((deg) => (
        <div
          key={`i-${deg}`}
          className="absolute left-1/2 top-1/2"
          style={{
            width: size * 0.4,
            height: size * 0.4,
            marginLeft: -size * 0.2,
            marginTop: -size * 0.2,
            transform: `rotate(${deg}deg) translateY(${-size * 0.1}px)`,
            borderRadius: '70% 70% 40% 40% / 80% 80% 28% 28%',
            background: `linear-gradient(180deg, ${petal} 0%, ${shade} 100%)`,
          }}
        />
      ))}

      {/* the curled heart of the rose */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: size * 0.22,
          height: size * 0.22,
          marginLeft: -size * 0.11,
          marginTop: -size * 0.11,
          borderRadius: '60% 40% 55% 45% / 55% 55% 45% 45%',
          background: `radial-gradient(circle at 40% 35%, ${petal} 0%, ${shade} 70%, rgba(0,0,0,0.55) 100%)`,
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ a bud */

function Bud({ size, petal, shade }: { size: number; petal: string; shade: string }) {
  return (
    <div
      style={{
        width: size,
        height: size * 1.35,
        borderRadius: '50% 50% 45% 45% / 62% 62% 38% 38%',
        background: `linear-gradient(165deg, ${petal} 0%, ${shade} 85%)`,
        boxShadow: `inset ${-size * 0.12}px 0 ${size * 0.2}px rgba(0,0,0,0.4)`,
      }}
    />
  )
}

/* ----------------------------------------------------------------- a leaf */

function Leaf({
  length,
  rotate,
  flip = false,
}: {
  length: number
  rotate: number
  flip?: boolean
}) {
  return (
    <div
      style={{
        width: length,
        height: length * 0.42,
        transform: `rotate(${rotate}deg) scaleY(${flip ? -1 : 1})`,
        borderRadius: '0 100% 0 100%',
        background: 'linear-gradient(120deg, #4a5540 0%, #333c2c 55%, #232a1d 100%)',
        opacity: 0.85,
      }}
    />
  )
}

/* ----------------------------------------------------------- a hung sprig */

type SprigProps = {
  /** container placement + sway, applied to the outer wrapper */
  className: string
  animation: string
  /** overall scale of the sprig */
  scale: number
  /** how far back in the room it sits */
  depth: number
  petal: string
  shade: string
  light: string
  blur?: number
}

function Sprig({
  className,
  animation,
  scale,
  depth,
  petal,
  shade,
  light,
  blur = 0,
}: SprigProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        animation,
        opacity: depth,
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      <div
        className="relative"
        style={{
          width: 200 * scale,
          height: 260 * scale,
          transform: `scale(1)`,
        }}
      >
        {/* main stem falling from the corner */}
        <div
          className="absolute left-[46%] top-0 origin-top"
          style={{
            width: Math.max(1, 3 * scale),
            height: 170 * scale,
            transform: 'rotate(6deg)',
            background:
              'linear-gradient(180deg, #4c5340 0%, #39412f 60%, #2a3122 100%)',
            borderRadius: 999,
          }}
        />
        {/* two branching stems */}
        <div
          className="absolute left-[46%] top-[18%] origin-top"
          style={{
            width: Math.max(1, 2 * scale),
            height: 92 * scale,
            transform: 'rotate(-26deg)',
            background: 'linear-gradient(180deg, #454d3a 0%, #2d3425 100%)',
            borderRadius: 999,
          }}
        />
        <div
          className="absolute left-[46%] top-[26%] origin-top"
          style={{
            width: Math.max(1, 2 * scale),
            height: 74 * scale,
            transform: 'rotate(32deg)',
            background: 'linear-gradient(180deg, #454d3a 0%, #2d3425 100%)',
            borderRadius: 999,
          }}
        />

        {/* leaves along the stems */}
        <div className="absolute left-[48%] top-[14%]">
          <Leaf length={46 * scale} rotate={28} />
        </div>
        <div className="absolute left-[30%] top-[30%]">
          <Leaf length={38 * scale} rotate={-46} flip />
        </div>
        <div className="absolute left-[52%] top-[42%]">
          <Leaf length={42 * scale} rotate={52} />
        </div>

        {/* the blooms, hanging head-down at the ends of the stems */}
        <div className="absolute left-[26%] top-[38%]">
          <Bloom
            size={72 * scale}
            rotate={168}
            petal={petal}
            shade={shade}
            light={light}
          />
        </div>
        <div className="absolute left-[52%] top-[58%]">
          <Bloom
            size={88 * scale}
            rotate={192}
            petal={petal}
            shade={shade}
            light={light}
          />
        </div>
        <div className="absolute left-[18%] top-[62%]">
          <Bud size={26 * scale} petal={petal} shade={shade} />
        </div>
        <div className="absolute left-[70%] top-[34%]">
          <Bud size={20 * scale} petal={shade} shade="#2f1013" />
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- the group */

export function HangingRoses() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* top left: the fullest bunch, closest to the viewer */}
      <Sprig
        className="-top-6 left-0 origin-top md:left-4"
        animation="sway 11s ease-in-out infinite"
        scale={0.9}
        depth={1}
        petal="#a8393a"
        shade="#5c191d"
        light="#d1685c"
      />

      {/* top right: slimmer, a touch further back */}
      <Sprig
        className="-top-4 right-0 origin-top -scale-x-100 md:right-4"
        animation="sway 14s ease-in-out 1.5s infinite reverse"
        scale={0.72}
        depth={0.95}
        petal="#9c3234"
        shade="#52161a"
        light="#c45b51"
      />

      {/* mid sides: hung against the walls, framing the letter */}
      <Sprig
        className="-left-10 top-[30%] origin-top sm:-left-4"
        animation="sway 17s ease-in-out 2.8s infinite reverse"
        scale={0.58}
        depth={0.85}
        petal="#8f2b2e"
        shade="#4a1317"
        light="#b44f46"
      />
      <Sprig
        className="-right-10 top-[36%] origin-top -scale-x-100 sm:-right-4"
        animation="sway 15s ease-in-out 1.1s infinite"
        scale={0.52}
        depth={0.8}
        petal="#8a2a2d"
        shade="#471216"
        light="#ae4a43"
      />

      {/* bottom corners: turned up from the floor */}
      <Sprig
        className="-bottom-8 left-0 origin-bottom rotate-180"
        animation="sway 16s ease-in-out 0.8s infinite"
        scale={0.68}
        depth={0.9}
        petal="#9a3033"
        shade="#4f151a"
        light="#bf554c"
      />
      <Sprig
        className="-bottom-6 right-0 origin-bottom rotate-180 -scale-x-100"
        animation="sway 13s ease-in-out 2.2s infinite reverse"
        scale={0.8}
        depth={0.88}
        petal="#932d30"
        shade="#4a1317"
        light="#b95048"
      />
    </div>
  )
}
