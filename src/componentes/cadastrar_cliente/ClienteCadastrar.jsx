async function ClienteCadastrar(cliente) {
  try {
    const response = await fetch("https://cli-app3-e3c05aa621e6.herokuapp.com/api/v1/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      console.log("Erro detectado no fetch =>", response);
      throw new Error("Dados inválidos");
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export default ClienteCadastrar;
