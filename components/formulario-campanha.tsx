"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tag,
  Users,
  TrendingUp,
  Smartphone,
  Volume2,
  MapPin,
  Settings,
  Search,
  Maximize,
  Video,
  ShoppingBag,
  Monitor,
  Loader2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { CampanhaGerada } from "@/components/campanha-gerada"
import { FormularioGeracaoDemanda } from "@/components/formulario-geracao-demanda"

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

const tiposCampanha = [
  {
    id: "pesquisa",
    nome: "Pesquisar",
    descricao: "Gere leads na Pesquisa Google com os anúncios de texto",
    icon: Search,
  },
  {
    id: "performance-max",
    nome: "Performance Max",
    descricao:
      "Para gerar leads, alcance as pessoas certas, onde quer que elas estejam navegando, com anúncios na Pesquisa Google, no YouTube, na Rede de Display e muito mais",
    icon: Maximize,
  },
  {
    id: "geracao-demanda",
    nome: "Geração de demanda",
    descricao:
      "Gere demanda e conversões no YouTube, na Rede de Display do Google e em outras plataformas com anúncios gráficos e em vídeo",
    icon: TrendingUp,
  },
  {
    id: "video",
    nome: "Vídeo",
    descricao: "Gere leads no YouTube com seus anúncios em vídeo",
    icon: Video,
  },
  {
    id: "rede-display",
    nome: "Rede de Display",
    descricao: "Alcance clientes em potencial em 3 milhões de sites e apps com seu criativo",
    icon: Monitor,
  },
  {
    id: "shopping",
    nome: "Shopping",
    descricao: "Promova seus produtos do Merchant Center na Pesquisa Google com anúncios do Shopping",
    icon: ShoppingBag,
  },
]

const objetivos = [
  {
    id: "vendas",
    nome: "Vendas",
    descricao: "Gerar vendas on-line, no aplicativo, por telefone ou na loja",
    icon: Tag,
  },
  {
    id: "leads",
    nome: "Leads",
    descricao: "Incentivar clientes a realizar ações para gerar leads e outras conversões",
    icon: Users,
  },
  {
    id: "trafego",
    nome: "Tráfego do site",
    descricao: "Fazer com que as pessoas certas acessem seu site",
    icon: TrendingUp,
  },
  {
    id: "app",
    nome: "Promoção de app",
    descricao: "Gerar mais instalações, engajamentos e pré-registros para seu app",
    icon: Smartphone,
  },
  {
    id: "reconhecimento",
    nome: "Reconhecimento e consideração",
    descricao: "Alcance um público-alvo amplo e gere interesse nos seus produtos ou marca",
    icon: Volume2,
  },
  {
    id: "lojas-locais",
    nome: "Visitas a lojas locais e promoções",
    descricao: "Impulsionar visitas a lojas locais, incluindo restaurantes e concessionárias",
    icon: MapPin,
  },
  {
    id: "sem-orientacao",
    nome: "Criar uma campanha sem orientação",
    descricao: "Em seguida, escolha uma campanha",
    icon: Settings,
  },
]

export function FormularioCampanha({ userId }: { userId: string }) {
  const [etapa, setEtapa] = useState(1)
  const [loading, setLoading] = useState(false)
  const [campanhaGerada, setCampanhaGerada] = useState<CampanhaData | null>(null)
  const router = useRouter()

  // Dados do formulário
  const [tipoCampanha, setTipoCampanha] = useState("")
  const [objetivo, setObjetivo] = useState("")
  const [urlFinal, setUrlFinal] = useState("")
  const [produtosServicos, setProdutosServicos] = useState("")
  const [publicoAlvo, setPublicoAlvo] = useState("")
  const [orcamento, setOrcamento] = useState("")
  const [localizacao, setLocalizacao] = useState("Brasil")
  const [informacoesAdicionais, setInformacoesAdicionais] = useState("")

  const handleTipoCampanhaSelect = (tipo: string) => {
    setTipoCampanha(tipo)
    setEtapa(2)
  }

  const handleObjetivoSelect = (obj: string) => {
    setObjetivo(obj)
    if (tipoCampanha === "geracao-demanda" && ["vendas", "leads", "trafego"].includes(obj)) {
      setEtapa(99) // Etapa especial para Geração de Demanda
    } else {
      setEtapa(3)
    }
  }

  const handleGerarCampanha = async () => {
    setLoading(true)

    try {
      const conversationData = `
Tipo de campanha: ${tipoCampanha}
Objetivo: ${objetivo}
URL do site: ${urlFinal}
Produtos/Serviços: ${produtosServicos}
Público-alvo: ${publicoAlvo}
Orçamento: ${orcamento}
Localização: ${localizacao}
Informações adicionais: ${informacoesAdicionais}
      `.trim()

      const response = await fetch("/api/gerar-campanha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationData }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setCampanhaGerada(data)

      const supabase = createClient()
      const { data: campanhaInserida, error } = await supabase
        .from("campanhas")
        .insert({
          user_id: userId,
          nome: `Campanha ${new Date().toLocaleDateString("pt-BR")}`,
          objetivo: objetivo,
          tipo_campanha: tipoCampanha,
          url_final: urlFinal,
          produtos_servicos: produtosServicos,
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
        .select()

      if (error) throw error

      console.log("[v0] Campanha salva com ID:", campanhaInserida?.[0]?.id)
    } catch (error) {
      console.error("[v0] Erro ao gerar campanha:", error)
      alert("Erro ao gerar campanha. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (campanhaGerada) {
    return <CampanhaGerada data={campanhaGerada} onVoltar={() => router.push("/dashboard")} />
  }

  return (
    <div className="space-y-6">
      {/* Etapa 1: Tipo de Campanha */}
      {etapa === 1 && (
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Selecione um tipo de campanha</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tiposCampanha.map((tipo) => {
                const Icon = tipo.icon
                return (
                  <button
                    key={tipo.id}
                    onClick={() => handleTipoCampanhaSelect(tipo.id)}
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:border-primary hover:shadow-md ${
                      tipoCampanha === tipo.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{tipo.nome}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tipo.descricao}</p>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 2: Objetivo */}
      {etapa === 2 && (
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Qual é o objetivo da sua campanha?</h2>
            <p className="text-muted-foreground mb-6">
              Escolha um objetivo para personalizar a experiência de acordo com as metas e configurações mais adequadas
              para sua campanha
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {objetivos.map((obj) => {
                const Icon = obj.icon
                return (
                  <button
                    key={obj.id}
                    onClick={() => handleObjetivoSelect(obj.id)}
                    className={`p-6 border-2 rounded-lg text-left transition-all hover:border-primary hover:shadow-md ${
                      objetivo === obj.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{obj.nome}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.descricao}</p>
                  </button>
                )
              })}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setEtapa(1)}>
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 99: Fluxo Geração de Demanda */}
      {etapa === 99 && tipoCampanha === "geracao-demanda" && (
        <FormularioGeracaoDemanda userId={userId} objetivo={objetivo as any} />
      )}

      {/* Etapa 3: Informações da Campanha (fluxo padrão) */}
      {etapa === 3 && (
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Informações da campanha</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url">URL do seu site *</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://exemplo.com.br"
                  value={urlFinal}
                  onChange={(e) => setUrlFinal(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="produtos">Descreva seus produtos ou serviços *</Label>
                <Textarea
                  id="produtos"
                  placeholder="Ex: Vendemos equipamentos de tecnologia para empresas, incluindo computadores, notebooks e acessórios"
                  value={produtosServicos}
                  onChange={(e) => setProdutosServicos(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publico">Quem é seu público-alvo? *</Label>
                <Textarea
                  id="publico"
                  placeholder="Ex: Empresas de médio porte, gestores de TI, profissionais de tecnologia entre 25-45 anos"
                  value={publicoAlvo}
                  onChange={(e) => setPublicoAlvo(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orcamento">Orçamento mensal aproximado *</Label>
                <Input
                  id="orcamento"
                  placeholder="Ex: R$ 5.000,00"
                  value={orcamento}
                  onChange={(e) => setOrcamento(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="localizacao">Localização geográfica *</Label>
                <Input
                  id="localizacao"
                  placeholder="Ex: Brasil, São Paulo, Rio de Janeiro"
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adicionais">Informações adicionais (opcional)</Label>
                <Textarea
                  id="adicionais"
                  placeholder="Ex: Temos promoções especiais, oferecemos frete grátis, atendimento 24h..."
                  value={informacoesAdicionais}
                  onChange={(e) => setInformacoesAdicionais(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setEtapa(2)}>
                  Voltar
                </Button>
                <Button
                  onClick={handleGerarCampanha}
                  disabled={loading || !urlFinal || !produtosServicos || !publicoAlvo || !orcamento}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando campanha...
                    </>
                  ) : (
                    "Gerar Campanha Completa"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
