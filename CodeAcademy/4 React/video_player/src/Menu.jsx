function Menu({ onSelectVideo }) {
  const clickHandler = (event) => {
    const name = event.target.value;
    onSelectVideo(name);
  };

  return (
    <form onClick={clickHandler}>
      <input type="radio" name="src" value="fast" aria-label="fast" /> fast
      <input type="radio" name="src" value="slow" aria-label="slow" /> slow
      <input type="radio" name="src" value="cute" aria-label="cute" /> cute
      <input type="radio" name="src" value="eek" aria-label="eek" /> eek
    </form>
  );
}

export default Menu;
