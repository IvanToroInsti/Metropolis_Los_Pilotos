require('dotenv').config()
const express = require('express');
const cors = require('cors');
// const path = require('path');

const session = require('express-session');
const { router } = require('./routes/router');
//const logger = require('pino');

const ENVIRONMENT = process.env.NODE_ENV || "development";
const SECRET = process.env.SECRET || "no_secret";
const ADDRESS = process.env.ADDRESS || "127.0.0.1";
const PORT = process.env.PORT || 3000;

const sessionMiddleware = session({
	secret: SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true, // Mejor práctica para seguridad
		secure: ENVIRONMENT === "production",
		maxAge: 60 * 60 * 1000 * 24, // La cookie será válida durante 24 horas
	  },
});

const app = express()

app.use(cors());
app.use(express.json());

app.use(sessionMiddleware);

app.get("/", (req,res) => {
    res.json({message:"Server funcionando correctamente!"});
})

app.use('/api', router);

app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: `La ruta ${req.originalUrl} no existe en este servidor.`
    });
});


app.listen(PORT,ADDRESS, () => {
    console.log(`Server funcionando en http://${ADDRESS}:${PORT}`);
})
