import './button.css'
const Button = ({children, onClick}) => {
  return (
    <div>
      <button className="button" onClick={onClick} >
        <span className="button-content">{children}</span>
      </button>
    </div>
  );
}
 
export default Button;