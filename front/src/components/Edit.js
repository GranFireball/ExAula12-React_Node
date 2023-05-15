
export default function Edit({ usuario, senha }) {

  function Editar() {
    fetch('http://127.0.0.1:3001/usuarios',
      {
        method: "PUT",
        body: JSON.stringify({ "usuario": usuario.current.value, "senha": senha.current.value }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => data.json())
      .then((json) => {
        alert(json);
      });

  }

  return (
    <button onClick={Editar}>Edit</button>
  );
}