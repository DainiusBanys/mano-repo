import "./App.css";
import Playlist from "./playlist/Playlist";
import SearchBar from "./searchbar/SearchBar";
import SearchResults from "./searchresults/SearchResults";

function App() {
  const searchResult = [
    {
      name: "Goin' Down",
      artist: "Bruce Srpingsteen",
      album: "Born in USA",
      id: 1,
    },
    {
      name: "Stiff Upper Lip",
      artist: "ACDC",
      album: "ACDC album",
      id: 2,
    },
    {
      name: "Gig Gun",
      artist: "ACDC",
      album: "ACDC album",
      id: 3,
    },
  ];

  const playlistName = "My Rock List";

  const playlistTracks = [
    {
      name: "PL Goin' Down",
      artist: "PL Bruce Srpingsteen",
      album: "PL Born in USA",
      id: 4,
    },
    {
      name: "PL Stiff Upper Lip",
      artist: "PL ACDC",
      album: "PL ACDC album",
      id: 5,
    },
    {
      name: "PL Gig Gun",
      artist: "PL ACDC",
      album: "PL ACDC album",
      id: 6,
    },
  ];

  return (
    <div className="App">
      <header className="App-header1"></header>
      <div>
        <SearchBar />
        <div className="Columns">
          <div className="Column">
            <SearchResults resultObject={searchResult} />
          </div>
          <div className="Column">
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
