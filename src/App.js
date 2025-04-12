import React from "react";
import "./App.css"; // Importando o CSS para estilização
// Importando os componentes de menu
// Removido a importação direta de MenuCliente e MenuFatura
import Menu1 from "./componentes/menu/Menu1.jsx";

function App() {
  const [menuSelecionado, setMenuSelecionado] = React.useState("");

  return (
    <div>
      <Menu1 />
    </div>
  );
}

export default App;
