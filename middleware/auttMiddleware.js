import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    // console.log(req.headers.authorization);

    let token;

    //El bearer es de postman, es una convencion
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            token = req.headers.authorization.split(' ')[1] //quitamos la palabra bearer del inicio de la cadena que nos devuelve
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //con el req usamos express y nos crea una sesion con el veterinario
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado"); //omitimos la informacion que esta dentro del select
            return next(); //con esto se va al siguiente middleware y no a las siguientes lineas

        } catch (error) {
            const e = new Error('Token no válido');
            res.status(403).json({msg: e.message});
        }
    }

    //si la variable token esta vacia...
    if(!token){
        const error = new Error('Token no válido o inexistente');
        res.status(403).json({msg: error.message});
    }

    next();
}


export default checkAuth;