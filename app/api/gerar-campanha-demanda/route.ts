import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const { formData, objetivo } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const objetivoTexto = {
      vendas: "gerar vendas e conversões",
      leads: "capturar leads qualificados",
      trafego: "aumentar o tráfego do site",
    }[objetivo]

    const prompt = `
Você é um especialista em Google Ads com foco em campanhas de Geração de Demanda.

INFORMAÇÕES DA CAMPANHA:
- Objetivo: ${objetivoTexto}
- Produtos/Serviços: ${formData.produtosServicos}
- URL: ${formData.urlFinal}
- Público-alvo: ${formData.publicoAlvo}
- Informações adicionais: ${formData.informacoesAdicionais || "Nenhuma"}

TAREFA:
Gere uma campanha de Geração de Demanda completa seguindo as melhores práticas do Google Ads.

1. CANAIS SUGERIDOS (3-4 canais):
   - Analise o nicho e sugira os melhores canais do Google (YouTube, Gmail, Discover, Display)
   - Para cada canal, explique POR QUE é relevante para este negócio
   - Dê um exemplo específico de como usar aquele canal para este nicho

2. TÍTULOS (exatamente 5 títulos):
   - Máximo 38 caracteres cada
   - Use as melhores práticas do Google Ads
   - Inclua call-to-actions fortes
   - Seja específico e relevante para o produto/serviço

3. DESCRIÇÕES (exatamente 5 descrições):
   - Máximo 98 caracteres cada
   - Destaque benefícios e diferenciais
   - Inclua urgência ou escassez quando apropriado
   - Seja persuasivo e claro

IMPORTANTE:
- Todos os textos devem estar em português do Brasil
- Respeite RIGOROSAMENTE os limites de caracteres
- Seja criativo mas profissional
- Foque em conversão

Retorne APENAS um JSON válido no seguinte formato:
{
  "canaisSugeridos": [
    {
      "canal": "Nome do Canal",
      "descricao": "Por que este canal é ideal para este negócio",
      "exemplo": "Exemplo específico de uso para este nicho"
    }
  ],
  "titulos": ["título 1", "título 2", "título 3", "título 4", "título 5"],
  "descricoes": ["descrição 1", "descrição 2", "descrição 3", "descrição 4", "descrição 5"]
}
`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    console.log("[v0] Resposta da IA:", text)

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Resposta da IA não contém JSON válido")
    }

    const campanhaData = JSON.parse(jsonMatch[0])

    // Validar limites de caracteres
    campanhaData.titulos = campanhaData.titulos.map((t: string) => t.substring(0, 38))
    campanhaData.descricoes = campanhaData.descricoes.map((d: string) => d.substring(0, 98))

    return NextResponse.json(campanhaData)
  } catch (error) {
    console.error("[v0] Erro ao gerar campanha de demanda:", error)
    return NextResponse.json({ error: "Erro ao gerar campanha" }, { status: 500 })
  }
}
