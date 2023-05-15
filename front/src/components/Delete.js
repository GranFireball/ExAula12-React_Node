
export default function Delete({ usuario }) {

  function Deletar() {
    fetch('http://127.0.0.1:3001/usuarios',
      {
        method: "DELETE",
        body: JSON.stringify({ "usuario": usuario.current.value }),
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
    <button onClick={Deletar}>Delete</button>
  );
}