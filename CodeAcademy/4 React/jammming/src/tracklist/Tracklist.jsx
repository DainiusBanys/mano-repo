import Track from "../track/Track";

function Tracklist(props) {
  return (
    <div className="TrackList">
      {/* add a map method that renders a set of track components */}
      {props.trackObject.map((result, index) => {
        return <Track key={index} track={result} />;
      })}
    </div>
  );
}

export default Tracklist;
