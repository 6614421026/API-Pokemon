import { NextResponse } from "next/server";

type Pokemon = {
  id: number
  name: string
  image: string
  type: string
  height: number
  weight: number
}

export async function GET(
  req: Request,
  context: { params: Promise<{ name: string }> }
) {
  try {

    const { name } = await context.params

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: "Pokemon not found" },
        { status: 404 }
      )
    }

    const data = await res.json()

    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      type: data.types[0].type.name,
      height: data.height,
      weight: data.weight
    }

    return NextResponse.json(pokemon)

  } catch (error) {

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )

  }
}