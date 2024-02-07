import React, { useState } from "react";

function FoodOrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order Successful!

Your order was ${order}.

Please show your confirmation number for pickup.`);
  };

  return (
    <form onSubmit={handleSubmit}>
      forma <br />
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={name}
        customers_name
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        name="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        phone
      />
      <br />
      <label htmlFor="address">Address:</label>
      <input
        id="address"
        name="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        address
      />
      <br />
      <label htmlFor="order">Order:</label>
      <input
        id="Order"
        name="order"
        type="text"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        order
      />
      <br />
      <button type="submit">"Submit Order"</button>
    </form>
  );
}

export default FoodOrderForm;
