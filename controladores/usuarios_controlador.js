const { pool } = require('../config/db.js');

async function registroFormulario(email,nombre,contrasena_encript,experiencia,especialidad,imagen){
    const client = await pool.connect();
    const rev='En revision'
    await client.query({
        text: "insert into usuarios values ($1,$2,$3,$4,$5,$6,$7)",
        values: [email,nombre,contrasena_encript,experiencia,especialidad,imagen,rev]
    });
    client.release();
}

async function dataUsuarios(){
    const client = await pool.connect();
    const respuesta=await client.query({
        text: "select*from usuarios"
    });
    client.release();
    return respuesta.rows
}
async function buscarCorreo(email){
    const client = await pool.connect();
    const respuesta= await client.query({
        text: 'select * from usuarios where email = $1',
        values: [email]
    });
    client.release();
    return respuesta.rows

}


module.exports={registroFormulario,dataUsuarios,buscarCorreo}