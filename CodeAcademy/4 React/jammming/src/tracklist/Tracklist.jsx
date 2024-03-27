import Track from "../track/Track";
import styles from "./Tracklist.module.css";

function Tracklist(props) {
  return (
    <div className={styles.Tracklist}>
      {/* add a map method that renders a set of track components */}
      {/* {console.log(props.trackObject)} */}
      {props.trackObject.map((result, index) => {
        return (
          <Track
            key={index}
            track={result}
            isRemoval={props.isRemoval}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
          />
        );
      })}
    </div>
  );
}

export default Tracklist;
