import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AdsCopilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Assistente de IA para Google Ads</span>
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl">
            Crie campanhas de Google Ads em <span className="text-primary">minutos</span>
          </h1>
          <p className="mb-8 text-balance text-xl text-muted-foreground leading-relaxed">
            Nosso assistente de IA guia você passo a passo na criação de campanhas otimizadas, gerando títulos,
            descrições e palavras-chave automaticamente.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="w-full sm:w-auto">
                <Sparkles className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Como funciona</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Defina seu objetivo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Escolha entre vendas, leads, tráfego ou outros objetivos para sua campanha
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">IA gera conteúdo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nossa IA cria títulos, descrições e palavras-chave otimizadas automaticamente
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Salve e reutilize</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mantenha suas últimas 5 campanhas salvas para consultar e reutilizar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Pronto para criar sua primeira campanha?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Comece gratuitamente e veja como é fácil criar campanhas de Google Ads com IA
          </p>
          <Link href="/cadastro">
            <Button size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 AdsCopilot. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
