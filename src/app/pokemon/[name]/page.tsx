"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

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

export default function PokemonDetail() {

  const params = useParams()
  const name = params.name

  const [pokemon, setPokemon] = useState<any>(null)

  useEffect(() => {

    async function loadPokemon() {

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await res.json()

      setPokemon(data)

    }

    loadPokemon()

  }, [name])

  if (!pokemon) return <p style={{ padding: 20 }}>Loading...</p>

  const type = pokemon.types[0].type.name

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>

      <Link href="/pokemon">⬅ Back</Link>

      <div
        style={{
          marginTop: "20px",
          padding: "25px",
          borderRadius: "15px",
          background: "#1e1e1e",
          border: `3px solid ${typeColors[type]}`,
          textAlign: "center"
        }}
      >

        <p style={{ opacity: 0.6 }}>
          #{pokemon.id.toString().padStart(3, "0")}
        </p>

        <h1 style={{ textTransform: "capitalize" }}>
          {pokemon.name}
        </h1>

        <img
          src={pokemon.sprites.front_default}
          width="150"
        />

        <div style={{ marginTop: "10px" }}>
          {pokemon.types.map((t: any) => (
            <span
              key={t.type.name}
              style={{
                background: typeColors[t.type.name],
                padding: "6px 12px",
                borderRadius: "20px",
                margin: "4px",
                fontSize: "13px",
                textTransform: "capitalize"
              }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* STATS */}
        <div style={{ marginTop: "20px" }}>

          {pokemon.stats.map((s: any) => (

            <div key={s.stat.name} style={{ marginBottom: "10px" }}>

              <p style={{ textTransform: "capitalize", margin: "4px 0" }}>
                {s.stat.name}
              </p>

              <div
                style={{
                  background: "#333",
                  borderRadius: "10px",
                  height: "10px"
                }}
              >

                <div
                  style={{
                    width: `${s.base_stat}%`,
                    background: typeColors[type],
                    height: "10px",
                    borderRadius: "10px"
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}