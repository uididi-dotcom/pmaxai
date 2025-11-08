"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { CampanhaGerada } from "@/components/campanha-gerada"

interface Message {
  role: "assistant" | "user"
  content: string
}

interface CampanhaData {
  insights: string[]
  lances: {
    metrica: string
    justificativa: string
  }
  aquisicaoCliente: string
  configuracoes: {
    redes: string[]
    locais: string[]
  }
  segmentosPublico: {
    demograficos: string[]
    interesses: string[]
    comportamentos: string[]
    intencao: string[]
  }
  configuracaoSegmentacao: {
    tipo: string
    descricao: string
  }
  palavrasChave: {
    palavra: string
    tipo: string
  }[]
  caminhoExibicao: string
  titulos: string[]
  descricoes: string[]
  sitelinks: {
    titulo: string
    descricao: string
    link: string
  }[]
  frasesDestaque: string[]
  snippetsEstruturados: {
    tipo: string
    valores: string[]
  }[]
}

export function AssistenteChat({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou seu assistente de campanhas do Google Ads. Vou te ajudar a criar uma campanha otimizada. Para começar, me conte: qual é o seu negócio e o que você quer alcançar com essa campanha?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [conversationData, setConversationData] = useState<string[]>([])
  const [campanhaGerada, setCampanhaGerada] = useState<CampanhaData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")

    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setConversationData((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const allData = [...conversationData, userMessage].join(" ")

      if (conversationData.length >= 2) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Entendi! Tenho informações suficientes. Quer que eu gere a campanha completa agora? (Digite 'sim' para gerar ou continue me contando mais detalhes)",
          },
        ])
      } else {
        const questions = [
          "Ótimo! Me conte mais sobre seu público-alvo. Quem são as pessoas que você quer alcançar?",
          "Perfeito! Qual é o seu orçamento aproximado e qual resultado você espera alcançar?",
        ]

        const nextQuestion =
          questions[conversationData.length] ||
          "Tem mais alguma informação importante que você gostaria de compartilhar?"

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: nextQuestion,
          },
        ])
      }
    } catch (error) {
      console.error("[v0] Erro ao processar mensagem:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro. Pode tentar novamente?",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleGerarCampanha = async () => {
    setLoading(true)

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Perfeito! Vou gerar sua campanha completa com insights e recomendações. Isso pode levar alguns segundos...",
      },
    ])

    try {
      const response = await fetch("/api/gerar-campanha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationData: conversationData.join("\n"),
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setCampanhaGerada(data)

      const supabase = createClient()
      const { error } = await supabase.from("campanhas").insert({
        user_id: userId,
        nome: `Campanha ${new Date().toLocaleDateString("pt-BR")}`,
        objetivo: data.lances.metrica,
        tipo_campanha: "pesquisa",
        url_final: conversationData.find((d) => d.includes("http")) || "",
        produtos_servicos: conversationData[0],
        redes: { redes: data.configuracoes.redes },
        locais: { locais: data.configuracoes.locais },
        idiomas: { idiomas: ["Português"] },
        metrica_lance: data.lances.metrica,
        justificativa_lance: data.lances.justificativa,
        aquisicao_cliente: data.aquisicaoCliente,
        palavras_chave: data.palavrasChave,
        titulos: data.titulos,
        descricoes: data.descricoes,
        sitelinks: data.sitelinks,
        insights: data.insights,
        segmentos_publico: data.segmentosPublico,
        configuracao_segmentacao: data.configuracaoSegmentacao,
        caminho_exibicao: data.caminhoExibicao,
        frases_destaque: data.frasesDestaque,
        snippets_estruturados: data.snippetsEstruturados,
      })

      if (error) throw error

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Campanha gerada com sucesso! Veja abaixo todos os detalhes e insights.",
        },
      ])
    } catch (error) {
      console.error("[v0] Erro ao gerar campanha:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro ao gerar a campanha. Pode tentar novamente?",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (
      lastMessage?.role === "user" &&
      (lastMessage.content.toLowerCase().includes("sim") || lastMessage.content.toLowerCase().includes("gerar")) &&
      conversationData.length >= 2 &&
      !campanhaGerada
    ) {
      handleGerarCampanha()
    }
  }, [messages])

  return (
    <div className="space-y-6">
      {/* Chat Messages */}
      <Card>
        <CardContent className="space-y-4 p-6 max-h-[600px] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input de mensagem */}
      {!campanhaGerada && (
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Campanha Gerada */}
      {campanhaGerada && <CampanhaGerada data={campanhaGerada} onVoltar={() => router.push("/dashboard")} />}
    </div>
  )
}
