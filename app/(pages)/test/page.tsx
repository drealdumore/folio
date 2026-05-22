"use client"

import { CardItem, SwipeCard } from '@/components/swipe-card'
import { useState } from 'react'
import { useWebHaptics } from 'web-haptics/react'

const INITIAL_ITEMS: CardItem[] = [
  { id: 1, title: 'Project proposal.pdf', meta: '2.4 MB · Today' },
  { id: 2, title: 'Meeting notes.docx', meta: '128 KB · Yesterday' },
  { id: 3, title: 'Budget Q1.xlsx', meta: '540 KB · Mon' },
  { id: 4, title: 'Design mockup.fig', meta: '8.1 MB · Sun' },
  { id: 5, title: 'Client contract.pdf', meta: '1.2 MB · Last week' },
]

export default function App() {
  const { trigger } = useWebHaptics()
  const [items, setItems] = useState(INITIAL_ITEMS)

  function handleDelete(id: number) {
    setTimeout(() => setItems(i => i.filter(x => x.id !== id)), 400)
  }

  function handleReset() {
    trigger('success')
    setItems(INITIAL_ITEMS)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff0f6 0%, #f0f4ff 50%, #f0fff4 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '48px 20px 20px',
      fontFamily: "'Nunito', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ width: '100%', maxWidth: 400 }}>

        {items.length > 0 && (
          <h1 style={{ color: '#1a1a2e', fontSize: 26, fontWeight: 800, margin: '0 0 20px 0' }}>
            Recent files
          </h1>
        )}

        {items.map((item, i) => (
          <SwipeCard
            key={item.id}
            item={item}
            colorIndex={i}
            isLast={items.length === 1}
            onDelete={() => handleDelete(item.id)}
          />
        ))}

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🤷</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a2e', marginBottom: 24 }}>
              Nothing to see here. Literally.
            </div>
            <button
              onClick={handleReset}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
                border: 'none', borderRadius: 100,
                color: 'white', fontWeight: 800, fontSize: 14,
                cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,107,157,0.35)',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              ↺ Restore
            </button>
          </div>
        )}
      </div>
    </div>
  )
}