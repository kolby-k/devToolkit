interface Props {
  label: string;
  type: string;
  handleClick: () => void;
}
function Button({ label, type, handleClick }: Props) {
  const buttonType = type ? `${type}-button` : "primary-button";

  return (
    <button id={buttonType} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
