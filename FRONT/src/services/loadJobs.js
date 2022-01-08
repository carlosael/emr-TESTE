async function loadJobs(setJobs) {
    try {
      const response = await fetch("http://localhost:3000/cargos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  }

  export default loadJobs;