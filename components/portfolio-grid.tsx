"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredProjects = [
  {
    name: "Loja Proença Veículos",
    url: "https://www.lojaproencaveiculos.com.br/",
    description: "Loja de veículos seminovos",
    image: "/portfolio/proenca-veiculos.png",
  },
  {
    name: "Nashville Rock n Run",
    url: "https://www.nashvillerocknrun.com.br/",
    description: "Corrida BandasRock 2025",
    image: "/portfolio/nashville-rocknrun.png",
  },
  {
    name: "Bronze de Menina",
    url: "https://bronzedemeninacampinas.com.br/",
    description: "Bronzeamento artificial",
    image: "/portfolio/bronze-menina.png",
  },
  {
    name: "Star Film Campinas",
    url: "https://www.starfilmcampinas.com.br/",
    description: "Película de proteção",
    image: "/portfolio/starfilm.png",
  },
]

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function PortfolioGrid() {
  return (
    <div className="space-y-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {featuredProjects.map((project) => (
          <motion.div
            key={project.url}
            variants={itemFadeIn}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-3xl border-2 shadow-sm hover:shadow-xl transition-shadow bg-background"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100 z-10"></div>
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-3xl bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Ver Projeto <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-balance">{project.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center"
      >
        <Button asChild size="lg" variant="outline" className="rounded-3xl group bg-transparent">
          <Link href="/portfolio">
            Ver Portfólio Completo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
