import "./style.css";
import Logo from "../../assets/EMR.svg";

export function Header() {
  return (
    <div className="container-header">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <h1> - Registros</h1>
      </div>
    </div>
  );
}

export default Header;
