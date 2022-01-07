import "./style.css";
import Button from "../../Button/index";
import CloseBtn from "../../../assets/closeBtn.svg";
import { useState } from "react";

export function EditModal(props) {
  const [cargo, setCargo] = useState(props.jobsInEditing.cargo);
  const [descricao, setDescricao] = useState(props.jobsInEditing.descricao);
  const [atividades, setAtividades] = useState(props.jobsInEditing.atividades);

  async function handleEditTransaction(jobId) {
    const body = {
      cargo,
      descricao,
      atividades,
    };

    try {
      await fetch(`http://localhost:3000/cargos/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const newArray = props.jobs.map((job) => {
        if (job.id === jobId) {
          return {
            ...body,
            id: jobId,
          };
        }
        return job;
      });

      props.setJobs(newArray);
      props.loadJobs();
      props.Employees();
    } catch (error) {
      console.log(error);
    }


    props.setEditJobsModal(false);
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="add-register">
          <h1>Editar Cargo</h1>
          <img
            src={CloseBtn}
            alt="Close button"
            onClick={() => props.setEditJobsModal(false)}
            className="close-icon"
          />
        </div>
        <div className="data-input">
          <label htmlFor="value">Cargo</label>
            <input 
            type="text" 
            onChange={(e) => setCargo(e.target.value)}
            value={cargo}
            />
            <label htmlFor="descricao">Descrição</label>
            <input 
            type="text" 
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            />
            <label htmlFor="atividades">Atividades</label>
            <input 
            type="text" 
            onChange={(e) => setAtividades(e.target.value)}
            value={atividades}
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
            onClick={() => handleEditTransaction(props.jobsInEditing.id)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
