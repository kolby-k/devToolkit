import { useNavigate } from "react-router";

function BackButton({ styles = {}, fallback = "/" }) {
  const navigate = useNavigate();

  return (
    <button
      id={"back-button"}
      style={{ ...styles }}
      onClick={() => {
        if (window.history.length > 1) navigate(-1);
        else navigate(fallback, { replace: true });
      }}
    >
      ← Back
    </button>
  );
}

export default BackButton;
