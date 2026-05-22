"use client"


import { useState, useRef } from 'react'
import { useWebHaptics } from 'web-haptics/react'

const DELETE_THRESHOLD = 120

const CARD_COLORS = [
  { bg: '#fff0f6', icon: '#ff6b9d', border: '#ffc9e0', emoji: '📄' },
  { bg: '#f0f4ff', icon: '#6b8cff', border: '#c9d4ff', emoji: '📝' },
  { bg: '#f0fff4', icon: '#38d9a9', border: '#c9f0e0', emoji: '📊' },
  { bg: '#fffbf0', icon: '#ffb347', border: '#ffe0a0', emoji: '🎨' },
  { bg: '#f5f0ff', icon: '#b47fff', border: '#e0c9ff', emoji: '📋' },
]

export interface CardItem {
  id: number
  title: string
  meta: string
}

export function SwipeCard({
  item,
  onDelete,
  colorIndex,
  isLast,
}: {
  item: CardItem
  onDelete: () => void
  colorIndex: number
  isLast: boolean
}) {
  const { trigger } = useWebHaptics()
  const [offsetX, setOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const startX = useRef(0)
  const lastVibrated = useRef(0)

  const progress = Math.min(Math.abs(offsetX) / DELETE_THRESHOLD, 1)
  const color = CARD_COLORS[colorIndex % CARD_COLORS.length]

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX
    setIsDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging) return
    const dx = Math.min(0, e.clientX - startX.current)
    setOffsetX(dx)

    const now = Date.now()
    const step = Math.floor(Math.abs(dx) / 20)
    if (step > 0 && now - lastVibrated.current > 150 - step * 20) {
      trigger('selection')
      lastVibrated.current = now
    }
  }

  function onPointerUp() {
    setIsDragging(false)

    if (Math.abs(offsetX) >= DELETE_THRESHOLD) {
      if (isLast) {
        // warning shake, then delete anyway after a pause
        setOffsetX(0)
        setIsShaking(true)
        trigger('error')
        setTimeout(() => {
          setIsShaking(false)
          trigger('heavy')
          setIsDeleting(true)
          setTimeout(onDelete, 350)
        }, 600)
      } else {
        trigger('heavy')
        setIsDeleting(true)
        setTimeout(onDelete, 350)
      }
    } else {
      if (Math.abs(offsetX) > 20) trigger('light')
      setOffsetX(0)
    }
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%   { transform: translateX(0); }
          15%  { transform: translateX(-10px); }
          30%  { transform: translateX(10px); }
          45%  { transform: translateX(-8px); }
          60%  { transform: translateX(8px); }
          75%  { transform: translateX(-4px); }
          90%  { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, marginBottom: 12 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #ff2020, #cc0000)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: 28, opacity: progress, borderRadius: 20,
        }}>
          <span style={{
            fontSize: 24,
            transform: `scale(${0.5 + progress * 0.5}) rotate(${progress * 15}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s',
          }}>🗑️</span>
        </div>

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            transform: isDeleting ? 'translateX(-110%)' : `translateX(${offsetX}px)`,
            animation: isShaking ? 'shake 0.5s ease' : 'none',
            transition: isDragging ? 'none' : isDeleting ? 'transform 0.35s ease-in' : isShaking ? 'none' : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            background: isShaking ? '#fff0f0' : color.bg,
            borderRadius: 20,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
            cursor: 'grab', userSelect: 'none', touchAction: 'pan-y',
            border: isShaking ? '1.5px solid #ffaaaa' : `1.5px solid ${color.border}`,
            boxShadow: isDragging ? '0 12px 40px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: color.icon + '22',
            border: `1.5px solid ${color.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>
            {color.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: '#1a1a2e', fontSize: 15, fontWeight: 700,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              fontFamily: "'Nunito', sans-serif",
            }}>
              {item.title}
            </div>
            <div style={{ color: '#999', fontSize: 12, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>
              {item.meta}
            </div>
          </div>
          <span style={{ fontSize: 16, opacity: 0.2 }}>←</span>
        </div>
      </div>
    </>
  )
}