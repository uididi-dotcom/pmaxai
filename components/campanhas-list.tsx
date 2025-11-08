"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Trash2 } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Campanha {
  id: string
  nome: string
  objetivo: string
  tipo_campanha: string
  data_criacao: string
}

export function CampanhasList({ campanhas }: { campanhas: Campanha[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    setLoading(id)
    const supabase = createClient()
    await supabase.from("campanhas").delete().eq("id", id)
    setLoading(null)
    router.refresh()
  }

  if (campanhas.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <p className="mb-4 text-muted-foreground">Você ainda não criou nenhuma campanha</p>
          <Button onClick={() => router.push("/assistente")}>Criar primeira campanha</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {campanhas.map((campanha) => (
        <Card key={campanha.id}>
          <CardHeader>
            <CardTitle className="text-lg">{campanha.nome}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{campanha.objetivo}</Badge>
              <Badge variant="outline">{campanha.tipo_campanha}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Criada em {new Date(campanha.data_criacao).toLocaleDateString("pt-BR")}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => router.push(`/campanha/${campanha.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(campanha.id)}
                disabled={loading === campanha.id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
