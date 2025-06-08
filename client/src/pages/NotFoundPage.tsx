import { NavLink } from "react-router";
import NOT_FOUND_IMAGE from "../assets/not-found.png";
import BackButton from "../components/BackButton";

function NotFoundPage() {
  return (
    <div id="page">
      <BackButton />
      <h1>Whoops... Page Not Found</h1>
      <img
        src={NOT_FOUND_IMAGE}
        alt="Page not found illustration"
        height={250}
        width={250}
        style={{ margin: 80 }}
      />
      <NavLink
        style={{
          fontSize: "1.5em",
          color: "lightgray",
        }}
        to={"/"}
      >
        Return to Home Page
      </NavLink>
    </div>
  );
}

export default NotFoundPage;
