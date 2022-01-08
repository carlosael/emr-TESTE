import { useState } from "react";
import "./style.css";
import Pen from "../../../assets/lapis.svg";
import Trashcan from "../../../assets/lixeira.svg";
import DownArrow from "../../../assets/setaPraBaixo.svg";
import UpArrow from "../../../assets/setaFiltro.svg";
import Indicator from "../../../assets/indicador.svg";
import sortEmployees from "../../../helpers/sortEmployees";

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

  
  function handleOrderByBirthDate () {
    if (orderByBirthDate === "" || orderByBirthDate === "decrescent") {
      setArrowDirection(false)
      setOrderByBirthDate("crescent")
      setOrderBySalary("")
      setOrderByAdmissionDate("")
      
      const dataInOrder = employeeData.sort(sortEmployees.byBirthAsc);
      
      setEmployeeData(dataInOrder);
    } else {
      setOrderByBirthDate("decrescent")
      setOrderBySalary("")
      setArrowDirection(true)
      const dataInOrder = employeeData.sort(sortEmployees.byBirthDsc);
      
      setEmployeeData(dataInOrder);
    }
  }
  
  function handleOrderByAdmissionDate () {
    if (orderByAdmissionDate === "" || orderByAdmissionDate === "decrescent") {
      setArrowDirection(true)
      setOrderByBirthDate("")
      setOrderBySalary("")
      setOrderByAdmissionDate("crescent")
      
      const dataInOrder = employeeData.sort(sortEmployees.byAdmissionAsc);
      
      setEmployeeData(dataInOrder);
    } else {
      setOrderByAdmissionDate("decrescent")
      setOrderBySalary("")
      setArrowDirection(false)
      const dataInOrder = employeeData.sort(sortEmployees.byAdmissionDsc);
      
      setEmployeeData(dataInOrder);
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
    await loadEmployees(setEmployeeData);
    setDeleteId(null)
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
        {orderByBirthDate && <img src={arrowDirection ? UpArrow : DownArrow} alt="Down arrow"/>}
        </span>
        <span 
        className="head-item"
        onClick={() => handleOrderByAdmissionDate()}
        >
          Data de admissão
        {orderByAdmissionDate && <img src={arrowDirection ? UpArrow : DownArrow} alt="Down arrow"/>}
        </span>
        <span className="head-item"
        onClick={() => handleOrderBySalary()}
        >Salário
        {orderBySalary && <img src={arrowDirection ? UpArrow : DownArrow} alt="Down arrow"/>}</span>
        <span className="head-item no-cursor"></span>
        
      </div>
      <div className="table-body">
        {employeeData.map((employee) => (
          <div className="table-line" key={employee.id}>
            <span className="table-item">{employee.nome}</span>
            <span className="table-item">{employee.sobrenome}</span>
            <span className="table-item">{employee.cargo}</span>
            <span 
            className="table-item"
            style={{
              fontWeight: "bold"
            }}
            >{formatDate(employee.data_de_nascimento)}</span>
            <span 
            className="table-item"
            style={{
              fontWeight: "bold"
            }}
            >{formatDate(employee.data_de_admissao)}</span>
            <span className="table-item">R$ {parseFloat(employee.salario).toFixed(2)}</span>
            <div className="edit-delete-icons">
              <img
                id={employee.id}
                src={Pen}
                alt="Pen"
                className="edit-icon"
                onClick={() => {
                  setEditEmployeeModal(true);
                  setEmployeeInEditing({ ...employee });
                }}
              />
              <img
                src={Trashcan}
                alt="Trash Can"
                className="delete-icon"
                id={employee.id}
                onClick={() => {
                  setDeleteModal(true);
                  setDeleteId(employee.id)
                }}
              />
              {deleteModal && deleteId === employee.id && (
                <>
                <img src={Indicator} className="indicator" alt="Indicator"/>
                  <div className="container-confirm-delete">
                    <p>Apagar item?</p>
                    <div className="confirm-delete-btns">
                      <button 
                      className="btn-actions-confirm-delete"
                      onClick={() => handleDelete(employee.id)}>
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
