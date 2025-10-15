const Button =({icon, onClick, className = ""}) => {
    return (
        <button 
            style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                backgroundColor: 'transparent',
                transition: 'opacity 0.3s ease'
            }}
            className={className}
            onClick={onClick}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
            {icon}
        </button>
    )
}

export default Button;