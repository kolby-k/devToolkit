import { NavLink } from "react-router";
import { VscJson } from "react-icons/vsc";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { VscWholeWord } from "react-icons/vsc";
import type { Tool } from "../constants/tools";

const ToolCard: React.FC<Tool> = ({ name, description, path, icon }) => {
  let Icon;
  switch (icon) {
    case "json":
      Icon = VscJson;
      break;
    case "word-count":
      Icon = VscWholeWord;
      break;
    default:
      Icon = VscWorkspaceUnknown;
      break;
  }
  return (
    <NavLink to={path} style={{ textDecoration: "none" }}>
      <div className="card">
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ maxWidth: "75%", lineHeight: 1.4 }}>{name}</h3>
          <Icon size={50} color="white" style={{ width: "25%" }} />
        </span>
        <p style={{ fontSize: 18 }}>{description}</p>
      </div>
    </NavLink>
  );
};

export default ToolCard;
