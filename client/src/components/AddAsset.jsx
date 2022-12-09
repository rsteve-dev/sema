import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddAsset = () => {
  const [Asset, setAsset] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAsset((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/Assets", Asset);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Asset</h1>
      <input
        type="text"
        placeholder="Asset name"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Asset desciption"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Asset price-tag"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Asset cover-img"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Assets</Link>
    </div>
  );
};

export default AddAsset