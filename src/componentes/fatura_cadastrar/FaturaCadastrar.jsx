async function FaturaCadastrar(cliente) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/faturas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fatura),
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
export default FaturaCadastrar;
