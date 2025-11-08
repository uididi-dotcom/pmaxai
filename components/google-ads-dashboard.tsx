"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { TrendingUp, MousePointerClick, ShoppingCart } from "lucide-react"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

type DateRangePreset = "7days" | "30days"

const generateMockData = (days: number, isAfter: boolean) => {
  const data = []
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const baseClicks = isAfter ? 500 + Math.random() * 200 : 200 + Math.random() * 100
    const baseConversions = isAfter ? 25 + Math.random() * 15 : 8 + Math.random() * 5

    data.push({
      date: format(date, "dd/MM", { locale: ptBR }),
      clicks: Math.floor(baseClicks),
      conversions: Math.floor(baseConversions),
      cost: Number((baseClicks * (isAfter ? 0.47 : 0.89)).toFixed(2)),
    })
  }
  return data
}

export function GoogleAdsDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "channels">("overview")
  const [isVisible, setIsVisible] = useState(false)
  const [dateRange, setDateRange] = useState<DateRangePreset>("30days")
  const [showComparison, setShowComparison] = useState(true)

  const [animatedMetrics, setAnimatedMetrics] = useState({
    clicks: 0,
    conversions: 0,
    cpc: 0,
    cost: 0,
  })
  const [animatedChannels, setAnimatedChannels] = useState({
    impressions: 0,
    interactions: 0,
    results: 0,
    cpaReal: 0,
    totalCost: 0,
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  const days = dateRange === "7days" ? 7 : 30
  const afterData = useMemo(() => generateMockData(days, true), [days])
  const beforeData = useMemo(() => generateMockData(days, false), [days])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const targetMetrics =
      dateRange === "7days"
        ? {
            clicks: 3689,
            conversions: 208,
            cpc: 0.47,
            cost: 1733.83,
          }
        : {
            clicks: 15847,
            conversions: 892,
            cpc: 0.47,
            cost: 7448.09,
          }

    const targetChannels = {
      impressions: 48523,
      interactions: 3847,
      results: 892,
      cpaReal: 8.35,
      totalCost: 7448.09,
    }

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedMetrics({
        clicks: Math.floor(targetMetrics.clicks * progress),
        conversions: Math.floor(targetMetrics.conversions * progress),
        cpc: Number((targetMetrics.cpc * progress).toFixed(2)),
        cost: Number((targetMetrics.cost * progress).toFixed(2)),
      })

      setAnimatedChannels({
        impressions: Math.floor(targetChannels.impressions * progress),
        interactions: Math.floor(targetChannels.interactions * progress),
        results: Math.floor(targetChannels.results * progress),
        cpaReal: Number((targetChannels.cpaReal * progress).toFixed(2)),
        totalCost: Number((targetChannels.totalCost * progress).toFixed(2)),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedMetrics(targetMetrics)
        setAnimatedChannels(targetChannels)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, dateRange])

  return (
    <div ref={sectionRef} className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === "overview" ? "text-[#427cdb]" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Visão Geral
            {activeTab === "overview" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#427cdb]" />}
          </button>
          <button
            onClick={() => setActiveTab("channels")}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === "channels" ? "text-[#427cdb]" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Performance do Canal
            {activeTab === "channels" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#427cdb]" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-lg border border-border p-1">
            <Button
              variant={dateRange === "7days" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange("7days")}
              className={cn(dateRange === "7days" && "bg-[#427cdb] hover:bg-[#427cdb]/90")}
            >
              7 dias
            </Button>
            <Button
              variant={dateRange === "30days" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange("30days")}
              className={cn(dateRange === "30days" && "bg-[#427cdb] hover:bg-[#427cdb]/90")}
            >
              30 dias
            </Button>
          </div>

          <Button
            variant={showComparison ? "default" : "outline"}
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className={cn(showComparison && "bg-[#edad15] hover:bg-[#edad15]/90 text-black")}
          >
            {showComparison ? "Comparação Ativa" : "Ver Comparação"}
          </Button>
        </div>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Main Metrics Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Clicks Card */}
            <div
              className="relative overflow-hidden rounded-lg bg-[#427cdb] p-6 text-white shadow-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="h-5 w-5" />
                <span className="text-sm font-medium">Cliques</span>
              </div>
              <div className="font-bold text-2xl">{animatedMetrics.clicks.toLocaleString("pt-BR")}</div>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+127% vs. período anterior</span>
              </div>
            </div>

            {/* Conversions Card */}
            <div
              className="relative overflow-hidden rounded-lg bg-[#dc4a3d] p-6 text-white shadow-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.1s",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium text-center text-sm mx-0 mr-0 ml-0">Conversões</span>
              </div>
              <div className="text-4xl font-bold">{animatedMetrics.conversions.toLocaleString("pt-BR")}</div>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+189% vs. período anterior</span>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              className="rounded-lg border-2 border-border bg-background p-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.2s",
              }}
            >
              <div className="text-sm text-muted-foreground mb-1">CPC médio</div>
              <div className="font-bold text-foreground text-lg">
                R$ {animatedMetrics.cpc.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-green-600 mt-1">-47% vs. antes</div>
            </div>

            <div
              className="rounded-lg border-2 border-border bg-background p-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.3s",
              }}
            >
              <div className="text-sm text-muted-foreground mb-1">Investimento</div>
              <div className="font-bold text-foreground text-xs">
                R$ {animatedMetrics.cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Últimos {dateRange === "7days" ? "7" : "30"} dias
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border-2 border-border bg-background p-4 md:p-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.4s",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-foreground">
                  Performance - Últimos {dateRange === "7days" ? "7" : "30"} dias
                </div>
                {showComparison && (
                  <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
                    Comparação: Com estratégia pmaxAI vs. Período anterior
                  </div>
                )}
              </div>
            </div>

            {showComparison ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Clicks Comparison */}
                <div>
                  <div className="text-[10px] md:text-xs font-medium text-muted-foreground mb-2">Cliques</div>
                  <ChartContainer
                    config={{
                      after: { label: "Com pmaxAI", color: "#427cdb" },
                      before: { label: "Antes", color: "#94a3b8" },
                    }}
                    className="h-[150px] md:h-[170px]"
                  >
                    <AreaChart data={afterData.map((item, i) => ({ ...item, beforeClicks: beforeData[i].clicks }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="beforeClicks"
                        stackId="1"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        fillOpacity={0.3}
                        name="Antes"
                      />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stackId="2"
                        stroke="#427cdb"
                        fill="#427cdb"
                        fillOpacity={0.6}
                        name="Com pmaxAI"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>

                {/* Conversions Comparison */}
                <div>
                  <div className="text-[10px] md:text-xs font-medium text-muted-foreground mb-2">Conversões</div>
                  <ChartContainer
                    config={{
                      after: { label: "Com pmaxAI", color: "#dc4a3d" },
                      before: { label: "Antes", color: "#94a3b8" },
                    }}
                    className="h-[150px] md:h-[170px]"
                  >
                    <BarChart
                      data={afterData.map((item, i) => ({ ...item, beforeConversions: beforeData[i].conversions }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="beforeConversions" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Antes" />
                      <Bar dataKey="conversions" fill="#dc4a3d" radius={[4, 4, 0, 0]} name="Com pmaxAI" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            ) : (
              <ChartContainer
                config={{
                  clicks: { label: "Cliques", color: "#427cdb" },
                  conversions: { label: "Conversões", color: "#dc4a3d" },
                }}
                className="h-[220px] md:h-[255px]"
              >
                <AreaChart data={afterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="clicks" stroke="#427cdb" fill="#427cdb" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="conversions" stroke="#dc4a3d" fill="#dc4a3d" fillOpacity={0.6} />
                </AreaChart>
              </ChartContainer>
            )}
          </div>

          {/* Channel Performance */}
          <div
            className="mt-6 rounded-lg border-2 border-border bg-background p-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.6s",
            }}
          >
            <div className="mb-4 text-sm font-medium text-muted-foreground">Performance por canal</div>
            <div className="space-y-3">
              {[
                { name: "Rede de Pesquisa", percentage: 45, color: "#427cdb" },
                { name: "Display", percentage: 25, color: "#34A853" },
                { name: "Shopping", percentage: 20, color: "#FBBC04" },
                { name: "YouTube", percentage: 10, color: "#EA4335" },
              ].map((channel, index) => (
                <div key={channel.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{channel.name}</span>
                    <span className="text-sm font-medium text-foreground">{channel.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${channel.percentage}%` : "0%",
                        backgroundColor: channel.color,
                        transitionDelay: `${0.8 + index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div
              className="rounded-lg border-2 border-border bg-background p-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out",
              }}
            >
              <div className="text-[10px] md:text-xs text-muted-foreground mb-1">CPA real</div>
              <div className="text-lg md:text-2xl font-bold text-foreground">
                R$ {animatedChannels.cpaReal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div
              className="rounded-lg border-2 border-border bg-background p-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.1s",
              }}
            >
              <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Interações</div>
              <div className="text-lg md:text-2xl font-bold text-foreground">
                {animatedChannels.interactions.toLocaleString("pt-BR")}
              </div>
            </div>
            <div
              className="rounded-lg border-2 border-border bg-background p-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.2s",
              }}
            >
              <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Conversões</div>
              <div className="text-lg md:text-2xl font-bold text-foreground">
                {animatedChannels.results.toLocaleString("pt-BR")}
              </div>
            </div>
            <div
              className="rounded-lg border-2 border-border bg-background p-3"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease-out 0.3s",
              }}
            >
              <div className="text-[10px] md:text-xs text-muted-foreground mb-1">Custo</div>
              <div className="text-lg md:text-2xl font-bold text-foreground">
                R$ {animatedChannels.totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Channel Breakdown */}
          <div
            className="rounded-lg border-2 border-border bg-background p-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.4s",
            }}
          >
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-1">De onde vêm suas conversões</h3>
              <p className="text-xs text-muted-foreground">
                Veja como os anúncios estão alcançando suas metas em vários canais
              </p>
            </div>

            {/* Funnel Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <div className="font-bold text-foreground mb-1 text-base">
                  {animatedChannels.impressions.toLocaleString("pt-BR")}
                </div>
                <div className="text-xs text-muted-foreground">Impressões</div>
              </div>
              <div>
                <div className="font-bold text-foreground mb-1 text-base">
                  {animatedChannels.interactions.toLocaleString("pt-BR")}
                </div>
                <div className="text-xs text-muted-foreground">Interações</div>
                <div className="text-xs text-muted-foreground">Cliques</div>
              </div>
              <div>
                <div className="font-bold text-foreground mb-1 text-base">
                  {animatedChannels.results.toLocaleString("pt-BR")}
                </div>
                <div className="text-xs text-muted-foreground">Resultados</div>
              </div>
            </div>

            {/* Channel Performance Bars */}
            <div className="space-y-4">
              {[
                { name: "Discover", results: 107, whatsappClicks: 89, share: 12.0, color: "#EA4335" },
                { name: "Display", results: 71, whatsappClicks: 58, share: 8.0, color: "#9C27B0" },
                { name: "Rede de Pesquisa", results: 401, whatsappClicks: 356, share: 45.0, color: "#427cdb" },
                { name: "Maps", results: 89, whatsappClicks: 74, share: 10.0, color: "#9C27B0" },
                { name: "YouTube", results: 224, whatsappClicks: 198, share: 25.0, color: "#EA4335" },
              ].map((channel, index) => (
                <div key={channel.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{channel.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Resultados: </span>
                      <span className="font-medium text-foreground">{channel.results.toLocaleString("pt-BR")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Click no botão de WAPP: </span>
                      <span className="font-medium text-foreground">
                        {channel.whatsappClicks.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${channel.share}%` : "0%",
                        backgroundColor: channel.color,
                        transitionDelay: `${0.6 + index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
