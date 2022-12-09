
import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateAsset = () => {
  const [Asset, setAsset] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const AssetId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setAsset((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/Assets/${AssetId}`, Asset);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Asset</h1>
      <input
        type="text"
        placeholder="Asset Name"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Asset description"
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
        placeholder="Asset cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Assets</Link>
    </div>
  );
};

export default UpdateAsset