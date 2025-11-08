import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { FormularioCampanha } from "@/components/formulario-campanha"

export default async function AssistentePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Assistente de Campanhas</h1>
            <p className="text-muted-foreground">Vou te guiar passo a passo na criação da sua campanha</p>
          </div>
          <FormularioCampanha userId={user.id} />
        </div>
      </main>
    </div>
  )
}
