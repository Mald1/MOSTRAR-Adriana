import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdicionarAluno.css';

function AdicionarAluno({ mode, closeModal }) {
  const [nome, setNome] = useState("");
  const [lastNome, setLastNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [cursosDisponiveis, setCursosDisponiveis] = useState([]); // Armazena a lista de cursos

  // Função para garantir que o campo matrícula aceita apenas números e limite de 8 dígitos
  const handleMatriculaChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMatricula(value); // Permite apenas números
    }
  };

  // Função para buscar a lista de cursos da API
  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/courses"); // Pega os cursos do backend
      setCursosDisponiveis(response.data); // Atualiza o estado com os cursos recebidos
    } catch (error) {
      console.error("Erro ao buscar cursos:", error.response ? error.response.data : error.message);
    }
  };

  // Executa a busca de cursos quando o componente é montado
  useEffect(() => {
    fetchCursos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se a matrícula tem exatamente 8 dígitos
    if (matricula.length !== 8) {
      alert("A matrícula deve conter exatamente 8 dígitos numéricos.");
      return;
    }

    try {
      const aluno = {
        first_name: nome,
        last_name: lastNome,
        matricula: parseInt(matricula),
        courseid: parseInt(curso)
      };

      // Faz a requisição para a API
      const response = await axios.post("http://localhost:3000/students", aluno);
      console.log("Aluno Adicionado:", response.data);

      // Fecha o modal após a submissão
      closeModal();
    } catch (error) {
      console.error("Erro ao adicionar o aluno:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="adicionar-aluno-container">
      <h2>{mode === "adicionar" ? "Adicionar Aluno" : "Editar Aluno"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Primeiro Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sobrenome:</label>
          <input
            type="text"
            value={lastNome}
            onChange={(e) => setLastNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Matrícula:</label>
          <input
            type="text"
            value={matricula}
            onChange={handleMatriculaChange}
            maxLength="8" // Limite de 8 dígitos
            pattern="\d*" // Apenas números
            placeholder="Digite 8 dígitos numéricos"
            required
          />
        </div>
        <div>
          <label>Curso:</label>
          <select value={curso} onChange={(e) => setCurso(e.target.value)} required>
            <option value="" disabled>Selecione um curso</option>
            {cursosDisponiveis.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.course_type}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
}

export default AdicionarAluno;
