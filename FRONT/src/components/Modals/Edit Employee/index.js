import "./style.css";
import Button from "../../Button/index";
import CloseBtn from "../../../assets/closeBtn.svg";
import { useState } from "react";

export function EditModal(props) {
  const [nome, setNome] = useState(props.employeeInEditing.nome);
  const [sobrenome, setSobrenome] = useState(props.employeeInEditing.sobrenome);
  const [cargo, setCargo] = useState(props.employeeInEditing.cargo_id);
  const [salario, setSalario] = useState(props.employeeInEditing.salario);

  const newAdmissionDate = props.employeeInEditing.data_de_admissao.slice(0,10);
  const newBirthDate = props.employeeInEditing.data_de_nascimento.slice(0,10);
    
  const [dataDeNascimento, setDataDeNascimento] = useState(newBirthDate);
  const [dataDeAdmissao, setDataDeAdmissao] = useState(newAdmissionDate);
  console.log(props.employeeInEditing.data_de_nascimento)

  async function handleEditTransaction(transactionId) {
    const body = {
      nome,
      sobrenome,
      cargo_id: cargo,
      data_de_nascimento: dataDeNascimento,
      data_de_admissao: dataDeAdmissao,
      salario
    };

    try {
      await fetch(`http://localhost:3000/funcionarios/${transactionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const newArray = props.employeeData.map((transaction) => {
        if (transaction.id === transactionId) {
          return {
            ...body,
            id: transactionId,
          };
        }
        return transaction;
      });

      props.setEmployeeData(newArray);
      props.Employees()
    } catch (error) {
      console.log(error);
    }

    props.setEditEmployeeModal(false);
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="add-register">
          <h1>Editar Funcionário</h1>
          <img
            src={CloseBtn}
            alt="Close button"
            onClick={() => props.setEditEmployeeModal(false)}
            className="close-icon"
          />
        </div>
        <div className="data-input">
          <label htmlFor="value">Nome</label>
          <input 
          type="text" 
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          />
          <label htmlFor="sobrenome">Sobrenome</label>
          <input 
          type="text" 
          onChange={(e) => setSobrenome(e.target.value)}
          value={sobrenome}
          />
          <label htmlFor="cargo">Cargo</label>
          <select name="jobs"
          onChange={(e) => setCargo(e.target.value)}
          value={cargo}>
            {props.jobs.map(job => {
              return (
                <option value={job.id}>{job.cargo}</option>
              )
            })}
          </select>
          <label htmlFor="dataDeNascimento">Data de nascimento</label>
          <input 
          type="date" 
          onChange={(e) => setDataDeNascimento(e.target.value)}
          value={dataDeNascimento}
          />
          <label htmlFor="dataDeAdmissao">Data de admissão</label>
          <input 
          type="date" 
          onChange={(e) => setDataDeAdmissao(e.target.value)}
          value={dataDeAdmissao}
          />
          <label htmlFor="salario">Salário</label>
          <input 
          type="number" 
          onChange={(e) => setSalario(e.target.value)}
          value={salario}
          />
        </div>
        <div className="confirm-btn">
          <Button
            className="btn-insert"
            style={{
              background: "#645FFB",
              color: "#FFF",
              width: "236px",
            }}
            onClick={() => handleEditTransaction(props.employeeInEditing.id)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
