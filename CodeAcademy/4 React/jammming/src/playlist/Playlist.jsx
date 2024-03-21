import Tracklist from "../tracklist/Tracklist";

function Playlist(props) {
  return (
    <div className="PlayList">
      <input
        type="text"
        defaultValue={"New Playlist"}
        aria-label="play list input field"
      />
      <Tracklist trackObject={props.playlistTracks} />
      {/* add track list component */}
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
