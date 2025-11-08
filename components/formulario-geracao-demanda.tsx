"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ChevronRight,
  Loader2,
  ArrowUp,
  Copy,
  Check,
  Sparkles,
  Youtube,
  Mail,
  ImageIcon,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  nomeCampanha: string
  metaCampanha: "conversoes" | "cliques" | "valor-conversao"
  idiomas: string[]
  canais: "todos" | "escolher"
  incluirDisplay: boolean
  canaisEscolhidos: string[]
  publicoAlvo: string
  segmentacaoOtimizada: boolean
  nomeGrupoAnuncios: string
  tipoAnuncio: "grafico-unico" | "video" | "carrossel"
  nomeAnuncio: string
  urlFinal: string
  produtosServicos: string
  informacoesAdicionais: string
}

interface CampanhaGeradaDemanda {
  titulos: string[]
  descricoes: string[]
  canaisSugeridos: {
    canal: string
    descricao: string
    exemplo: string
  }[]
}

const etapasNavegacao = [
  { id: 1, nome: "Campanha", icone: "📋" },
  { id: 2, nome: "Grupo de Anúncios", icone: "📁" },
  { id: 3, nome: "Anúncio", icone: "🎨" },
  { id: 4, nome: "Revisar", icone: "✓" },
]

export function FormularioGeracaoDemanda({
  userId,
  objetivo,
}: {
  userId: string
  objetivo: "vendas" | "leads" | "trafego"
}) {
  const [etapa, setEtapa] = useState(1)
  const [loading, setLoading] = useState(false)
  const [campanhaGerada, setCampanhaGerada] = useState<CampanhaGeradaDemanda | null>(null)
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const [formData, setFormData] = useState<FormData>({
    nomeCampanha: `Geração de demanda – ${new Date().toLocaleDateString("pt-BR")}`,
    metaCampanha: "conversoes",
    idiomas: ["Português (Brasil)"],
    canais: "todos",
    incluirDisplay: false,
    canaisEscolhidos: [],
    publicoAlvo: "",
    segmentacaoOtimizada: true,
    nomeGrupoAnuncios: "Grupo de anúncios 1",
    tipoAnuncio: "grafico-unico",
    nomeAnuncio: "Anúncio 1",
    urlFinal: "",
    produtosServicos: "",
    informacoesAdicionais: "",
  })

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItems((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setCopiedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 2000)
  }

  const handleGerarCampanha = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/gerar-campanha-demanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, objetivo }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setCampanhaGerada(data)
      setEtapa(4)
    } catch (error) {
      console.error("[v0] Erro ao gerar campanha:", error)
      alert("Erro ao gerar campanha. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex gap-6">
      {/* Menu Lateral Desktop */}
      <aside className="hidden lg:block w-64 shrink-0">
        <Card className="sticky top-6">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Geração de demanda</p>
                </div>
              </div>

              {etapa >= 2 && (
                <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                    <LayoutGrid className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{formData.nomeGrupoAnuncios}</p>
                  </div>
                </div>
              )}

              {etapa >= 3 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border-l-2 border-primary ml-4">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{formData.nomeAnuncio}</p>
                  </div>
                </div>
              )}

              {etapa === 4 && (
                <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer mt-4 border-t pt-4">
                  <Check className="h-4 w-4 text-primary" />
                  <p className="text-sm">Analisar campanha</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Barra de Progresso Mobile */}
      <div className="lg:hidden fixed top-16 left-0 bottom-0 bg-background border-r z-10 w-16 flex flex-col items-center py-4 gap-3">
        {etapasNavegacao.map((e) => (
          <div
            key={e.id}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              etapa >= e.id ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center text-base font-medium transition-all",
                etapa >= e.id ? "bg-primary text-primary-foreground" : "bg-muted",
                etapa === e.id && "ring-2 ring-primary ring-offset-2",
              )}
            >
              {e.icone}
            </div>
          </div>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-6 lg:mt-0 lg:ml-0 ml-16 pl-4">
        {/* Etapa 1: Configurações da Campanha */}
        {etapa === 1 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Nome da campanha</h2>
                <Input
                  value={formData.nomeCampanha}
                  onChange={(e) => setFormData({ ...formData, nomeCampanha: e.target.value })}
                  maxLength={256}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.nomeCampanha.length} / 256</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Meta da campanha</h2>
                <RadioGroup
                  value={formData.metaCampanha}
                  onValueChange={(value: any) => setFormData({ ...formData, metaCampanha: value })}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <label
                    className={cn(
                      "flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all",
                      formData.metaCampanha === "conversoes" ? "border-primary bg-primary/5" : "border-border",
                    )}
                  >
                    <RadioGroupItem value="conversoes" className="sr-only" />
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                          {formData.metaCampanha === "conversoes" && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">Conversões</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Gere mais vendas ou outras ações de conversão com seus públicos-alvo usando uma estratégia de
                          lances com base em conversões
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all",
                      formData.metaCampanha === "cliques" ? "border-primary bg-primary/5" : "border-border",
                    )}
                  >
                    <RadioGroupItem value="cliques" className="sr-only" />
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                          {formData.metaCampanha === "cliques" && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">Cliques</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Gere mais tráfego ou engajamento com seus anúncios usando uma estratégia de lances com base no
                          custo por clique
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all",
                      formData.metaCampanha === "valor-conversao" ? "border-primary bg-primary/5" : "border-border",
                    )}
                  >
                    <RadioGroupItem value="valor-conversao" className="sr-only" />
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                          {formData.metaCampanha === "valor-conversao" && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">Valor da conversão</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Gere mais vendas ou outras ações de conversão para obter o maior valor ou um valor definido
                        </p>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Idiomas</h2>
                <p className="text-sm text-muted-foreground mb-3">Selecione os idiomas que seus clientes falam.</p>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-sm">Português (Brasil)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold">Canais</h2>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">BETA</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Escolha quais canais podem veicular seu grupo de anúncios
                </p>

                <RadioGroup
                  value={formData.canais}
                  onValueChange={(value: any) => setFormData({ ...formData, canais: value })}
                  className="space-y-4"
                >
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                    <RadioGroupItem value="todos" />
                    <div className="flex-1">
                      <p className="font-medium">Todos os canais do Google</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Para maximizar a performance da campanha, seu anúncio será veiculado em todos os canais
                        qualificados do Google
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Checkbox
                          checked={formData.incluirDisplay}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, incluirDisplay: checked as boolean })
                          }
                        />
                        <Label className="text-sm">Incluir a Rede de Display do Google</Label>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                    <RadioGroupItem value="escolher" />
                    <div className="flex-1">
                      <p className="font-medium">Quero escolher</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Seu anúncio será exibido apenas nos canais qualificados de sua escolha
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Público-alvo</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Os públicos-alvo permitem alcançar pessoas com base em quem elas são, nos interesses e hábitos delas,
                  no que estão pesquisando ativamente ou em como elas interagiram com sua empresa ou organização.
                </p>
                <Textarea
                  placeholder="Descreva seu público-alvo ideal..."
                  value={formData.publicoAlvo}
                  onChange={(e) => setFormData({ ...formData, publicoAlvo: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Segmentação otimizada</h2>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={formData.segmentacaoOtimizada}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, segmentacaoOtimizada: checked as boolean })
                      }
                    />
                    <div className="flex-1">
                      <Label className="font-medium">Usar a segmentação otimizada</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Com a segmentação otimizada, você gera mais conversões sem exceder o orçamento. O Google pode
                        encontrar outras pessoas, além do seu público-alvo selecionado.
                      </p>
                      {formData.segmentacaoOtimizada && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            Os anúncios geram, em média, 20% mais conversões quando usam a segmentação otimizada
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setEtapa(2)} size="lg">
                  Continuar
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Etapa 2: Grupo de Anúncios */}
        {etapa === 2 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Nome do grupo de anúncios</h2>
                <Input
                  value={formData.nomeGrupoAnuncios}
                  onChange={(e) => setFormData({ ...formData, nomeGrupoAnuncios: e.target.value })}
                  maxLength={255}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Descreva seus produtos ou serviços</h2>
                <Textarea
                  placeholder="Ex: Vendemos equipamentos de tecnologia para empresas..."
                  value={formData.produtosServicos}
                  onChange={(e) => setFormData({ ...formData, produtosServicos: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setEtapa(1)}>
                  Voltar
                </Button>
                <Button onClick={() => setEtapa(3)} disabled={!formData.produtosServicos} className="flex-1">
                  Continuar
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Etapa 3: Anúncio */}
        {etapa === 3 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Escolha o tipo de anúncio a ser criado</h2>
                <RadioGroup
                  value={formData.tipoAnuncio}
                  onValueChange={(value: any) => setFormData({ ...formData, tipoAnuncio: value })}
                  className="space-y-3"
                >
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                    <RadioGroupItem value="grafico-unico" />
                    <div>
                      <p className="font-medium">Anúncio gráfico único</p>
                      <p className="text-sm text-muted-foreground">Veicular anúncios com uma única imagem</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                    <RadioGroupItem value="video" />
                    <div>
                      <p className="font-medium">Anúncio em vídeo</p>
                      <p className="text-sm text-muted-foreground">Veicular anúncios com um único vídeo</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary">
                    <RadioGroupItem value="carrossel" />
                    <div>
                      <p className="font-medium">Anúncio gráfico de carrossel</p>
                      <p className="text-sm text-muted-foreground">
                        Veicular anúncios com várias imagens em um carrossel
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Nome do anúncio</h2>
                <Input
                  value={formData.nomeAnuncio}
                  onChange={(e) => setFormData({ ...formData, nomeAnuncio: e.target.value })}
                  maxLength={255}
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.nomeAnuncio.length} / 255</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">URL final</h2>
                <div className="flex gap-2">
                  <div className="w-24">
                    <Input value="https://" disabled className="bg-muted" />
                  </div>
                  <Input
                    placeholder="exemplo.com.br"
                    value={formData.urlFinal}
                    onChange={(e) => setFormData({ ...formData, urlFinal: e.target.value })}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-red-600 mt-1">Obrigatório</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Informações adicionais (opcional)</h2>
                <Textarea
                  placeholder="Ex: Temos promoções especiais, oferecemos frete grátis..."
                  value={formData.informacoesAdicionais}
                  onChange={(e) => setFormData({ ...formData, informacoesAdicionais: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setEtapa(2)}>
                  Voltar
                </Button>
                <Button onClick={handleGerarCampanha} disabled={loading || !formData.urlFinal} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando campanha...
                    </>
                  ) : (
                    <>
                      Gerar Campanha
                      <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Etapa 4: Campanha Gerada */}
        {etapa === 4 && campanhaGerada && (
          <div className="space-y-6">
            {/* Canais Sugeridos */}
            {campanhaGerada.canaisSugeridos && campanhaGerada.canaisSugeridos.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Canais Recomendados</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Com base no seu nicho, recomendamos focar nestes canais do Google:
                  </p>
                  <div className="space-y-4">
                    {campanhaGerada.canaisSugeridos.map((canal, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            {canal.canal.includes("YouTube") && <Youtube className="h-5 w-5 text-primary" />}
                            {canal.canal.includes("Gmail") && <Mail className="h-5 w-5 text-primary" />}
                            {canal.canal.includes("Display") && <ImageIcon className="h-5 w-5 text-primary" />}
                            {canal.canal.includes("Discover") && <Sparkles className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{canal.canal}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{canal.descricao}</p>
                            <p className="text-sm">
                              <span className="font-medium">Exemplo:</span> {canal.exemplo}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Títulos */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Títulos (5 títulos - máx. 38 caracteres)</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(campanhaGerada.titulos.join("\n"), "titulos-all")}
                  >
                    {copiedItems.has("titulos-all") ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copiar Todos
                  </Button>
                </div>
                <div className="space-y-2">
                  {campanhaGerada.titulos.map((titulo, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg group">
                      <span className="flex-1 text-sm">{titulo}</span>
                      <span className="text-xs text-muted-foreground">{titulo.length}/38</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(titulo, `titulo-${index}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedItems.has(`titulo-${index}`) ? (
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

            {/* Descrições */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Descrições (5 descrições - máx. 98 caracteres)</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(campanhaGerada.descricoes.join("\n"), "descricoes-all")}
                  >
                    {copiedItems.has("descricoes-all") ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copiar Todos
                  </Button>
                </div>
                <div className="space-y-2">
                  {campanhaGerada.descricoes.map((descricao, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg group">
                      <span className="flex-1 text-sm">{descricao}</span>
                      <span className="text-xs text-muted-foreground">{descricao.length}/98</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(descricao, `descricao-${index}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedItems.has(`descricao-${index}`) ? (
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

            {/* Botão Voltar ao Topo */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" onClick={scrollToTop} size="lg">
                <ArrowUp className="mr-2 h-4 w-4" />
                Voltar ao Topo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
