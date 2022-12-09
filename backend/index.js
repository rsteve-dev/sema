import express from 'express';
import mysql from "mysql";
import cors from "cors";


const app=express();
//express middlewware
app.use(express.json);
app.use(cors())

const db=mysql.createConnection(
    {
        host:"localhost",
        user:"root@localhost",
        password:"",
        database:"AssetStore"
    }
)

app.get("/",(req,res)=>{
    res.json("hello you just pinged the backend");
})

app.get("/assets",(req,res)=>{
    const qr="SELECT * FROM AssetStore.assets";
    db.query(qr,(err,data)=>{
        //res.json("retrieving assets!!")
        (err)?res.json(err):res.json(data);
    })
})
//ENTER asset INTO assets TABLE
app.post("/assets",(req,res)=>{
    const qr="INSERT INTO Assetstore.assets (`title`,`desc`,`cover` VALUES(?) "
    const req_vals = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

    db.query(qr,[req_vals],(err,data)=>{
         (err)?res.json(err):res.json("successfully added to our assetstore");
    })
})
//delete asset from assetstore
app.delete("/assets/:id", (req, res) => {
  const asset_Id = req.params.id;
  const qr = " DELETE FROM assets WHERE id = ? ";

  db.query(qr, [asset_Id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//put data
app.put("/assets/:id", (req, res) => {
  const assetId = req.params.id;
  const q = "UPDATE assets SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,assetId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});




let listening_port=8800;
app.listen(listening_port,()=>{
    console.log("connected to backend!")
})
