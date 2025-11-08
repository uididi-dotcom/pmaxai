import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function CampanhaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  const { data: campanha, error } = await supabase
    .from("campanhas")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error || !campanha) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8 mx-14 mx-14 mx-12 mx-11 mx-10 mx-3 mx-2 mx-0">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{campanha.nome}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">{campanha.objetivo}</Badge>
              <Badge variant="outline">{campanha.tipo_campanha}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">URL Final</p>
                <p className="text-sm text-muted-foreground">{campanha.url_final}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Produtos/Serviços</p>
                <p className="text-sm text-muted-foreground">{campanha.produtos_servicos}</p>
              </div>
              {campanha.cpa_desejado && (
                <div>
                  <p className="text-sm font-medium">CPA Desejado</p>
                  <p className="text-sm text-muted-foreground">R$ {campanha.cpa_desejado}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Palavras-chave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {campanha.palavras_chave?.map((palavraObj: { palavra: string; tipo: string }, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary">{palavraObj.palavra}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {palavraObj.tipo}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Títulos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {campanha.titulos?.map((titulo: string, index: number) => (
                <div key={index} className="rounded-lg border p-3">
                  <p className="text-sm">{titulo}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Descrições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {campanha.descricoes?.map((descricao: string, index: number) => (
                <div key={index} className="rounded-lg border p-3">
                  <p className="text-sm">{descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {campanha.sitelinks && campanha.sitelinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Sitelinks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {campanha.sitelinks?.map((sitelink: { titulo: string; descricao: string }, index: number) => (
                  <div key={index} className="rounded-lg border p-3">
                    <p className="font-medium text-sm">{sitelink.titulo}</p>
                    <p className="text-sm text-muted-foreground">{sitelink.descricao}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
