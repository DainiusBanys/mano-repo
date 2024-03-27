import styles from "./App.module.css";
import Playlist from "./playlist/Playlist";
import SearchBar from "./searchbar/SearchBar";
import SearchResults from "./searchresults/SearchResults";
import { useState } from "react";
import { Spotify } from "./util/Spotify";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  // {
  //   name: "Goin' Down",
  //   artist: "Bruce Springsteen",
  //   album: "Born in USA",
  //   id: 1,
  // },
  // {
  //   name: "Stiff Upper Lip",
  //   artist: "ACDC",
  //   album: "ACDC album",
  //   id: 2,
  // },
  // {
  //   name: "Gig Gun",
  //   artist: "ACDC",
  //   album: "ACDC album",
  //   id: 3,
  // },

  const [playlistName, setPlaylistName] = useState("");

  const [playlistTracks, setPlaylistTracks] = useState([]);
  // {
  //   name: "PL Goin' Down",
  //   artist: "PL Bruce Springsteen",
  //   album: "PL Born in USA",
  //   id: 4,
  // },
  // {
  //   name: "PL Stiff Upper Lip",
  //   artist: "PL ACDC",
  //   album: "PL ACDC album",
  //   id: 5,
  // },
  // {
  //   name: "PL Gig Gun",
  //   artist: "PL ACDC",
  //   album: "PL ACDC album",
  //   id: 6,
  // },

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResult(result));
    console.log(term);
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar onSearch={search} />
        <div className={styles["App-playlist"]}>
          <SearchResults resultObject={searchResult} onAdd={addTrack} />

          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
