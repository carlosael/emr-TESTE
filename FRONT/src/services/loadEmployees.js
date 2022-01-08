async function loadEmployees(setEmployeeData) {
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

  export default loadEmployees;