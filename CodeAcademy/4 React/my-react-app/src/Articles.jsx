import { Link } from "react-router-dom";
function Articles() {
  const article = "https://www.google.lt";
  return (
    <main>
      <p>Articles componenet content goes here...</p>
      <Link to={article}>Google</Link>
    </main>
  );
}

export default Articles;
