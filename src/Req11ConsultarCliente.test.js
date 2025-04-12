import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.js"; // Importa o componente a ser testado

test("ct01 - quando a conexao nao esta disponivel retorna nenhum cliente encontrado", async () => {
  // Descrição do teste
  // dado que o componente App foi renderizado

  render(<App />);
  const menuClienteButton = screen.getByText("Menu Cliente");
  // Simula um clique no botão "Mneu Cliente"
  fireEvent.click(menuClienteButton);
  // Verifica se o botão "Cadastrar" está presente
  const consultarButton = screen.getByText("Consultar");
  expect(consultarButton).toBeInTheDocument();
  // Simula um clique no botão "Cadastrar"
  fireEvent.click(consultarButton);

  //entao os detalhes do cliente sao apresentados
  const textElement = await screen.findByText(/nenhum cliente encontrado/i); //find assincrono
  expect(textElement).toBeInTheDocument();
});
test("ct02 - quando consulta os detalhes do cliente sao apresentados", async () => {
  // Descrição do teste
  // dado que o componente App foi renderizado

  render(<App />);
  const menuClienteButton = screen.getByText("Menu Cliente");
  // Simula um clique no botão "Mneu Cliente"
  fireEvent.click(menuClienteButton);
  // Verifica se o botão "Cadastrar" está presente
  const consultarButton = screen.getByText("Consultar");
  expect(consultarButton).toBeInTheDocument();
  // Simula um clique no botão "Cadastrar"
  fireEvent.click(consultarButton);

  //entao os detalhes do cliente sao apresentados
  const textElement = await screen.findByText(/nenhum cliente encontrado/i); //find assincrono
  expect(textElement).toBeInTheDocument();
});
