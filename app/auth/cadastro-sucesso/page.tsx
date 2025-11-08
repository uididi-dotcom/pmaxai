import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CadastroSucessoPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">AdsCopilot</span>
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verifique seu email</CardTitle>
            <CardDescription>Enviamos um link de confirmação para seu email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground leading-relaxed">
              Clique no link que enviamos para confirmar sua conta e começar a usar o AdsCopilot.
            </p>
            <Link href="/login" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Voltar para login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
