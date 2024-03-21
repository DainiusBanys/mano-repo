import Tracklist from "../tracklist/Tracklist";

function SearchResults(props) {
  // console.log({ props });
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist trackObject={props.resultObject} />
    </div>
  );
}

export default SearchResults;
