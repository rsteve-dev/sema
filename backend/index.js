import express from 'express';
import mysql from "mysql";
import cors from 'cors';


const app=express();
//express middlewware
app.use(express.json);
app.use(cors())

const db=mysql.createConnection(
    {
        host:"localhost",
        user:"root@localhost",
        password:"Nairobi@@!",
        database:"mybookstore"
    }
)

app.get("/",(req,res)=>{
    res.json("hello you just pinged the backend");
})

app.get("/books",(req,res)=>{
    const qr="SELECT * FROM mybookstore.books";
    db.query(qr,(err,data)=>{
        //res.json("retrieving books!!")
        (err)?res.json(err):res.json(data);
    })
})
//ENTER BOOK INTO BOOKS TABLE
app.post("/books",(req,res)=>{
    const qr="INSERT INTO mybookstore.books (`title`,`desc`,`cover` VALUES(?) "
    const req_vals = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

    db.query(qr,[req_vals],(err,data)=>{
         (err)?res.json(err):res.json("successfully added to our bookstore");
    })
})
//delete book from bookstore
app.delete("/books/:id", (req, res) => {
  const book_Id = req.params.id;
  const qr = " DELETE FROM books WHERE id = ? ";

  db.query(qr, [book_Id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//put data
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});




let listening_port=8800;
app.listen(listening_port,()=>{
    console.log("connected to backend!")
})
