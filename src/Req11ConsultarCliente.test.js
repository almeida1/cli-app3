import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.js"; // Importa o componente a ser testado

test("ct01 - quando consulta os detalhes do cliente sao apresentados", async () => {
  // Descrição do teste
  // dado que o componente App foi renderizado
  render(<App />);
  //quando o botão "Consultar" é selecionado
  const consultarButton = screen.getByText("Consultar");
  fireEvent.click(consultarButton);
  //entao os detalhes do cliente sao apresentados
  const textElement = await screen.findByText(/nenhum cliente encontrado/i); //find assincrono
  expect(textElement).toBeInTheDocument();
});
