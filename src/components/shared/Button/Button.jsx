import '@components/shared/Button/Button.module.css'

const Button =({icon, onClick, variant = "primary", className = ""}) => {
    return (
        <button className={`button ${variant === 'primary' ? '' : ''} ${className}`.trim()} onClick={onClick}>
            {icon}
        </button>
    )
}

export default Button;