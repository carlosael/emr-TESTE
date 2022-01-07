import { useState } from "react";
import "./style.css";
import Pen from "../../../assets/lapis.svg";
import Trashcan from "../../../assets/lixeira.svg";
import DownArrow from "../../../assets/setaPraBaixo.svg";
import UpArrow from "../../../assets/setaFiltro.svg";
import Indicator from "../../../assets/indicador.svg";

export function Table({ employeeData, loadEmployees, setEditEmployeeModal,setEmployeeInEditing,setEmployeeData }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [arrowDirection, setArrowDirection] = useState(true);
  const [orderByBirthDate, setOrderByBirthDate] = useState("decrescent");
  const [orderByAdmissionDate, setOrderByAdmissionDate] = useState("");
  const [orderBySalary, setOrderBySalary] = useState("");

  function handleOrderBySalary () {
    if (orderBySalary === "" || orderBySalary === "decrescent") {
      setOrderByAdmissionDate("")
      setOrderByBirthDate("")
      setArrowDirection(true);
      setOrderBySalary("crescent");

      const transactionsInOrderCrescentByValues = employeeData.sort((a, b) => (a.salario) - (b.salario));

      setEmployeeData(transactionsInOrderCrescentByValues);
    } else {
      setArrowDirection(false);
      setOrderBySalary("decrescent");

      const transactionsInOrderByValues = employeeData.sort((a, b) => (b.salario) - (a.salario));

      setEmployeeData(transactionsInOrderByValues);
    }
    
  }

  async function handleDelete(transactionId) {
    try {
      await fetch(`http://localhost:3000/funcionarios/${transactionId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    setDeleteModal(false);
    await loadEmployees();
    setDeleteId(null)
  }

  function handleOrderByBirthDate () {
    if (orderByBirthDate === "" || orderByBirthDate === "decrescent") {
      setArrowDirection(false)
      setOrderByBirthDate("crescent")
      setOrderBySalary("")
      setOrderByAdmissionDate("")

      const dataInOrder = employeeData.sort(function(a,b) {
        const firstDate =  a.data_de_nascimento.split('/').reverse().join('');
        const secondDate = b.data_de_nascimento.split('/').reverse().join('');
        return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
      });

      setEmployeeData(dataInOrder);
    } else {
      setOrderByBirthDate("decrescent")
      setOrderBySalary("")
      setArrowDirection(true)
      const dataInOrder = employeeData.sort(function(a,b) {
        const firstDate =  a.data_de_nascimento.split('/').reverse().join('');
        const secondDate = b.data_de_nascimento.split('/').reverse().join('');
        return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
      });

    setEmployeeData(dataInOrder);
    }
  }

  function handleOrderByAdmissionDate () {
    if (orderByAdmissionDate === "" || orderByAdmissionDate === "decrescent") {
      setArrowDirection(true)
      setOrderByBirthDate("")
      setOrderBySalary("")
      setOrderByAdmissionDate("crescent")

      const dataInOrder = employeeData.sort(function(a,b) {
        const firstDate =  a.data_de_admissao.split('/').reverse().join('');
        const secondDate = b.data_de_admissao.split('/').reverse().join('');
        return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
      });

      setEmployeeData(dataInOrder);
    } else {
      setOrderByAdmissionDate("decrescent")
      setOrderBySalary("")
      setArrowDirection(false)
      const dataInOrder = employeeData.sort(function(a,b) {
        const firstDate =  a.data_de_admissao.split('/').reverse().join('');
        const secondDate = b.data_de_admissao.split('/').reverse().join('');
        return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
      });

    setEmployeeData(dataInOrder);
    }
  }


function formatDate(date) {
  let newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

  return formattedDate;
}

  return (
    <div className="table">
      <div className="table-head">
        <span className="head-item no-cursor">Nome</span>
        <span className="head-item no-cursor">Sobrenome</span>
        <span className="head-item no-cursor">Cargo</span>
        <span 
        className="head-item"
        onClick={() => handleOrderByBirthDate()}
        >
          Data de nascimento
        {orderByBirthDate && <img src={arrowDirection === false ? DownArrow : UpArrow} alt="Down arrow"/>}
        </span>
        <span 
        className="head-item"
        onClick={() => handleOrderByAdmissionDate()}
        >
          Data de admissão
        {orderByAdmissionDate && <img src={arrowDirection === false ? DownArrow : UpArrow} alt="Down arrow"/>}
        </span>
        <span className="head-item"
        onClick={() => handleOrderBySalary()}
        >Salário
        {orderBySalary && <img src={arrowDirection === false ? DownArrow : UpArrow} alt="Down arrow"/>}</span>
        <span className="head-item no-cursor"></span>
        
      </div>
      <div className="table-body">
        {employeeData.map((transaction) => (
          <div className="table-line" key={transaction.id}>
            <span className="table-item">{transaction.nome}</span>
            <span className="table-item">{transaction.sobrenome}</span>
            <span className="table-item">{transaction.cargo}</span>
            <span 
            className="table-item"
            style={{
              fontWeight: "bold"
            }}
            >{formatDate(transaction.data_de_nascimento)}</span>
            <span 
            className="table-item"
            style={{
              fontWeight: "bold"
            }}
            >{formatDate(transaction.data_de_admissao)}</span>
            <span className="table-item">R$ {parseFloat(transaction.salario).toFixed(2)}</span>
            <div className="edit-delete-icons">
              <img
                id={transaction.id}
                src={Pen}
                alt="Pen"
                className="edit-icon"
                onClick={() => {
                  setEditEmployeeModal(true);
                  setEmployeeInEditing({ ...transaction });
                }}
              />
              <img
                src={Trashcan}
                alt="Trash Can"
                className="delete-icon"
                id={transaction.id}
                onClick={() => {
                  setDeleteModal(true);
                  setDeleteId(transaction.id)
                }}
              />
              {deleteModal && deleteId === transaction.id && (
                <>
                <img src={Indicator} className="indicator" alt="Indicator"/>
                  <div className="container-confirm-delete">
                    <p>Apagar item?</p>
                    <div className="confirm-delete-btns">
                      <button 
                      className="btn-actions-confirm-delete"
                      onClick={() => handleDelete(transaction.id)}>
                        Sim
                      </button>
                      <button 
                      className="btn-actions-deny-delete"
                      onClick={() => setDeleteModal(false)}>Não</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
