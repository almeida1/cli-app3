import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.js"; // Importa o componente a ser testado

test("ct01 - verifica se titulo esta na pagina", () => {
  // Renderiza o componente App
  render(<App />);
  const textElement = screen.getByText(/Sistema Integrado de Gestão/i);
  expect(textElement).toBeInTheDocument();
});

test("ct02 - ao clicar em cadastrar deve navegar para tela de cadastro", () => {
  render(<App />);

  // Verifica se o botão "Menu Cliente" está presente
  const menuClienteButton = screen.getByText("Menu Cliente");
  expect(menuClienteButton).toBeInTheDocument();

  // Simula um clique no botão "Mneu Cliente"
  fireEvent.click(menuClienteButton);

  // Verifica se navegou para tela de cadastro
  expect(screen.getByText("Gerenciamento de Clientes")).toBeInTheDocument();
});
test("ct03 - preenche o formulário de cadastro e verifica se os valores foram incluidos", async () => {
  render(<App />);
  const menuClienteButton = screen.getByText("Menu Cliente");
  // Simula um clique no botão "Mneu Cliente"
  fireEvent.click(menuClienteButton);
  // Verifica se o botão "Cadastrar" está presente
  const cadastrarButton = screen.getByText("Cadastrar");
  expect(cadastrarButton).toBeInTheDocument();
  // Simula um clique no botão "Cadastrar"
  fireEvent.click(cadastrarButton);
  // Verifica se ClienteCadastrarView é renderizado
  expect(screen.getByText("Cadastrar Clientes")).toBeInTheDocument();
  // Verifica se ClienteCadastrarView é renderizado
  const cpfInput = await screen.findByTestId("cpf");
  const nomeInput = await screen.findByTestId("nome");
  const cepInput = await screen.findByTestId("cep");
  const emailInput = await screen.findByTestId("email");
  userEvent.type(cpfInput, "123.456.789-00");
  userEvent.type(nomeInput, "João da Silva");
  userEvent.type(cepInput, "12345-678");
  userEvent.type(emailInput, "joao.silva@example.com");
  expect(cpfInput).toHaveValue("123.456.789-00");
  expect(nomeInput).toHaveValue("João da Silva");
  expect(cepInput).toHaveValue("12345-678");
  expect(emailInput).toHaveValue("joao.silva@example.com");
  const confirmarButton = screen.getByText("Confirmar");
  userEvent.click(confirmarButton);
});
test("ct04 - preenche o formulário de cadastro para dados invalidos", async () => {
  render(<App />);
  const menuClienteButton = screen.getByText("Menu Cliente");
  // Simula um clique no botão "Mneu Cliente"
  fireEvent.click(menuClienteButton);
  // Verifica se o botão "Cadastrar" está presente
  const cadastrarButton = screen.getByText("Cadastrar");
  expect(cadastrarButton).toBeInTheDocument();
  // Simula um clique no botão "Cadastrar"
  fireEvent.click(cadastrarButton);
  // Verifica se ClienteCadastrarView é renderizado
  expect(screen.getByText("Cadastrar Clientes")).toBeInTheDocument();
  // Verifica se ClienteCadastrarView é renderizado
  const cpfInput = await screen.findByTestId("cpf");
  
  //userEvent.type(cpfInput, "");
});