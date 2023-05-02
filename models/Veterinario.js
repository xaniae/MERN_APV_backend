import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trin: true
    }, 
    password:{
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trin: true
    }, 
    telefono: {
        type: String,
        default: null,
        trin: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    }, 
    confirmado: {
        type: Boolean,
        default: false
    }
});

//antes de guardar el registro
veterinarioSchema.pre('save', async function(next){
    // console.log(this); usamos function para poder tener al objeto

    //condicion para que si una contraseña ya esta hasheada no se vuelva a hashear
    if(!this.isModified('password')){
        next(); //con este next pasamos al siguiente middleware
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Veterinario = mongoose.model('Veterinario', veterinarioSchema);
export default Veterinario;