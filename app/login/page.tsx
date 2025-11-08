"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      await new Promise((resolve) => setTimeout(resolve, 100))

      window.location.href = "/dashboard"
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      if (error instanceof Error) {
        if (error.message.includes("Invalid login credentials")) {
          setError("Email ou senha incorretos")
        } else {
          setError(error.message)
        }
      } else {
        setError("Ocorreu um erro ao fazer login")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image src="/pmaxai-logo.png" alt="pmaxAI" width={160} height={60} className="h-16 w-auto" />
          </Link>
        </div>
        <Card className="border-2 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Entrar</CardTitle>
            <CardDescription>Digite seu email e senha para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full rounded-3xl bg-[#427cdb] hover:bg-[#dc4a3d]" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="underline underline-offset-4 text-[#427cdb] hover:text-[#dc4a3d]">
                  Cadastre-se
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
