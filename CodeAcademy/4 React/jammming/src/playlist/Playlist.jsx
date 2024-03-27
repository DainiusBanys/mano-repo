import Tracklist from "../tracklist/Tracklist";
import styles from "./Playlist.module.css";
import React from "react";

function Playlist(props) {
  function handleNameChange({ target }) {
    props.onNameChange(target.value);
  }

  return (
    <div className={styles.Playlist}>
      <input
        type="text"
        defaultValue={"New Playlist"}
        aria-label="play list input field"
        onChange={handleNameChange}
      />
      <Tracklist
        trackObject={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      {/* add track list component */}
      <button className={styles["Playlist-save"]} onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
