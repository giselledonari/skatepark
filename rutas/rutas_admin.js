const express = require("express");
const router=express.Router()
const bodyParser = require("body-parser");
require("dotenv").config();
const {cambiarEstado}=require("../controladores/admin_controlador.js")

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.put('/admin/cambiar',async(req,res)=>{
    const rev = req.body.rev;
    
    try{
        await cambiarEstado(rev)
        res.send("actualizado")
      }
      catch(err){
        console.log(err)
        res.send("No se pudo actualizar al usuario")
      }
})

module.exports = router