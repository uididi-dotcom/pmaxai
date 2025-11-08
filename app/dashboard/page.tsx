import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { CampanhasList } from "@/components/campanhas-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  // Buscar últimas 5 campanhas
  const { data: campanhas } = await supabase
    .from("campanhas")
    .select("*")
    .eq("user_id", user.id)
    .order("data_criacao", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8 px-10 px-10 px-11 px-10 px-11 px-12 px-14 px-16 px-20 px-28 px-32 px-8 px-7 px-8 px-7 px-6 px-5 px-4 px-3.5 px-3 px-3.5 px-0 px-0 px-3 px-3 px-1.5 px-0 px-0">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Minhas Campanhas</h1>
            <p className="text-muted-foreground">Gerencie suas últimas 5 campanhas criadas</p>
          </div>
          <Link href="/assistente">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Nova Campanha
            </Button>
          </Link>
        </div>
        <CampanhasList campanhas={campanhas || []} />
      </main>
    </div>
  )
}
