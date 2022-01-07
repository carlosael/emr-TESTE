import { useEffect, useState } from "react";
import Header from "./components/Header";
import Employees from "./components/Tables/Employees";
import Jobs from "./components/Tables/Jobs";
import Resume from "./components/Resume";
import EmployeeModal from "./components/Modals/Add Employee/index";
import EditEmployeeModal from "./components/Modals/Edit Employee/index";
import JobsModal from "./components/Modals/Add Job/index";
import EditJobsModal from "./components/Modals/Edit Job/index";
import Filter from "./components/Filter/index";
import littleFilter from "./assets/filtro.svg";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [openJobsModal, setOpenJobsModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [editJobsModal, setEditJobsModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [employeeInEditing, setEmployeeInEditing] = useState([]);
  const [jobsInEditing, setJobsInEditing] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadEmployees()
    loadJobs()
  }, []);

  async function loadEmployees() {
    try {
      const response = await fetch("http://localhost:3000/funcionarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setEmployeeData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadJobs() {
    try {
      const response = await fetch("http://localhost:3000/cargos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setJobs(data);
      console.log("foi")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <div>
          <div className="filter-btn">
            <button
              className="open-filters-button"
              onClick={() => setOpenFilter(openFilter === false ? true : false)}
            >
              <img src={littleFilter} alt="Filter" />
              Filtrar
            </button>
          </div>
          {openFilter && (
            <Filter
              loadEmployees={loadEmployees}
              setEmployeeData={setEmployeeData}
              employeeData={employeeData}
            />
          )}

          <Employees
            employeeInEditing={employeeInEditing}
            setEmployeeInEditing={setEmployeeInEditing}
            loadEmployees={loadEmployees}
            setEmployeeData={setEmployeeData}
            employeeData={employeeData}
            editEmployeeModal={editEmployeeModal}
            setEditEmployeeModal={setEditEmployeeModal}
          />

          <Jobs
            employeeInEditing={employeeInEditing}
            setJobsInEditing={setJobsInEditing}
            loadJobs={loadJobs}
            setJobs={setJobs}
            jobs={jobs}
            editJobsModal={editJobsModal}
            setEditJobsModal={setEditJobsModal}
          />
        </div>

        <Resume
          setOpenJobsModal={setOpenJobsModal}
          setOpenEmployeeModal={setOpenEmployeeModal}
          employeeData={employeeData}
        />

        {openEmployeeModal && (
          <EmployeeModal
            jobs={jobs}
            loadEmployees={loadEmployees}
            openEmployeeModal={openEmployeeModal}
            setOpenEmployeeModal={setOpenEmployeeModal}
            setEmployeeData={setEmployeeData}
            employeeData={employeeData}
          />
        )}

        {openJobsModal && (
          <JobsModal
            setJobs={setJobs}
            jobs={jobs}
            loadJobs={loadJobs}
            openJobsModal={openJobsModal}
            setOpenJobsModal={setOpenJobsModal}
            setEmployeeData={setEmployeeData}
            employeeData={employeeData}
          />
        )}
        {editEmployeeModal && (
          <EditEmployeeModal
            loadEmployees={loadEmployees}
            employeeInEditing={employeeInEditing}
            jobs={jobs}
            setEmployeeInEditingInEditing={setEmployeeInEditing}
            editEmployeeModal={editEmployeeModal}
            setEditEmployeeModal={setEditEmployeeModal}
            setEmployeeData={setEmployeeData}
            employeeData={employeeData}
          />
        )}

        {editJobsModal && (
          <EditJobsModal
            loadJobs={loadJobs}
            loadEmployees={loadEmployees}
            jobsInEditing={jobsInEditing}
            setJobsInEditing={setJobsInEditing}
            editJobsModal={editJobsModal}
            setEditJobsModal={setEditJobsModal}
            setJobs={setJobs}
            jobs={jobs}
          />
        )}

      </main>
    </div>
  );
}

export default App;
