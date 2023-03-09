const express = require("express");
const router=express.Router()
const bodyParser = require("body-parser");
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookie=require('cookie')
require("dotenv").config();
const {registroFormulario,dataUsuarios,buscarCorreo}=require("../controladores/usuarios_controlador.js")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Configurar el middleware de multer
const path = require("path");
const multer=require("multer");
const { resolve } = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname));
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 10000000} //10mb
}).single('imagen'); //campo del form

////

//pages
router.get("/", async (req, res) => {
    const data=await dataUsuarios()
    res.render("index",{data:data});
});

router.get("/admin", async (req, res) => {
    const data=await dataUsuarios()
    res.render("admin",{data:data});
});

router.get("/registro", (req, res) => {
    res.render("registro");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/perfil", async (req, res) => {
  const token = req.cookies.myToken;
  try {
    const respuesta = await perfil(token);
    console.log(respuesta);
    res.render("perfil",{data:respuesta});
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});


router.post('/form/registro',uploadImage,async(req, res)=> {
    console.log("hola")
    const email = req.body.email;
    const nombre = req.body.nombre;
    const imagen =req.file.filename;
    const contrasena = req.body.contrasena;
    const experiencia=req.body.experiencia;
    const especialidad=req.body.especialidad

  const contrasena_encript=await bcrypt.hash(contrasena,8)//para encriptar
  try{
    await registroFormulario(email,nombre,contrasena_encript,experiencia,especialidad,imagen)
    res.send("Usuario registrado correctamente")
  }
  catch(err){
    console.log(err)
    res.send("No se pudo registrar al usuario")
  }
} )

router.post('/form/login', async(req,res)=>{
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    try{
        let respuesta=await buscarCorreo(email)
        if (respuesta.length==0){
        res.send("Correo no existe")
        }
        else{  
        let contrasenaCheck=await bcrypt.compare(contrasena,respuesta[0].contrasena)
        
        if(contrasenaCheck){
            const token=jwt.sign({
            exp:Math.floor(Date.now()/1000)+60*60*1,//*1 1 hora
            email:email
            },process.env.SECRETO)

            res.cookie('myToken', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 1000*60*60*1
            });

            res.redirect('/perfil')
        }
        else{
            console.log("no es la pass")
        }

        }
    }
    catch(err){
        console.log("Error en el login")
        console.log(err)
    }
})

async function perfil(token){
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRETO, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    });
  }

module.exports = router