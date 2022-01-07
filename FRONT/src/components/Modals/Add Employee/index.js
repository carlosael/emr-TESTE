import "./style.css";
import Button from "../../Button/index";
import CloseBtn from "../../../assets/closeBtn.svg";
import { useState } from "react";

export function Modal(props) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cargo, setCargo] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [dataDeAdmissao, setDataDeAdmissao] = useState('');
  const [salario, setSalario] = useState();

  async function handleRegisterTransaction () {
    const body = {
      nome,
      sobrenome,
      cargo_id: cargo,
      data_de_nascimento: dataDeNascimento,
      data_de_admissao: dataDeAdmissao,
      salario
    }

    try {
      await fetch('http://localhost:3000/funcionarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(dataDeAdmissao)
    props.loadEmployees();
    } catch (error) {
      console.log(error)
    }

    props.setOpenEmployeeModal(false);
}
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="add-register">
          <h1>Adicionar Funcionário</h1>
          <img
            src={CloseBtn}
            alt="Close button"
            onClick={() => props.setOpenEmployeeModal(false)}
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
            <option >Selecione um cargo</option>
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
            onClick={() => handleRegisterTransaction()}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
