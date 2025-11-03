export default function PokemonCards({ response, handleClick }) {
  return (
    <div className="cards">
      {response === null ? (
        <div className="loading">Loading</div>
      ) : (
        response.results.map((element) => {
          return (
            <div
              className="card"
              key={element.name}
              onClick={() => handleClick(element.name)}
              aria-label={element.name}
            >
              <div className="card-name">{element.name}</div>{" "}
              <div className="card-image">
                <img src={element.url} alt={element.name} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
