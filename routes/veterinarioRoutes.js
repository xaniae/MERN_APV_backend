import express from 'express';
const router = express.Router();
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword } from '../controllers/veterinarioController.js'
import checkAuth from '../middleware/auttMiddleware.js'

//area publica
router.post("/", registrar);
router.get("/confirmar/:token", confirmar); //ruta dinamica
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword); //validar el email del usuario
// router.get('/olvide-password/:token', comprobarToken); //leer el token
// router.post('/olvide-password/:token', nuevoPassword) //almacenar el nuevo password

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

//creamos un custom middleware, ya que el perfil es privado y de esta manera lo protegemos
//con el checkauth verificamos que usuario es para mostrar su contenido 
router.get("/perfil", checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router;