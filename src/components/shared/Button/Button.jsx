import '../../shared/Button/Button.module.css'

const Button =({icon, onClick, variant = "primary"}) => {
    return (
        <button className={variant == "primary"? "songInfoTr": "songInfoFl"} onClick={onClick}>
            {icon}
        </button>   
    )
}

export default Button;