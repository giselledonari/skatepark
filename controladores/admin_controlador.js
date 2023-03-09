const { pool } = require('../config/db.js');

async function cambiarEstado(email,rev){
    const client = await pool.connect();
    const resp=await client.query({
        text: "update usuarios set estado=$1 where email=$2",
        values: [rev,email]
    });
    console.log(resp)
    client.release();
    return resp
}



module.exports={cambiarEstado}