const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "property",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>DHello GFG Learneradaawa!</h1>");
  res.send("Welcome tp root URL OF server");
});


 //login


 app.post("/login", (req, response) => {
  const body = req.body;
  const sql =
    "SELECT * FROM user WHERE username = '" +
    body.username +
    "' AND password = '" +
    body.password +
    "'";

  connection.query(sql, function (err, result) {
    if (result) {
      const tokens = getTokens(body);

      // Assigning refresh token in http-only cookie
      response.cookie("jwt", tokens.refresh_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      response.json(tokens);
    }
  });
});
//token

function getTokens(body) {
  const accessToken = jwt.sign(
    {
      username: body.username,
      password: body.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = jwt.sign(
    {
      username: body.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
  };
}


//save property table

app.post("/save", (req, res) => {
  const body = req.body;

  saveToDatabase(body);
  res.json(body);
});

function saveToDatabase(body) {
  const sql =
    "INSERT INTO `properties` (`name`, `picture`, `location`, `price`, `description`) VALUES ('" +
    body.name +
    "', '" +
    body.picture +
    "', '" +
    body.location +
    "', '" +
    body.price +
    "', '" +
    body.description +
    "')";

  connection.query(sql, function (err, result) {
    console.log(result);
  });
}

//




/* update UPDATE `properties` SET `name` = 'Testrrr' WHERE `properties`.`id` = 6; */
app.get("/update/:id",(req,res)=>{
  const upid = req.params.id;
  connection.query('UPDATE properties SET name=?,picture=?,location=?,price=?,description=?',[name, picture,location,price,description],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send("update")
    }
  })
})

  // fromDatabase(id);
  // res.json(id);

// });
// function fromDatabase(id){
//   const sql = "UPDATE `properties` SET `name` = ' " + body.name + " ' WHERE `properties`.`id` = ' " + id + " ' ";
//   console.log(sql);
//   connection.query(sql, function (err, result) {
//     if (result) {
//       res.send("update Successfully");
//     }
//   });
// }





/* get call to select all from properties table */
app.get("/properties", (req, res) => {
  const resultData = {};
  connection.query(
    "SELECT id, name, picture, location, price, description FROM properties",
    function (err, result) {
      if (err) throw err;
      resultData.data = result;
      if (result) {
        res.json(resultData);
      }
    }
  );
});

/* Delete method*/
app.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  const sql = "DELETE FROM properties WHERE id = " + id + " ";
  console.log(sql);
  connection.query(sql, function (err, result) {
    if (result) {
      res.send("Deleted Successfully");
    }
  });
});

dotenv.config();
const PORT = 5555;

app.listen(PORT, (error) => {
  if (!error) console.log(`Server is up and running on ${PORT}...`);
  else console.log("Error Occured", error);
});
