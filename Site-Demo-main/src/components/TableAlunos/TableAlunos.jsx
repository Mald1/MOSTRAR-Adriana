import React, { useEffect, useState } from 'react';
import axios from 'axios';


function TableAlunos() {
  // Estado para armazenar os dados dos alunos
  const [alunos, setAlunos] = useState([]);

  // Função para buscar os dados dos alunos da API
  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students/table');
      setAlunos(response.data); // Armazena os dados retornados no estado
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  // useEffect para carregar os dados assim que o componente for montado
  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="table-alunos-container">
      <h2>Lista de Alunos</h2>
      <table className="alunos-table">
        <thead>
          <tr>
            <th>Primeiro Nome</th>
            <th>Sobrenome</th>
            <th>Matrícula</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {alunos.length > 0 ? (
            alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.first_name}</td>
                <td>{aluno.last_name}</td>
                <td>{aluno.matricula}</td>
                <td>{aluno.course?.course_type || 'Sem Curso'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableAlunos;
