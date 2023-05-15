
export default function Insert({ usuario, senha }) {

  function Inserir() {
    fetch('http://127.0.0.1:3001/usuarios',
      {
        method: "POST",
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
    <button onClick={Inserir}>Insert</button>
  );
}