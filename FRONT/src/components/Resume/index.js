import "./style.css";
import Button from "../Button/index";

function Resume({ setOpenEmployeeModal,setOpenJobsModal }) {
  return (
    <>
      <div className="resume">
        <Button
          onClick={() => setOpenEmployeeModal(true)}
        >
          Cadastrar funcionário
        </Button>
        <br></br>
        <Button
          onClick={() => setOpenJobsModal(true)}
        >
          Cadastrar cargo
        </Button>
      </div>
    </>
  );
}

export default Resume;
