import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Assets = () => {

     const [Assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAllAssets = async () => {
      try {
        const res = await axios.get("http://localhost:8800/Assets");
        setAssets(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAssets();
  }, []);

  console.log(Assets);

  const delete_handler = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/Assets/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Soma Assets collection</h1>
      <div className="Assets">
        {Assets.map((Asset) => (
          <div key={Asset.id} className="Asset">
            <img src={Asset.cover} alt="" />
            <h2>{Asset.title}</h2>
            <p>{Asset.desc}</p>
            <span>${Asset.price}</span>
            <button className="delete" onClick={() => delete_handler(Asset.id)}>Remove</button>
            <button className="update">
              <Link
                to={`/update/${Asset.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Asset
        </Link>
      </button>
    </div>
  );
};
export default Assets