import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import jwt from "jsonwebtoken";
import authentication from "./controllers/autentication.controllers.js";

const app = express();
app.set("port", 4000);

app.use(express.static(path.resolve("public")));
app.use(express.json());
app.use(cookieParser());

// 🛡️ Middleware de Autorización
function soloUsuarios(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.redirect("/");
    try {
        const verificado = jwt.verify(token, "textosecretoDECIFRADO");
        req.user = verificado; // Aquí guardamos el usuario y su rol en la petición
        next();
    } catch (error) {
        return res.redirect("/");
    }
}

// Rutas
app.get("/", (req, res) => res.sendFile(path.resolve("pages/login.html")));
app.get("/register", (req, res) => res.sendFile(path.resolve("pages/register.html")));
app.get("/proyecto", soloUsuarios, (req, res) => res.sendFile(path.resolve("pages/proyecto.html")));

app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

app.listen(app.get("port"), () => {
    console.log(`Servidor activo en puerto ${app.get("port")}`);
});