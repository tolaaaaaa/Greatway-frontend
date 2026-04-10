'use client'

import { useState } from "react"

type TabOption = 'listed' | 'unlisted' | 'sold'

type PropertyTabsProps = {
  onChange?: (tab: TabOption) => void
}

export default function PropertyTabs({ onChange }: PropertyTabsProps) {
  const [activeTab, setActiveTab] = useState<TabOption>('listed')

  const tabs: { label: string; value: TabOption }[] = [
    { label: 'Listed', value: 'listed' },
    { label: 'Unlisted', value: 'unlisted' },
    { label: 'Sold', value: 'sold' },
  ]

  const handleTabClick = (tab: TabOption) => {
    setActiveTab(tab)
    onChange?.(tab)
  }

  return (
    <div className="bg-[#181818] rounded-xl px-8 pt-4 pb-0 flex items-center gap-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className="flex flex-col items-center gap-3 cursor-pointer"
          >
            <span
              className={`
                font-bold text-base tracking-[0.01em] text-center transition-colors duration-200
                ${isActive ? 'text-[#06CD70]' : 'text-white/70 hover:text-white'}
              `}
            >
              {tab.label}
            </span>

            {/* Active indicator sits on the bottom border */}
            <span
              className={`
                h-0.5 w-full rounded-full transition-all duration-200
                ${isActive ? 'bg-[#06CD70]' : 'bg-transparent'}
              `}
            />
          </button>
        )
      })}
    </div>
  )
}