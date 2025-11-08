"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, CheckCheck, Send } from "lucide-react"
import Image from "next/image"

interface Message {
  id: number
  sender: "customer" | "agent"
  text: string
  time: string
  status?: "sent" | "delivered" | "read"
}

export function WhatsAppDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      text: "Olá! 👋 Sou o Assistente de Performance. Como posso ajudar hoje?",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "read",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      sender: "customer",
      text: input.trim(),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({
              role: m.sender === "customer" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: userMessage.text },
          ],
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantText = ""

      const assistantId = Date.now() + 1
      const assistantMessage: Message = {
        id: assistantId,
        sender: "agent",
        text: "",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, assistantMessage])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        assistantText += chunk

        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, text: assistantText } : m)))
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "agent",
        text: "Desculpe, tive um problema. Pode tentar novamente?",
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Image
              src="/images/design-mode/LOGO%20TRANSP.png"
              alt="Agent Logo"
              width={200}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </motion.div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2">
            <div className="h-3 w-3 rounded-full bg-[#25D366] animate-pulse" />
            <span className="text-sm font-semibold text-[#25D366]">Conversa ao Vivo</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-[#25D366]">Conversa por Voz:</span>
            <br />
            <span className="text-foreground">um novo espaço para conversar: Teste aqui </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como nosso Agent qualifica leads automaticamente, responde dúvidas e agenda reuniões 24/7, enquanto sua
            equipe foca em fechar vendas.
          </p>
          <div className="space-y-3">
            {[
              "Melhores práticas para Experiência do Cliente",
              "Desenhada para o seu negócio",
              "Direto no WhatsApp",
              "Sem instalação",
              "Funciona 24/7",
              "Pré Atendimento / SDR",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]/20">
                  <Check className="h-4 w-4 text-[#25D366]" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - WhatsApp mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* WhatsApp Phone Frame */}
          <div className="relative mx-auto w-full max-w-sm">
            {/* Phone container */}
            <div className="relative rounded-[3rem] border-[14px] border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
              {/* Screen */}
              <div className="relative bg-[#ECE5DD] h-[600px] overflow-hidden flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 shadow-md">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white font-bold">
                      A
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm">Agent IA</h3>
                    <p className="text-white/80 text-xs">online</p>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm ${
                          message.sender === "customer" ? "bg-[#DCF8C6] rounded-br-none" : "bg-white rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm text-gray-800 leading-relaxed">{message.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-[10px] text-gray-500">{message.time}</span>
                          {message.sender === "customer" && (
                            <div className="text-gray-500">
                              {message.status === "read" ? (
                                <CheckCheck className="h-3 w-3 text-[#53BDEB]" />
                              ) : message.status === "delivered" ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                            className="h-2 w-2 rounded-full bg-gray-400"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-gray-400"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* WhatsApp Input Bar */}
                <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Mensagem"
                    disabled={isLoading}
                    className="flex-1 bg-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#128C7E] transition-colors"
                  >
                    <Send className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-[#25D366]/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#128C7E]/20 blur-3xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
