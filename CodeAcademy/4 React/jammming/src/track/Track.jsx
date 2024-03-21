function Track(props) {
  const renderAction = () => {
    if (props.track.isRemoval) {
      return <button className="Track-action">-</button>;
    } else {
      return <button className="Track-action">+</button>;
    }
  };
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{/*-- track name will go here */}</h3>
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {/* <button className="Track-action">+ or - will go here </button> */}
      {renderAction()}
    </div>
  );
}

export default Track;
