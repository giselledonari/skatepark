const checkbox = document.getElementById("checkbox1");

  checkbox.addEventListener("change", async () => {
    const rev = checkbox.checked ? "Aprobado" : "En revision";
    await fetch(`/admin/cambiar`,{
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({rev})
        })
  });