import React, { useState, useEffect } from "react";
import "./Gastos.css";

const Gastos = () => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [despesas, setDespesas] = useState(
    JSON.parse(localStorage.getItem("despesas")) || []
  );
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddDespesa = () => {
    const newDespesa = { tipo, valor, categoria };
    const updatedDespesas = [...despesas, newDespesa];
    setDespesas(updatedDespesas);
    localStorage.setItem("despesas", JSON.stringify(updatedDespesas));
    setTipo("");
    setValor("");
    setCategoria("");
  };

  const handleEditDespesa = (index) => {
    const despesa = despesas[index];
    setTipo(despesa.tipo);
    setValor(despesa.valor);
    setCategoria(despesa.categoria);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedDespesas = despesas.map((despesa, index) =>
      index === editingIndex ? { tipo, valor, categoria } : despesa
    );
    setDespesas(updatedDespesas);
    localStorage.setItem("despesas", JSON.stringify(updatedDespesas));
    setTipo("");
    setValor("");
    setCategoria("");
    setEditingIndex(null);
  };

  const handleDeleteDespesa = (index) => {
    const updatedDespesas = despesas.filter((_, i) => i !== index);
    setDespesas(updatedDespesas);
    localStorage.setItem("despesas", JSON.stringify(updatedDespesas));
  };

  return (
    <div className="gastos">
      <h1>Gastos</h1>
      <div className="form-control">
        <label htmlFor="tipo">Tipo de Gasto:</label>
        <input
          type="text"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="valor">Valor (R$):</label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="categoria">Categoria:</label>
        <input
          type="text"
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <button
        onClick={editingIndex === null ? handleAddDespesa : handleSaveEdit}
      >
        {editingIndex === null ? "Adicionar Despesa" : "Salvar Edição"}
      </button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((despesa, index) => (
              <tr key={index}>
                <td data-label="Tipo">{despesa.tipo}</td>
                <td data-label="Valor">{despesa.valor}</td>
                <td data-label="Categoria">{despesa.categoria}</td>
                <td data-label="Ações">
                  <div className="btn-container">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditDespesa(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteDespesa(index)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gastos;
