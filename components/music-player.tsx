'use client'

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Music, Pause } from 'lucide-react'

const VIDEO_ID = 'LhhZ6SRLics'

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

export type MusicHandle = { play: () => void }

export const MusicPlayer = forwardRef<MusicHandle>(function MusicPlayer(
  _props,
  ref,
) {
  const playerRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false

    const create = () => {
      if (cancelled || !window.YT?.Player) return
      playerRef.current = new window.YT.Player('yt-audio', {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            const s = window.YT.PlayerState
            if (e.data === s.PLAYING) setPlaying(true)
            if (e.data === s.PAUSED || e.data === s.ENDED) setPlaying(false)
          },
        },
      })
    }

    if (window.YT?.Player) {
      create()
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'yt-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = create
    }

    return () => {
      cancelled = true
    }
  }, [])

  const play = () => {
    const p = playerRef.current
    if (!p) return
    p.unMute?.()
    p.setVolume?.(60)
    p.playVideo?.()
  }

  const toggle = () => {
    const p = playerRef.current
    if (!p) return
    if (playing) {
      p.pauseVideo?.()
    } else {
      play()
    }
  }

  useImperativeHandle(ref, () => ({ play }), [])

  return (
    <>
      {/* hidden audio source */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] top-0 h-1 w-1 overflow-hidden opacity-0"
      >
        <div id="yt-audio" />
      </div>

      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause the song' : 'Play the song'}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full border border-gilt/40 bg-black/40 px-4 py-2 font-serif text-xs tracking-[0.25em] text-gilt uppercase backdrop-blur-sm transition-colors hover:border-gilt/80 hover:text-gilt disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-gilt focus-visible:outline-none"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Music className="h-4 w-4" aria-hidden="true" />
        )}
        {playing ? 'Pause' : 'Our song'}
      </button>
    </>
  )
})
