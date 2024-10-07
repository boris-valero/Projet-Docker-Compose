const express = require("express");
const fetch = require("node-fetch");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); 

const app = express();
const port = 3000;

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

const Quote = sequelize.define(
  "Quote",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "quotes_fr",
    timestamps: false,
  }
);

app.get("/affirmation", async (req, res) => {
  try {
    await sequelize.authenticate();
    const quote = await Quote.findAll();
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue" });
  }
});

app.get("/affirmation/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await sequelize.authenticate();
    const quote = await Quote.findByPk(id);
    if (quote) {
      res.json(quote);
    } else {
      res.status(404).json({ error: "Citation non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue" });
  }
});


app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM quotes_fr"
    );
    console.log("Connection has been established successfully.");

    const index = Math.ceil(Math.random() * (results.length - 1));
    const affirmation = results[index].content;

    res.send(`
      <style>
        body {
          background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #ff9a9e);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          color: #333;
        }
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .container {
          text-align: center;
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        h1 {
          color: #ff6f61;
          margin-bottom: 20px;
        }
        p {
          color: #000000;
          font-size: 1.2em;
        }
      </style>
      <div class="container">
        <h1>L'affirmation tirée de la base de données est la suivante :</h1>
        <p>${affirmation}</p>
      </div>
    `);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.json({ success: false, msg: "Unable to connect to the database" });
  }
});

app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      "<h1>404! Page not found</h1> <br /> Sorry, you came to the wrong place. The Only URL available is : http://localhost:7777/"
    );
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
