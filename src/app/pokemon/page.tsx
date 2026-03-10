"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Pokemon = {
  name: string
  id: number
  image: string
  type: string
}

const typeColors: any = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898"
}

export default function PokemonPage() {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadPokemon() {

      const res = await fetch("/api/pokemon")
      const data = await res.json()

      // API ของเราส่ง array มาเลย
      setPokemonList(data)
      setLoading(false)

    }

    loadPokemon()

  }, [])

  const filtered = pokemonList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>

      <h1 style={{ marginBottom: "20px" }}>Pokédex</h1>

      <input
        placeholder="Search Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px",
          marginBottom: "25px",
          width: "280px",
          borderRadius: "10px",
          border: "1px solid #444",
          background: "#111",
          color: "white",
          fontSize: "14px"
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))",
          gap: "20px"
        }}
      >

        {loading &&
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "170px",
                borderRadius: "12px",
                background: "#222",
                animation: "pulse 1.5s infinite"
              }}
            />
          ))
        }

        {!loading &&
          filtered.map((pokemon) => (

            <Link
              key={pokemon.id}
              href={`/pokemon/${pokemon.name}`}
              style={{ textDecoration: "none", color: "white" }}
            >

              <div
                style={{
                  background: "#1e1e1e",
                  border: `3px solid ${typeColors[pokemon.type] || "#333"}`,
                  padding: "15px",
                  borderRadius: "12px",
                  textAlign: "center",
                  transition: "0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.07)"
                  e.currentTarget.style.boxShadow = `0 0 15px ${typeColors[pokemon.type]}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >

                <p style={{ opacity: 0.6, fontSize: "13px" }}>
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>

                <img src={pokemon.image} width="96" />

                <h3 style={{ textTransform: "capitalize" }}>
                  {pokemon.name}
                </h3>

                <span
                  style={{
                    background: typeColors[pokemon.type],
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    textTransform: "capitalize"
                  }}
                >
                  {pokemon.type}
                </span>

              </div>

            </Link>

          ))}

      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6 }
          50% { opacity: 1 }
          100% { opacity: 0.6 }
        }
      `}</style>

    </div>
  )
}