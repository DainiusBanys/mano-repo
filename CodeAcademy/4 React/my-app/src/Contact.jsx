import React, { useState } from "react";
function Contact() {
  const password = "swordfish";
  const [authorized, setAuthorized] = useState(false);
  function handleSubmit(e) {
    let enteredPassword = e.target.querySelector(
      'input[type="password"]'
    ).value;

    console.log(enteredPassword);
    const auth = enteredPassword === password;

    setAuthorized(auth);
  }
  const login = (
    <form>
      <input type="password" placeholder="Password" aria-label="label" />
      <input type="submit" onSubmit={handleSubmit} aria-label="label" />
    </form>
  );
  const contactInfo = (
    <ul>
      <li>client@example.com</li>
      <li>555.555.5555</li>
    </ul>
  );

  return (
    <div id="authorization">
      {authorized ? <h1>Contact</h1> : <h1>Enter the Password</h1>}

      {authorized ? contactInfo : login}
    </div>
  );
}

export default Contact;
