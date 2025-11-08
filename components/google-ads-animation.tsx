"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function GoogleAdsAnimation() {
  const [clicks, setClicks] = useState(0)
  const [conversions, setConversions] = useState(0)
  const [roas, setRoas] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Animate clicks counter
    const clicksInterval = setInterval(() => {
      setClicks((prev) => {
        if (prev >= 127) {
          clearInterval(clicksInterval)
          return 127
        }
        return prev + 3
      })
    }, 20)

    // Animate conversions counter
    const conversionsInterval = setInterval(() => {
      setConversions((prev) => {
        if (prev >= 30) {
          clearInterval(conversionsInterval)
          return 30
        }
        return prev + 0.8
      })
    }, 50)

    const roasInterval = setInterval(() => {
      setRoas((prev) => {
        if (prev >= 12.5) {
          clearInterval(roasInterval)
          return 12.5
        }
        return prev + 0.3
      })
    }, 30)

    return () => {
      clearInterval(clicksInterval)
      clearInterval(conversionsInterval)
      clearInterval(roasInterval)
    }
  }, [])

  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-sm">
      {/* ROAS Highlight */}


      {/* Metrics Row */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {/* Clicks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-lg bg-[#1A73E8] p-3 text-white"
        >
          <div className="text-xs font-medium opacity-90">Cliques</div>
          <div className="text-2xl font-bold">{Math.floor(clicks)}</div>
        </motion.div>

        {/* Conversions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg bg-[#EA4335] p-3 text-white"
        >
          <div className="opacity-90 text-xs leading-7 font-medium">Conversões</div>
          <div className="text-2xl font-bold">{conversions.toFixed(0)}</div>
        </motion.div>
      </div>

      {/* Chart Area */}
      <div className="relative h-24 w-full">
        <svg className="h-full w-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="300" y2="20" stroke="#E8EAED" strokeWidth="0.5" />
          <line x1="0" y1="40" x2="300" y2="40" stroke="#E8EAED" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="300" y2="60" stroke="#E8EAED" strokeWidth="0.5" />

          {/* Blue line (Clicks) */}
          <motion.path
            d="M 0 40 Q 75 35, 150 30 T 300 20"
            fill="none"
            stroke="#1A73E8"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isVisible ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Red line (Conversions) */}
          <motion.path
            d="M 0 30 Q 75 40, 150 50 T 300 70"
            fill="none"
            stroke="#EA4335"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isVisible ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Bottom Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-3 grid grid-cols-2 gap-3 border-t pt-3"
      >
        <div>
          <div className="text-xs text-muted-foreground">CPC médio</div>
          <div className="text-sm font-semibold text-foreground">R$ 0,34</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Custo</div>
          <div className="text-sm font-semibold text-foreground">R$ 43,15</div>
        </div>
      </motion.div>
    </div>
  )
}
