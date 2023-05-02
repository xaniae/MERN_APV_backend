import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinaRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";


const app = express();
app.use(express.json()); //de esta forma decimos que vamos a enviar datos de tipo json
dotenv.config();
conectarDB();

// configuracion para cors
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //el origen del request esta permitido
            callback(null, true)
        } else{
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinaRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})

