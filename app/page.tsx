"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  MessageCircle,
  Globe,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { GoogleAdsAnimation } from "@/components/google-ads-animation"
import { GoogleAdsDashboard } from "@/components/google-ads-dashboard"
import { WhatsAppDemo } from "@/components/whatsapp-demo"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${scrollY > 50 ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/pmaxai-logo.png" alt="pmaxAI" width={120} height={40} className="w-auto h-24" />
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#como-funciona" className="text-sm font-medium transition-colors hover:text-[#427cdb]">
              Como Funciona
            </Link>
            <Link href="#recursos" className="text-sm font-medium transition-colors hover:text-[#427cdb]">
              Recursos
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button size="sm" className="rounded-3xl bg-[#427cdb] hover:bg-[#dc4a3d]">
                Começar Grátis
              </Button>
            </Link>
          </div>
          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/pmaxai-logo.png" alt="pmaxAI" width={120} height={40} className="h-8 w-auto" />
              </Link>
            </div>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container mx-auto grid gap-3 pb-8 pt-6"
          >
            {["Como Funciona", "Recursos"].map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <Link
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="flex items-center justify-between rounded-3xl px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemFadeIn} className="flex flex-col gap-3 pt-4">
              <Link href="/cadastro" className="w-full">
                <Button className="w-full rounded-3xl bg-[#427cdb] hover:bg-[#dc4a3d]">Começar Grátis</Button>
              </Link>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full rounded-3xl bg-transparent">
                  Entrar
                </Button>
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-8 lg:py-3 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 border border-muted rounded-3xl bg-gradient-to-br from-background to-muted/30">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col justify-center space-y-4 py-10 text-center max-w-4xl mx-auto"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center rounded-3xl bg-muted px-4 py-2 text-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Marketing Digital com Inteligência Artificial
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-balance"
                >
                  Crie campanhas de Google Ads em{" "}
                  <span style={{ color: "#427cdb" }}>minutos</span>
                  <span className="bg-gradient-to-r from-[#427cdb] via-[#edad15] to-[#dc4a3d] bg-clip-text text-transparent"></span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="max-w-3xl mx-auto text-muted-foreground md:text-xl text-pretty"
                >
                  Nosso assistente de IA guia você passo a passo na criação de campanhas otimizadas, gerando títulos,
                  descrições e palavras-chave automaticamente.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col gap-3 sm:flex-row justify-center"
              >
                <Link href="/cadastro">
                  <Button size="lg" className="rounded-3xl group bg-[#427cdb] hover:bg-[#dc4a3d]">
                    Começar Grátis
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-3xl bg-transparent border-[#427cdb] text-[#427cdb] hover:bg-[#427cdb]/10"
                  >
                    Já tenho conta
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Google Ads Dashboard Section */}
        <section id="como-funciona" className="w-full py-12 md:py-8 lg:py-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto max-w-7xl px-4 md:px-6 border border-muted rounded-3xl bg-muted/10"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-[#427cdb]/10 px-4 py-2 text-sm"
                >
                  <TrendingUp className="inline mr-2 h-4 w-4 text-[#427cdb]" />
                  <span className="font-semibold text-[#427cdb]">Resultados Reais</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Como Funciona
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  Crie campanhas de alto desempenho em 3 passos simples com nosso assistente inteligente
                </motion.p>
              </div>
            </div>
            <div className="pb-10">
              <GoogleAdsDashboard />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-8 lg:py-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto max-w-7xl px-4 md:px-6 border border-muted rounded-3xl bg-muted/10"
          >
            <div className="py-16">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
              >
                {/* Step 1 */}
                <motion.div
                  variants={itemFadeIn}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#427cdb]/10">
                    <TrendingUp className="h-8 w-8 text-[#427cdb]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Defina seu objetivo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Escolha entre vendas, leads, tráfego ou outros objetivos para sua campanha
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  variants={itemFadeIn}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#edad15]/10">
                    <Sparkles className="h-8 w-8 text-[#edad15]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">IA gera conteúdo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nossa IA cria títulos, descrições e palavras-chave otimizadas automaticamente
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  variants={itemFadeIn}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#dc4a3d]/10">
                    <TrendingUp className="h-8 w-8 text-[#dc4a3d]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Salve e reutilize</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Mantenha suas últimas 5 campanhas salvas para consultar e reutilizar
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="recursos" className="w-full py-12 md:py-8 lg:py-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto max-w-7xl px-4 md:px-6 border border-muted rounded-3xl"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm"
                >
                  Serviços
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Recursos do pmaxAI
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  Tudo que você precisa para criar campanhas de Google Ads de alta conversão
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-6xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {/* Geração Automática */}
              <motion.div
                variants={itemFadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl border-2 p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
                <div className="relative space-y-4">
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#427cdb] text-white">
                      <Sparkles className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Geração Automática</h3>
                  <p className="text-muted-foreground">
                    Nossa IA cria automaticamente títulos persuasivos, descrições otimizadas e palavras-chave relevantes
                    para maximizar o desempenho de suas campanhas.
                  </p>
                </div>
              </motion.div>

              {/* Assistente Guiado */}
              <motion.div
                variants={itemFadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl border-2 border-[#427cdb] p-6 shadow-lg transition-all hover:shadow-xl bg-gradient-to-br from-[#427cdb]/5 to-background lg:scale-105"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#427cdb]/20 group-hover:bg-[#427cdb]/30 transition-all duration-300"></div>
                <div className="relative space-y-4">
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#edad15] text-white">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="inline-block rounded-full bg-[#edad15]/20 px-3 py-1 text-xs font-semibold text-foreground">
                    POPULAR
                  </div>
                  <h3 className="text-xl font-bold">Assistente Passo a Passo</h3>
                  <p className="text-muted-foreground">
                    Não se preocupe se é sua primeira vez. Nosso assistente guia você em cada etapa do processo,
                    desde a definição de objetivos até a finalização da campanha.
                  </p>
                  <GoogleAdsAnimation />
                </div>
              </motion.div>

              {/* Histórico de Campanhas */}
              <motion.div
                variants={itemFadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl border-2 p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
                <div className="relative space-y-4">
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#dc4a3d] text-white">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Histórico de Campanhas</h3>
                  <p className="text-muted-foreground">
                    Mantenha suas últimas 5 campanhas salvas para consultar, reutilizar e otimizar sempre que
                    precisar criar novas campanhas.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>


        {/* Contact/CTA Section */}
        <section id="contact" className="w-full py-12 md:py-8 lg:py-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container mx-auto max-w-7xl px-4 md:px-6 border border-muted rounded-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-6 py-16 text-center"
            >
              <div className="mb-6 flex justify-center">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                >
                  <Sparkles className="h-8 w-8 text-primary" />
                </motion.div>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-balance">
                  Pronto para criar sua primeira campanha?
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
                  Comece gratuitamente e veja como é fácil criar campanhas de Google Ads com IA
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Link href="/cadastro">
                  <Button size="lg" className="rounded-3xl group bg-[#427cdb] hover:bg-[#dc4a3d]">
                    Criar Conta Grátis
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-3xl bg-transparent border-[#427cdb] text-[#427cdb] hover:bg-[#427cdb]/10"
                  >
                    Já tenho conta
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4"
        >
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/pmaxai-logo.png" alt="pmaxAI" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformamos negócios com marketing digital inteligente e automação de vendas.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Produto</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#como-funciona" className="text-muted-foreground hover:text-foreground">
                Como Funciona
              </Link>
              <Link href="#recursos" className="text-muted-foreground hover:text-foreground">
                Recursos
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Conta</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/login" className="text-muted-foreground hover:text-foreground">
                Entrar
              </Link>
              <Link href="/cadastro" className="text-muted-foreground hover:text-foreground">
                Criar Conta
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Termos de Uso
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacidade
              </Link>
            </nav>
          </div>
        </motion.div>
        <div className="border-t">
          <div className="container mx-auto flex flex-col items-center justify-between gap-3 py-6 md:h-16 md:flex-row md:py-0">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} pmaxAI. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground">Designed by Caio Damas</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
