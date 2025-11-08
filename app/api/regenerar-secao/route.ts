import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { secao, contexto, dadosAtuais } = body

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    let prompt = ""

    switch (secao) {
      case "palavrasChave":
        prompt = `Com base no contexto da campanha abaixo, gere 25-30 palavras-chave NOVAS e diferentes das atuais.

CONTEXTO DA CAMPANHA:
${contexto}

PALAVRAS-CHAVE ATUAIS (gere palavras DIFERENTES):
${JSON.stringify(dadosAtuais)}

Retorne APENAS um array JSON no formato:
[
  {"palavra": "palavra-chave 1", "tipo": "Correspondência ampla"},
  {"palavra": "palavra-chave 2", "tipo": "Frase"},
  {"palavra": "palavra-chave 3", "tipo": "Exata"}
]

Varie os tipos de correspondência e seja estratégico.`
        break

      case "titulos":
        prompt = `Com base no contexto da campanha abaixo, gere 15 títulos NOVOS e diferentes dos atuais.

CONTEXTO DA CAMPANHA:
${contexto}

TÍTULOS ATUAIS (gere títulos DIFERENTES):
${JSON.stringify(dadosAtuais)}

Retorne APENAS um array JSON com 15 títulos de NO MÁXIMO 28 caracteres cada:
["Título 1", "Título 2", ...]

Siga as melhores práticas do Google Ads.`
        break

      case "descricoes":
        prompt = `Com base no contexto da campanha abaixo, gere 4 descrições NOVAS e diferentes das atuais.

CONTEXTO DA CAMPANHA:
${contexto}

DESCRIÇÕES ATUAIS (gere descrições DIFERENTES):
${JSON.stringify(dadosAtuais)}

Retorne APENAS um array JSON com 4 descrições de NO MÁXIMO 80 caracteres cada:
["Descrição 1", "Descrição 2", "Descrição 3", "Descrição 4"]

Inclua call-to-action, benefícios, urgência e prova social.`
        break

      case "sitelinks":
        prompt = `Com base no contexto da campanha abaixo, gere 5 sitelinks NOVOS e diferentes dos atuais.

CONTEXTO DA CAMPANHA:
${contexto}

SITELINKS ATUAIS (gere sitelinks DIFERENTES):
${JSON.stringify(dadosAtuais)}

Retorne APENAS um array JSON no formato:
[
  {
    "titulo": "Título do Sitelink",
    "descricao": "Descrição do sitelink",
    "link": "/pagina"
  }
]`
        break

      case "frasesDestaque":
        prompt = `Com base no contexto da campanha abaixo, gere 10 frases de destaque NOVAS e diferentes das atuais.

CONTEXTO DA CAMPANHA:
${contexto}

FRASES ATUAIS (gere frases DIFERENTES):
${JSON.stringify(dadosAtuais)}

Retorne APENAS um array JSON com 10 frases de destaque curtas e impactantes:
["Frase 1", "Frase 2", ...]

Seja criativo e persuasivo.`
        break

      default:
        throw new Error("Seção inválida")
    }

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error("Não foi possível extrair JSON da resposta")
    }

    const data = JSON.parse(jsonMatch[0])

    return NextResponse.json({ data })
  } catch (error) {
    console.error("[v0] Erro ao regenerar seção:", error)
    return NextResponse.json({ error: "Erro ao regenerar seção" }, { status: 500 })
  }
}
