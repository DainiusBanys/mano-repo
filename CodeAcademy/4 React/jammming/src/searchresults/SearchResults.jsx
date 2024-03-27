import Tracklist from "../tracklist/Tracklist";
import styles from "./SearchResults.module.css";

function SearchResults(props) {
  // console.log({ props });
  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <Tracklist
        trackObject={props.resultObject}
        isRemoval={false}
        onAdd={props.onAdd}
      />
    </div>
  );
}

export default SearchResults;
