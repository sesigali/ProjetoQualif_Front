import { axiosUrl } from "../axiosConfig";

async function cadastrarEmpresaLoader(empresaData) {
  try {
    const response = await axiosUrl.post("http://localhost:8888/empresa/adicionar", empresaData);
    if (response.status === 200) {
      return response.data; // Se o cadastro for bem-sucedido, retorna os dados da empresa cadastrada
    } else {
      throw new Error("Erro no cadastro de empresa"); // Trate outros casos de erro, se necessário
    }
  } catch (error) {
    console.error(error);
    throw error; // Rejeita a promise com o erro
  }
}

export { cadastrarEmpresaLoader };
