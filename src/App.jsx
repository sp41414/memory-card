import PokemonCards from "./components/PokemonCards";
import "./styles/App.css";
import { useState, useEffect } from "react";
import fetchPokemon from "./components/fetchPokemon";

function App() {
  const [response, setResponse] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  // hashmap to make sure the user doesnt click the same pokemon twice
  const [pokemonsSelected, setPokemonsSelected] = useState(new Map());
  // so the user doesnt click while the API is still fetching new images and loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const pokemon = async () => {
      setIsLoading(true);
      // there are like 1000+ pokemon good luck remembering allat :)
      // P.S. im too lazy to just simple add a state to keep track of an offset
      // and only fetch once then reshuffle, chaos, chaos!
      const randomOffset = Math.floor(Math.random() * 1321);
      console.log(randomOffset);
      const response = await fetchPokemon(randomOffset);
      if (isMounted) {
        setResponse(response);
        setIsLoading(false);
      }
    };

    pokemon();

    // cleanup
    return () => {
      isMounted = false;
    };
  }, [score]);

  const handleClick = (name) => {
    if (isLoading) return;
    if (pokemonsSelected.has(name)) {
      setScore(0);
      setPokemonsSelected(new Map());
      return;
    }
    setPokemonsSelected((prev) => new Map(prev).set(name, true));
    setScore(score + 1);
    setBestScore((prevBest) => (score + 1 > prevBest ? score + 1 : prevBest));
    console.log(`Clicked ${name}!`);
  };

  return (
    <>
      <div className="score">Score: {score}</div>
      <div className="best-score">Best Score: {bestScore}</div>
      <PokemonCards response={response} handleClick={handleClick} />
    </>
  );
}

export default App;
