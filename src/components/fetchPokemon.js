export default async function fetchPokemon(offset) {
  try {
    const URL = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`
    );
    const data = await URL.json();

    const dataWithImages = data.results.map((element) => {
      console.log(element.url);
      // i have no idea how regexes work im praying this works
      const id = Number(element.url.match(/\/pokemon\/(\d+)\//)[1]);
      console.log(id);
      return {
        name: element.name,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
    return { results: dataWithImages };
  } catch (err) {
    console.error("Error: ", err);
    return { results: [{ name: "Error", url: "Error" }] };
  }
}
