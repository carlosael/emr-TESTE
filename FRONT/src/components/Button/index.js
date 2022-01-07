import './style.css';

export function Button ({children, ...rest}) {
    return (
        <button {...rest} className="btn-add">{children}</button>
    )
}

export default Button;