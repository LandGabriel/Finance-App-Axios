import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./Investimentos.css";

Chart.register(...registerables);

const Investimentos = () => {
  const [fundosImobiliarios, setFundosImobiliarios] = useState(
    JSON.parse(localStorage.getItem("fundosImobiliarios")) || 0
  );
  const [tesouroSelic, setTesouroSelic] = useState(
    JSON.parse(localStorage.getItem("tesouroSelic")) || 0
  );
  const [cdbs, setCDBs] = useState(
    JSON.parse(localStorage.getItem("cdbs")) || 0
  );
  const [acoes, setAcoes] = useState(
    JSON.parse(localStorage.getItem("acoes")) || 0
  );
  const [criptomoedas, setCriptomoedas] = useState(
    JSON.parse(localStorage.getItem("criptomoedas")) || 0
  );
  const [investimentoExterior, setInvestimentoExterior] = useState(
    JSON.parse(localStorage.getItem("investimentoExterior")) || 0
  );

  const [novoInvestimento, setNovoInvestimento] = useState({
    fundosImobiliarios: 0,
    tesouroSelic: 0,
    cdbs: 0,
    acoes: 0,
    criptomoedas: 0,
    investimentoExterior: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState({
    fundosImobiliarios,
    tesouroSelic,
    cdbs,
    acoes,
    criptomoedas,
    investimentoExterior,
  });

  useEffect(() => {
    localStorage.setItem(
      "fundosImobiliarios",
      JSON.stringify(fundosImobiliarios)
    );
    localStorage.setItem("tesouroSelic", JSON.stringify(tesouroSelic));
    localStorage.setItem("cdbs", JSON.stringify(cdbs));
    localStorage.setItem("acoes", JSON.stringify(acoes));
    localStorage.setItem("criptomoedas", JSON.stringify(criptomoedas));
    localStorage.setItem(
      "investimentoExterior",
      JSON.stringify(investimentoExterior)
    );
  }, [
    fundosImobiliarios,
    tesouroSelic,
    cdbs,
    acoes,
    criptomoedas,
    investimentoExterior,
  ]);

  const totalInvestimentos =
    fundosImobiliarios +
    tesouroSelic +
    cdbs +
    acoes +
    criptomoedas +
    investimentoExterior;

  const data = {
    labels: [
      "Fundos Imobiliários",
      "Tesouro Selic",
      "CDBs",
      "Ações",
      "Criptomoedas",
      "Investimento Exterior",
    ],
    datasets: [
      {
        label: "Investimentos",
        data: [
          fundosImobiliarios,
          tesouroSelic,
          cdbs,
          acoes,
          criptomoedas,
          investimentoExterior,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (acc, value) => acc + value,
              0
            );
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  const handleAddInvestimento = (e) => {
    e.preventDefault();
    setFundosImobiliarios(
      (prev) => prev + parseFloat(novoInvestimento.fundosImobiliarios)
    );
    setTesouroSelic((prev) => prev + parseFloat(novoInvestimento.tesouroSelic));
    setCDBs((prev) => prev + parseFloat(novoInvestimento.cdbs));
    setAcoes((prev) => prev + parseFloat(novoInvestimento.acoes));
    setCriptomoedas((prev) => prev + parseFloat(novoInvestimento.criptomoedas));
    setInvestimentoExterior(
      (prev) => prev + parseFloat(novoInvestimento.investimentoExterior)
    );
    setNovoInvestimento({
      fundosImobiliarios: 0,
      tesouroSelic: 0,
      cdbs: 0,
      acoes: 0,
      criptomoedas: 0,
      investimentoExterior: 0,
    });
  };

  const handleEditInvestimento = () => {
    setEditMode(!editMode);
    setEditValue({
      fundosImobiliarios,
      tesouroSelic,
      cdbs,
      acoes,
      criptomoedas,
      investimentoExterior,
    });
  };

  const handleSaveEdit = () => {
    setFundosImobiliarios(parseFloat(editValue.fundosImobiliarios));
    setTesouroSelic(parseFloat(editValue.tesouroSelic));
    setCDBs(parseFloat(editValue.cdbs));
    setAcoes(parseFloat(editValue.acoes));
    setCriptomoedas(parseFloat(editValue.criptomoedas));
    setInvestimentoExterior(parseFloat(editValue.investimentoExterior));
    setEditMode(false);
  };

  const resetInvestimentos = () => {
    setFundosImobiliarios(0);
    setTesouroSelic(0);
    setCDBs(0);
    setAcoes(0);
    setCriptomoedas(0);
    setInvestimentoExterior(0);
  };

  return (
    <div className="investimentos">
      <h1>Meus Investimentos</h1>

      <div className="form-section">
        <form onSubmit={handleAddInvestimento}>
          <div className="form-control">
            <label htmlFor="fundosImobiliarios">Fundos Imobiliários:</label>
            <input
              type="number"
              id="fundosImobiliarios"
              value={novoInvestimento.fundosImobiliarios}
              onChange={(e) =>
                setNovoInvestimento((prev) => ({
                  ...prev,
                  fundosImobiliarios: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="tesouroSelic">Tesouro Selic:</label>
            <input
              type="number"
              id="tesouroSelic"
              value={novoInvestimento.tesouroSelic}
              onChange={(e) =>
                setNovoInvestimento((prev) => ({
                  ...prev,
                  tesouroSelic: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="cdbs">CDBs:</label>
            <input
              type="number"
              id="cdbs"
              value={novoInvestimento.cdbs}
              onChange={(e) =>
                setNovoInvestimento((prev) => ({
                  ...prev,
                  cdbs: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="acoes">Ações:</label>
            <input
              type="number"
              id="acoes"
              value={novoInvestimento.acoes}
              onChange={(e) =>
                setNovoInvestimento((prev) => ({
                  ...prev,
                  acoes: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="criptomoedas">Criptomoedas:</label>
            <input
              type="number"
              id="criptomoedas"
              value={novoInvestimento.criptomoedas}
              onChange={(e) =>
                setNovoInvestimento((prev) => ({
                  ...prev,
                  criptomoedas: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="investimentoExterior">Investimento Exterior:</label>
            <input
              type="number"
              id="investimentoExterior"
              value={novoInvestimento.investimentoExterior}
              onChange={(e) =>
                setNovoInvestimento((prev) => ({
                  ...prev,
                  investimentoExterior: e.target.value,
                }))
              }
            />
          </div>
          <button type="submit">Adicionar Investimento</button>
        </form>
      </div>

      <div className="reset-section">
        <button onClick={resetInvestimentos}>
          Resetar Todos os Investimentos
        </button>
      </div>

      <div className="investimentos-section">
        <h2>Exibição de Investimentos</h2>
        <ul>
          <li>
            Fundos Imobiliários:{" "}
            {editMode ? (
              <input
                type="number"
                value={editValue.fundosImobiliarios}
                onChange={(e) =>
                  setEditValue((prev) => ({
                    ...prev,
                    fundosImobiliarios: e.target.value,
                  }))
                }
              />
            ) : (
              fundosImobiliarios
            )}
          </li>
          <li>
            Tesouro Selic:{" "}
            {editMode ? (
              <input
                type="number"
                value={editValue.tesouroSelic}
                onChange={(e) =>
                  setEditValue((prev) => ({
                    ...prev,
                    tesouroSelic: e.target.value,
                  }))
                }
              />
            ) : (
              tesouroSelic
            )}
          </li>
          <li>
            CDBs:{" "}
            {editMode ? (
              <input
                type="number"
                value={editValue.cdbs}
                onChange={(e) =>
                  setEditValue((prev) => ({
                    ...prev,
                    cdbs: e.target.value,
                  }))
                }
              />
            ) : (
              cdbs
            )}
          </li>
          <li>
            Ações:{" "}
            {editMode ? (
              <input
                type="number"
                value={editValue.acoes}
                onChange={(e) =>
                  setEditValue((prev) => ({
                    ...prev,
                    acoes: e.target.value,
                  }))
                }
              />
            ) : (
              acoes
            )}
          </li>
          <li>
            Criptomoedas:{" "}
            {editMode ? (
              <input
                type="number"
                value={editValue.criptomoedas}
                onChange={(e) =>
                  setEditValue((prev) => ({
                    ...prev,
                    criptomoedas: e.target.value,
                  }))
                }
              />
            ) : (
              criptomoedas
            )}
          </li>
          <li>
            Investimento Exterior:{" "}
            {editMode ? (
              <input
                type="number"
                value={editValue.investimentoExterior}
                onChange={(e) =>
                  setEditValue((prev) => ({
                    ...prev,
                    investimentoExterior: e.target.value,
                  }))
                }
              />
            ) : (
              investimentoExterior
            )}
          </li>
        </ul>
        <button onClick={editMode ? handleSaveEdit : handleEditInvestimento}>
          {editMode ? "Salvar" : "Editar"}
        </button>
      </div>

      <div className="chart-section">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Investimentos;
