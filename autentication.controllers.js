import jwt from "jsonwebtoken";

// Arreglo en memoria (ojo: si reinicias el servidor, se borran los usuarios)
const usuarios = [];

async function login(req, res) {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send({ status: "error", message: "Datos incompletos" });
    }

    const usuarioARevisar = usuarios.find(usuario => usuario.username === user);
    
    if (!usuarioARevisar || password !== usuarioARevisar.password) {
        return res.status(400).send({ status: "error", message: "Error de credenciales" });
    }

    // 🔑 Generamos el token incluyendo el ROL
    const token = jwt.sign(
        { username: user, role: usuarioARevisar.role }, 
        "textosecretoDECIFRADO", 
        { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        path: "/",
        httpOnly: true 
    });

    return res.status(200).send({ status: "ok", redirect: "/proyecto" });
}

async function register(req, res) {
    const { user, password, role } = req.body; // <-- Capturamos el nuevo campo ROL

    if (usuarios.find(u => u.username === user)) {
        return res.status(400).send({ status: "error", message: "El usuario ya existe" });
    }

    // Guardamos el usuario con su rol
    usuarios.push({ username: user, password, role });
    return res.status(201).send({ status: "ok", redirect: "/" });
}

export default { login, register };