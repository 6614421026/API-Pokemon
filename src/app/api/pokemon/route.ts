export async function GET() {

  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  const data = await res.json()

  const pokemon = await Promise.all(
    data.results.map(async (p: any) => {

      const detailRes = await fetch(p.url)
      const detail = await detailRes.json()

      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.front_default,
        type: detail.types[0].type.name
      }
    })
  )

  return Response.json(pokemon)
}