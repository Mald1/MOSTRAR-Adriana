import React, { useState } from "react";
import './ProgramarMundoSENAI.css';
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import ObservacoesModal from "../ObservacoesModal/ObservacoesModal";
import AlunoSelectorModal from "../AlunoSelector/AlunoSelectorModal";
import axios from 'axios';

function ProgramarMundoSENAI({ saveEvento, closeModal, eventoInicial }) {
  const [rangeData, setRangeData] = useState(eventoInicial?.rangeData || "");
  const [observacoes, setObservacoes] = useState(eventoInicial?.observacoes || "");
  const [selectedAlunos, setSelectedAlunos] = useState(eventoInicial?.alunos || []);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showObservacoesModal, setShowObservacoesModal] = useState(false);
  const [showAlunoSelectorModal, setShowAlunoSelectorModal] = useState(false);

  const handleSave = async () => {
    const evento = { rangeData, observacoes, alunos: selectedAlunos };
    console.log(evento)
    saveEvento(evento);
    closeModal();
  };

  const saveDateRange = (range) => {
    setRangeData(range);
  };

  const saveObservacoes = (obs) => {
    setObservacoes(obs);
  };

  const saveAlunos = (alunos) => {
    setSelectedAlunos(alunos);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Programar Mundo SENAI</h2>
        <div className="modal-buttons">
          <button onClick={() => setShowDatePicker(true)}>Data</button>
          <button onClick={() => setShowAlunoSelectorModal(true)}>Alunos</button>
          <button onClick={() => setShowObservacoesModal(true)}>Observações</button>
        </div>
        <button className="save-button" onClick={handleSave}>Salvar</button>
        <button className="cancel-button" onClick={closeModal}>Cancelar</button>
      </div>

      {showDatePicker && (
        <DateRangePicker 
          saveDateRange={saveDateRange}
          closeModal={() => setShowDatePicker(false)} 
        />
      )}

      {showObservacoesModal && (
        <ObservacoesModal 
          observacoesIniciais={observacoes}
          saveObservacoes={saveObservacoes}
          closeModal={() => setShowObservacoesModal(false)}
        />
      )}

      {showAlunoSelectorModal && (
        <AlunoSelectorModal
          alunosIniciais={selectedAlunos}
          saveAlunos={saveAlunos}
          closeModal={() => setShowAlunoSelectorModal(false)}
        />
      )}
    </div>
  );
}

export default ProgramarMundoSENAI;
