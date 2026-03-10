export async function GET(
  req: Request,
  context: { params: Promise<{ name: string }> }
) {

  try {

    const { name } = await context.params

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )

    const data = await res.json()

    const pokemon = {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      type: data.types[0].type.name,
      height: data.height,
      weight: data.weight
    }

    return Response.json(pokemon)

  } catch (error) {

    return Response.json(
      { error: "Pokemon not found" },
      { status: 404 }
    )

  }

}