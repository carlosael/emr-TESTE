import { useState } from "react";
import "./style.css";
import Pen from "../../../assets/lapis.svg";
import Trashcan from "../../../assets/lixeira.svg";
import Indicator from "../../../assets/indicador.svg";

export function Table({ jobs, loadJobs, setEditJobsModal,setJobsInEditing,setJobs }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete(transactionId) {
    try {
      await fetch(`http://localhost:3000/cargos/${transactionId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    setDeleteModal(false);
    await loadJobs();
    setDeleteId(null)
  }

  return (
    <div className="table">
      <div className="table-head">
        <span className="head-item">Cargo</span>
        <span className="head-item">Descrição</span>
        <span className="head-item">Atividades</span>
        <span className="head-item"></span>
      </div>
      <div className="table-body">
        {jobs.map((job) => (
          <div className="table-line" key={job.id}>
            <span className="table-item">{job.cargo}</span>
            <span className="table-item">{job.descricao}</span>
            <span className="table-item">{job.atividades}</span>
            <div className="edit-delete-icons">
              <img
                id={job.id}
                src={Pen}
                alt="Pen"
                className="edit-icon"
                onClick={() => {
                  setEditJobsModal(true);
                  setJobsInEditing({ ...job });
                }}
              />
              <img
                src={Trashcan}
                alt="Trash Can"
                className="delete-icon"
                id={job.id}
                onClick={() => {
                  setDeleteModal(true);
                  setDeleteId(job.id)
                }}
              />
              {deleteModal && deleteId === job.id && (
                <>
                <img src={Indicator} className="indicator" alt="Indicator"/>
                  <div className="container-confirm-delete">
                    <p>Apagar item?</p>
                    <div className="confirm-delete-btns">
                      <button 
                      className="btn-actions-confirm-delete"
                      onClick={() => handleDelete(job.id)}>
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
