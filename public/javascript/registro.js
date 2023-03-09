
const registro=document.querySelector("#registro_form")
const login=document.querySelector("#login")

registro.addEventListener("submit",async (e)=>{
    e.preventDefault()
    let formData = new FormData(registro);
    console.log(formData)
    let respuesta=await fetch('/form/registro',{
        method:"POST",
        body:formData
    })
    let respuesta_data=await respuesta.text()
    console.log(respuesta_data)

})