import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [entradas, setEntradas] = useState(
    JSON.parse(localStorage.getItem("entradas")) || []
  );
  const [saidas, setSaidas] = useState(
    JSON.parse(localStorage.getItem("saidas")) || []
  );
  const [totalEntrada, setTotalEntrada] = useState(0);
  const [totalSaida, setTotalSaida] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const totalEntradas = entradas.reduce(
      (acc, cur) => acc + parseFloat(cur),
      0
    );
    const totalSaidas = saidas.reduce((acc, cur) => acc + parseFloat(cur), 0);
    setTotalEntrada(totalEntradas);
    setTotalSaida(totalSaidas);
    setSaldo(totalEntradas - totalSaidas);
  }, [entradas, saidas]);

  const handleAddEntrada = () => {
    if (!isNaN(parseFloat(entrada))) {
      const updatedEntradas = [...entradas, entrada];
      setEntradas(updatedEntradas);
      localStorage.setItem("entradas", JSON.stringify(updatedEntradas));
      setEntrada("");
    }
  };

  const handleAddSaida = () => {
    if (!isNaN(parseFloat(saida))) {
      const updatedSaidas = [...saidas, saida];
      setSaidas(updatedSaidas);
      localStorage.setItem("saidas", JSON.stringify(updatedSaidas));
      setSaida("");
    }
  };

  const handleEditEntrada = () => {
    const newEntrada = prompt("Editar total de entradas:", totalEntrada);
    if (newEntrada !== null && !isNaN(parseFloat(newEntrada))) {
      const updatedEntradas = entradas.map((_, index) => {
        if (index === 0) {
          return parseFloat(newEntrada);
        }
        return 0;
      });
      setEntradas(updatedEntradas);
      localStorage.setItem("entradas", JSON.stringify(updatedEntradas));
    }
  };

  const handleEditSaida = () => {
    const newSaida = prompt("Editar total de saídas:", totalSaida);
    if (newSaida !== null && !isNaN(parseFloat(newSaida))) {
      const updatedSaidas = saidas.map((_, index) => {
        if (index === 0) {
          return parseFloat(newSaida);
        }
        return 0;
      });
      setSaidas(updatedSaidas);
      localStorage.setItem("saidas", JSON.stringify(updatedSaidas));
    }
  };

  // SVG do ícone para as saídas
  const SaidaIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#c70000"
      viewBox="0 0 256 256"
      style={{ marginLeft: "8px", verticalAlign: "middle" }}
    >
      <path d="M231.39,132.94A8,8,0,0,0,224,128H184V104a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8v24H32a8,8,0,0,0-5.66,13.66l96,96a8,8,0,0,0,11.32,0l96-96A8,8,0,0,0,231.39,132.94ZM128,220.69,51.31,144H80a8,8,0,0,0,8-8V112h80v24a8,8,0,0,0,8,8h28.69ZM72,40a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,40Zm0,32a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,72Z"></path>
    </svg>
  );

  // SVG do ícone para as entradas
  const EntradaIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#01e930"
      viewBox="0 0 256 256"
      style={{ marginLeft: "8px", verticalAlign: "middle" }}
    >
      <path d="M229.66,114.34l-96-96a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,32,128H72v24a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8V128h40a8,8,0,0,0,5.66-13.66ZM176,112a8,8,0,0,0-8,8v24H88V120a8,8,0,0,0-8-8H51.31L128,35.31,204.69,112Zm8,104a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,216Zm0-32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,184Z"></path>
    </svg>
  );
  const SaldoIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="#d8db00"
      viewBox="0 0 256 256"
      style={{ marginLeft: "8px", verticalAlign: "middle" }}
    >
      <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
    </svg>
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="summary">
        <div className="total-entrada">
          <h2>
            Total Entrada: R$ {totalEntrada.toFixed(2)}
            {EntradaIcon}
          </h2>
          <button onClick={handleEditEntrada}>Editar Total Entrada</button>
        </div>
        <div className="total-saida">
          <h2>
            Total Saída: R$ {totalSaida.toFixed(2)}
            {SaidaIcon}
          </h2>
          <button onClick={handleEditSaida}>Editar Total Saída</button>
        </div>
        <div className="saldo">
          <h2>
            Saldo: R$ {saldo.toFixed(2)}
            {SaldoIcon}
          </h2>{" "}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="entrada">Entrada:</label>
        <input
          type="text"
          id="entrada"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        <button onClick={handleAddEntrada}>Adicionar Entrada</button>
      </div>
      <div className="form-control">
        <label htmlFor="saida">Saída:</label>
        <input
          type="text"
          id="saida"
          value={saida}
          onChange={(e) => setSaida(e.target.value)}
        />
        <button onClick={handleAddSaida}>Adicionar Saída</button>
      </div>
    </div>
  );
};

export default Dashboard;
