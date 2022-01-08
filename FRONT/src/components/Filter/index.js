import "./style.css";
import Button from "../Button/index";
import { useEffect, useState } from "react";
import buttonsStyles from "../../helpers/buttonsStyles";

function Filter({ employeeData, setEmployeeData, loadEmployees }) {
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const allCategories = employeeData.map(
      (employee) => employee.cargo
    );
    setCategories(allCategories);
  }, [employeeData]);


  function handleCategories(category) {
    const categoryFound = selectedCategories.some((c) => c === category);

    if (categoryFound) {
      const newArray = selectedCategories.filter((c) => c !== category);
      setSelectedCategories(newArray);
      return;
    }

    categories.map((c) => {
      if (c === category) {
        setSelectedCategories([...selectedCategories, category]);
        return;
      }
    });
  }

  function handleFilter() {
    if (!minValue || !maxValue) return;

    if (minValue >= maxValue) return;

    const filteredTransactions = employeeData.filter((employee) => {
      if (employee.salario >= minValue && employee.salario <= maxValue) {
        if (selectedCategories.length !== 0) {
          return (
            selectedCategories.includes(employee.cargo)
          );
        } else {
          return true;
        }
      }
    });

    setEmployeeData(filteredTransactions);
  }

  async function handleClearFilters() {
    await loadEmployees(setEmployeeData);
    setMaxValue("");
    setMinValue("");
    setSelectedCategories([]);
  }

  return (
    <div className="container-filter">
      <div className="cards">
        
        <div className="card">
          <h1>Cargos</h1>
          <div className="categories">
            {[...new Set(categories)].map((category) => (
              <button
                className="container-ship"
                key={category}
                onClick={() => handleCategories(category)}
                style={{
                  background: selectedCategories.some((c) => c === category)
                    && "#7B61FF",
                  color: selectedCategories.some((c) => c === category)
                    && "white",
                }}
              >
                {category}{" "}
                <span>
                  {selectedCategories.some((c) => c === category) ? "x" : "+"}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <h1>Valor</h1>
          <label htmlFor="min">Min</label>
          <input
            type="number"
            id="min-value"
            className="min-value"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
          <label htmlFor="max">Max</label>
          <input
            type="number"
            id="max-value"
            className="max-value"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
        <div className="filter-btns">
          <Button
            className="btn-clear-filters"
            style={buttonsStyles.clearFilter}
            onClick={handleClearFilters}
          >
            Limpar Filtros
          </Button>
          <Button
            onClick={() => handleFilter()}
            className="btn-apply-filters"
            style={buttonsStyles.applyFilter}
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
