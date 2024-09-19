import React, { useState } from "react";
import AdicionarAluno from '../../components/AdicionarAluno/AdicionarAluno.jsx';
import './Alunos.css';
import TableAlunos from "../../components/TableAlunos/TableAlunos.jsx";

function Alunos() {
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState(null);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleFormMode = (mode) => {
    setFormMode(mode);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormMode(null);
  };

  return (
    <div className="alunos-container">
      <h1>Gerenciamento de Alunos</h1>
      <button className="add-aluno-button" onClick={handleAddClick}>
        Adicionar Aluno
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-size">
            {!formMode ? (
              <div className="modal-contenti">
                <div className="div-close">
                <button id="button-close" onClick={() => closeModal()}>X</button>
                </div>
                <h2>O que você quer fazer?</h2>
                <button onClick={() => handleFormMode("adicionar")}>Adicionar</button>
                <button onClick={() => handleFormMode("editar")}>Editar</button>
              </div>
            ) : (
              <AdicionarAluno mode={formMode} closeModal={closeModal} />
            )}
          </div>
        </div>
        
      )}
      <TableAlunos/>
    </div>
  );
}

export default Alunos;
