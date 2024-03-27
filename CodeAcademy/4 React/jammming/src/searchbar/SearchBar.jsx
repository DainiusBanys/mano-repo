import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");
  function passTerm() {
    props.onSearch(term);
  }

  function handleTermChange({ target }) {
    setTerm(target.value);
  }

  return (
    <div className={styles.SearchBar}>
      <input
        type="text"
        placeholder="Enter A Song, Album or Artist"
        aria-label="search input"
        onChange={handleTermChange}
      />
      <button className={styles.SearchButton} onClick={passTerm}>
        {" "}
        SEARCH{" "}
      </button>
    </div>
  );
}

export default SearchBar;
