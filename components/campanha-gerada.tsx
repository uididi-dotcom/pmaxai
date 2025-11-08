"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Lightbulb,
  Target,
  Users,
  MapPin,
  Search,
  FileText,
  LinkIcon,
  Sparkles,
  ArrowLeft,
  Copy,
  RefreshCw,
  Check,
  ArrowUp,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export function CampanhaGerada({
  data,
  onVoltar,
  campanhaId,
}: { data: CampanhaData; onVoltar: () => void; campanhaId?: string }) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null)
  const [campanhaData, setCampanhaData] = useState(data)
  const { toast } = useToast()

  const copyToClipboard = async (text: string, itemName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemName)
      toast({
        title: "Copiado!",
        description: `${itemName} copiado para a área de transferência.`,
      })
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar.",
        variant: "destructive",
      })
    }
  }

  const regenerarSecao = async (secao: string) => {
    setRegeneratingSection(secao)
    try {
      const contexto = `Tipo: ${campanhaData.configuracoes}, Objetivo: ${campanhaData.lances.metrica}`
      const dadosAtuais = (campanhaData as any)[secao]

      const response = await fetch("/api/regenerar-secao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secao, contexto, dadosAtuais }),
      })

      const result = await response.json()

      if (result.error) throw new Error(result.error)

      setCampanhaData({
        ...campanhaData,
        [secao]: result.data,
      })

      toast({
        title: "Sucesso!",
        description: "Seção regenerada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível regenerar a seção.",
        variant: "destructive",
      })
    } finally {
      setRegeneratingSection(null)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Campanha Gerada</h2>
        <Button onClick={onVoltar} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Dashboard
        </Button>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Insights e Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {campanhaData.insights.map((insight, index) => (
              <li key={index} className="flex gap-2">
                <Sparkles className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Lances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Estratégia de Lances
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-1">Métrica Recomendada:</p>
            <Badge variant="secondary" className="text-base">
              {campanhaData.lances.metrica}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Por quê?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{campanhaData.lances.justificativa}</p>
          </div>
        </CardContent>
      </Card>

      {/* Aquisição do Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Aquisição do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{campanhaData.aquisicaoCliente}</p>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            Configurações da Campanha
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Redes:</p>
            <div className="flex flex-wrap gap-2">
              {campanhaData.configuracoes.redes.map((rede, index) => (
                <Badge key={index} variant="outline">
                  {rede}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Locais:</p>
            <div className="flex flex-wrap gap-2">
              {campanhaData.configuracoes.locais.map((local, index) => (
                <Badge key={index} variant="outline">
                  {local}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segmentos de Público */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Segmentos de Público-Alvo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Demográficos:</p>
            <div className="flex flex-wrap gap-2">
              {campanhaData.segmentosPublico.demograficos.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-2">Interesses:</p>
            <div className="flex flex-wrap gap-2">
              {campanhaData.segmentosPublico.interesses.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-2">Comportamentos:</p>
            <div className="flex flex-wrap gap-2">
              {campanhaData.segmentosPublico.comportamentos.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-2">Intenção de Compra:</p>
            <div className="flex flex-wrap gap-2">
              {campanhaData.segmentosPublico.intencao.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuração de Segmentação */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração de Segmentação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm font-medium">Tipo:</p>
            <Badge className="mt-1">{campanhaData.configuracaoSegmentacao.tipo}</Badge>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Descrição:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {campanhaData.configuracaoSegmentacao.descricao}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Palavras-chave */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-orange-500" />
              Palavras-chave ({campanhaData.palavrasChave.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const texto = campanhaData.palavrasChave.map((p) => `${p.palavra} (${p.tipo})`).join("\n")
                  copyToClipboard(texto, "Palavras-chave")
                }}
              >
                {copiedItem === "Palavras-chave" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => regenerarSecao("palavrasChave")}
                disabled={regeneratingSection === "palavrasChave"}
              >
                {regeneratingSection === "palavrasChave" ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {campanhaData.palavrasChave.map((palavra, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{palavra.palavra}</span>
                <Badge variant="outline" className="text-xs">
                  {palavra.tipo}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Caminho de Exibição */}
      <Card>
        <CardHeader>
          <CardTitle>Caminho de Exibição</CardTitle>
        </CardHeader>
        <CardContent>
          <code className="text-sm bg-muted px-3 py-2 rounded block">{campanhaData.caminhoExibicao}</code>
        </CardContent>
      </Card>

      {/* Frases de Destaque */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Frases de Destaque (10 frases)
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(campanhaData.frasesDestaque.join("\n"), "Frases de Destaque")}
            >
              {copiedItem === "Frases de Destaque" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {campanhaData.frasesDestaque.map((frase, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{frase}</span>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(frase, `Frase ${index + 1}`)}>
                  {copiedItem === `Frase ${index + 1}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sitelinks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-cyan-500" />
              Sitelinks (5 sitelinks)
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const texto = campanhaData.sitelinks.map((s) => `${s.titulo}\n${s.descricao}\n${s.link}`).join("\n\n")
                  copyToClipboard(texto, "Sitelinks")
                }}
              >
                {copiedItem === "Sitelinks" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => regenerarSecao("sitelinks")}
                disabled={regeneratingSection === "sitelinks"}
              >
                {regeneratingSection === "sitelinks" ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {campanhaData.sitelinks.map((sitelink, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <p className="font-medium text-sm">{sitelink.titulo}</p>
                    <p className="text-sm text-muted-foreground">{sitelink.descricao}</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded block">{sitelink.link}</code>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(
                        `${sitelink.titulo}\n${sitelink.descricao}\n${sitelink.link}`,
                        `Sitelink ${index + 1}`,
                      )
                    }
                  >
                    {copiedItem === `Sitelink ${index + 1}` ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Descrições */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Descrições (4 descrições - máx. 80 caracteres)</CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(campanhaData.descricoes.join("\n"), "Descrições")}
              >
                {copiedItem === "Descrições" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => regenerarSecao("descricoes")}
                disabled={regeneratingSection === "descricoes"}
              >
                {regeneratingSection === "descricoes" ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {campanhaData.descricoes.map((descricao, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-sm">{descricao}</span>
                  <Badge variant={descricao.length <= 80 ? "default" : "destructive"} className="text-xs self-start">
                    {descricao.length}/80
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(descricao, `Descrição ${index + 1}`)}>
                  {copiedItem === `Descrição ${index + 1}` ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Títulos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-500" />
              Títulos (15 títulos - máx. 28 caracteres)
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(campanhaData.titulos.join("\n"), "Títulos")}
              >
                {copiedItem === "Títulos" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => regenerarSecao("titulos")}
                disabled={regeneratingSection === "titulos"}
              >
                {regeneratingSection === "titulos" ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {campanhaData.titulos.map((titulo, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium">{titulo}</span>
                  <Badge variant={titulo.length <= 28 ? "default" : "destructive"} className="text-xs">
                    {titulo.length}/28
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" onClick={() => copyToClipboard(titulo, `Título ${index + 1}`)}>
                  {copiedItem === `Título ${index + 1}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Snippets Estruturados */}
      <Card>
        <CardHeader>
          <CardTitle>Snippets Estruturados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campanhaData.snippetsEstruturados.map((snippet, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm font-medium">{snippet.tipo}:</p>
                <div className="flex flex-wrap gap-2">
                  {snippet.valores.map((valor, vIndex) => (
                    <Badge key={vIndex} variant="outline">
                      {valor}
                    </Badge>
                  ))}
                </div>
                {index < campanhaData.snippetsEstruturados.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botão Voltar ao Topo */}
      <div className="flex justify-center pt-8 pb-4">
        <Button onClick={scrollToTop} variant="outline" size="lg">
          <ArrowUp className="mr-2 h-4 w-4" />
          Voltar ao Topo
        </Button>
      </div>
    </div>
  )
}
