import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { conversationData } = body

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `Você é um especialista em Google Ads com anos de experiência. Com base na conversa abaixo, crie uma campanha completa e otimizada.

CONVERSA COM O CLIENTE:
${conversationData}

Gere uma campanha COMPLETA seguindo EXATAMENTE esta estrutura JSON (retorne APENAS o JSON, sem texto adicional):

{
  "insights": [
    "insight 1 sobre a campanha e oportunidades",
    "insight 2 sobre o mercado e concorrência",
    "insight 3 sobre otimizações recomendadas"
  ],
  "lances": {
    "metrica": "nome da métrica recomendada (ex: Conversões, CPA, ROAS)",
    "justificativa": "explicação detalhada de por que essa métrica é a melhor para este caso"
  },
  "aquisicaoCliente": "Sua campanha será limitada apenas a novos clientes, seja qual for sua estratégia de lances. Explicar como isso beneficia o negócio.",
  "configuracoes": {
    "redes": ["Rede de pesquisa do Google", "Rede de parceiros de pesquisa"],
    "locais": ["Brasil", "São Paulo", "Rio de Janeiro"]
  },
  "segmentosPublico": {
    "demograficos": ["Idade: 25-54 anos", "Gênero: Todos"],
    "interesses": ["interesse 1", "interesse 2", "interesse 3"],
    "comportamentos": ["comportamento 1", "comportamento 2"],
    "intencao": ["intenção de compra 1", "intenção de compra 2"]
  },
  "configuracaoSegmentacao": {
    "tipo": "Segmentação otimizada",
    "descricao": "Explicação detalhada de como a segmentação foi configurada e por quê"
  },
  "palavrasChave": [
    {"palavra": "palavra-chave 1", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 2", "tipo": "Frase"},
    {"palavra": "palavra-chave 3", "tipo": "Exata"},
    {"palavra": "palavra-chave 4", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 5", "tipo": "Frase"},
    {"palavra": "palavra-chave 6", "tipo": "Exata"},
    {"palavra": "palavra-chave 7", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 8", "tipo": "Frase"},
    {"palavra": "palavra-chave 9", "tipo": "Exata"},
    {"palavra": "palavra-chave 10", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 11", "tipo": "Frase"},
    {"palavra": "palavra-chave 12", "tipo": "Exata"},
    {"palavra": "palavra-chave 13", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 14", "tipo": "Frase"},
    {"palavra": "palavra-chave 15", "tipo": "Exata"},
    {"palavra": "palavra-chave 16", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 17", "tipo": "Frase"},
    {"palavra": "palavra-chave 18", "tipo": "Exata"},
    {"palavra": "palavra-chave 19", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 20", "tipo": "Frase"},
    {"palavra": "palavra-chave 21", "tipo": "Exata"},
    {"palavra": "palavra-chave 22", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 23", "tipo": "Frase"},
    {"palavra": "palavra-chave 24", "tipo": "Exata"},
    {"palavra": "palavra-chave 25", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 26", "tipo": "Frase"},
    {"palavra": "palavra-chave 27", "tipo": "Exata"},
    {"palavra": "palavra-chave 28", "tipo": "Correspondência ampla"},
    {"palavra": "palavra-chave 29", "tipo": "Frase"},
    {"palavra": "palavra-chave 30", "tipo": "Exata"}
  ],
  "caminhoExibicao": "seusite.com.br/categoria/produto",
  "titulos": [
    "Título 1 (máx 28 chars)",
    "Título 2 (máx 28 chars)",
    "Título 3 (máx 28 chars)",
    "Título 4 (máx 28 chars)",
    "Título 5 (máx 28 chars)",
    "Título 6 (máx 28 chars)",
    "Título 7 (máx 28 chars)",
    "Título 8 (máx 28 chars)",
    "Título 9 (máx 28 chars)",
    "Título 10 (máx 28 chars)",
    "Título 11 (máx 28 chars)",
    "Título 12 (máx 28 chars)",
    "Título 13 (máx 28 chars)",
    "Título 14 (máx 28 chars)",
    "Título 15 (máx 28 chars)"
  ],
  "descricoes": [
    "Descrição 1 com call-to-action e benefícios (máx 80 caracteres)",
    "Descrição 2 com diferenciais (máx 80 caracteres)",
    "Descrição 3 com urgência (máx 80 caracteres)",
    "Descrição 4 com prova social (máx 80 caracteres)"
  ],
  "sitelinks": [
    {
      "titulo": "Título do Sitelink 1",
      "descricao": "Descrição do sitelink 1",
      "link": "/pagina-1"
    },
    {
      "titulo": "Título do Sitelink 2",
      "descricao": "Descrição do sitelink 2",
      "link": "/pagina-2"
    },
    {
      "titulo": "Título do Sitelink 3",
      "descricao": "Descrição do sitelink 3",
      "link": "/pagina-3"
    },
    {
      "titulo": "Título do Sitelink 4",
      "descricao": "Descrição do sitelink 4",
      "link": "/pagina-4"
    },
    {
      "titulo": "Título do Sitelink 5",
      "descricao": "Descrição do sitelink 5",
      "link": "/pagina-5"
    }
  ],
  "frasesDestaque": [
    "Frase de destaque 1",
    "Frase de destaque 2",
    "Frase de destaque 3",
    "Frase de destaque 4",
    "Frase de destaque 5",
    "Frase de destaque 6",
    "Frase de destaque 7",
    "Frase de destaque 8",
    "Frase de destaque 9",
    "Frase de destaque 10"
  ],
  "snippetsEstruturados": [
    {
      "tipo": "Serviços",
      "valores": ["Serviço 1", "Serviço 2", "Serviço 3"]
    },
    {
      "tipo": "Marcas",
      "valores": ["Marca 1", "Marca 2"]
    }
  ]
}

IMPORTANTE:
- Gere entre 25-30 palavras-chave RELEVANTES e estratégicas
- Títulos devem ter NO MÁXIMO 28 caracteres
- Descrições devem ter NO MÁXIMO 80 caracteres
- Use as palavras-chave do cliente nos títulos
- Siga as melhores práticas do Google Ads
- Seja específico e relevante para o negócio do cliente
- Os segmentos de público devem ser MUITO detalhados e específicos
- NÃO inclua "locais" nem "renda familiar" nos segmentos demográficos
- Entenda bem o problema do cliente para sugerir palavras-chave certeiras
- Varie os tipos de correspondência das palavras-chave (ampla, frase, exata)`

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    console.log("[v0] Resposta da IA:", text)

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Não foi possível extrair JSON da resposta")
    }

    const data = JSON.parse(jsonMatch[0])

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Erro ao gerar campanha:", error)
    return NextResponse.json({ error: "Erro ao gerar campanha" }, { status: 500 })
  }
}
