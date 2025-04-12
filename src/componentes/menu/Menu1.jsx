import React from "react";
import "./styles.css"; // Importando o CSS para estilização
import MenuFatura from "./MenuFatura";
import MenuCliente from "./MenuCliente";

function Menu1() {
  const [menuSelecionado, setMenuSelecionado] = React.useState("");

  const voltarParaMenuPrincipal = () => {
    setMenuSelecionado("");
  };

  return (
    <div>
      {!menuSelecionado && (
        <div>
          <div className="title">Sistema Integrado de Gestão</div>
          <div className="button-container">
            <button
              onClick={() => setMenuSelecionado("cliente")}
              className="button"
            >
              Menu Cliente
            </button>
            <button
              onClick={() => setMenuSelecionado("fatura")}
              className="button"
            >
              Menu Fatura
            </button>
          </div>
        </div>
      )}

      {menuSelecionado === "cliente" && (
        <MenuCliente onVoltar={voltarParaMenuPrincipal} />
      )}

      {menuSelecionado === "fatura" && (
        <MenuFatura onVoltar={voltarParaMenuPrincipal} />
      )}
    </div>
  );
}

export default Menu1;
