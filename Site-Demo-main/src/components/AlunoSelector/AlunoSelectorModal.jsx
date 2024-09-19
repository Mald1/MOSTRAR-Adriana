import React, { useState, useEffect } from "react";
import './AlunoSelectorModal.css';
import axios from 'axios';

function AlunoSelectorModal({ alunosIniciais = [], saveAlunos, closeModal }) {
  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState(alunosIniciais);

  // Função para buscar os alunos da API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/mundo-senai-aluno");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  // Executa a busca de alunos quando o componente é montado
  useEffect(() => {
    fetchStudents();
  }, []);

  // Função para selecionar o aluno e atribuir uma função
  const handleAlunoClick = (aluno, funcao) => {
    const alunoComFuncao = { ...aluno, funcao };  // Adiciona a função ao aluno selecionado
    setSelectedAlunos((prevSelected) =>
      prevSelected.some((a) => a.id === aluno.id)
        ? prevSelected.map((a) => (a.id === aluno.id ? alunoComFuncao : a))
        : [...prevSelected, alunoComFuncao]
    );
  };

  // Função para salvar a função de cada aluno
  const handleFuncaoChange = (e, aluno) => {
    const funcao = e.target.value;
    handleAlunoClick(aluno, funcao);
  };

  // Função para salvar os alunos selecionados
  const handleSave = () => {
    saveAlunos(selectedAlunos);
    closeModal();
  };

  // Função para verificar se o aluno já foi selecionado
  const isAlunoSelected = (alunoId) => {
    return selectedAlunos.some((aluno) => aluno.id === alunoId);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content aluno-selector-modal">
        <h2>Selecione os Alunos</h2>
        <main>
          <ul className="aluno-list">
            {alunos.map((aluno) => (
              <li
                key={aluno.id}  // Adicionado key única para cada item da lista
                className={`aluno-item ${isAlunoSelected(aluno.id) ? "selected" : ""}`}
              >
                <p><strong>Nome:</strong> {aluno.first_name} {aluno.last_name}</p>
                <p><strong>Curso ID:</strong> {aluno.courseId}</p>
                <select onChange={(e) => handleFuncaoChange(e, aluno)}>
                  <option value="">Selecione uma função</option>
                  <option value="Organizador">Organizador</option>
                  <option value="Voluntário">Voluntário</option>
                  <option value="Apresentador">Apresentador</option>
                </select>
              </li>
            ))}
          </ul>
        </main>
        <div className="modal-actions">
          <button className="save-button" onClick={handleSave}>Salvar</button>
          <button className="cancel-button" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AlunoSelectorModal;
