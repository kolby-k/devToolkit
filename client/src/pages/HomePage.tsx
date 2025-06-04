import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import styles from "../styles/Home.module.css";
import TOOLS from "../constants/tools";
import normalize from "../utils/normalize";

function HomePage() {
  const [searchString, setSearchString] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchString) return TOOLS;

    const term = normalize(searchString);
    return TOOLS.filter((t) => normalize(t.name).includes(term));
  }, [searchString]);

  return (
    <div id="page">
      <div className={styles.top}>
        <h1>Developer Toolkit</h1>

        <input
          className={styles.toolSearchInput}
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search ..."
        />

        <p className={styles.subTitle}>
          All of the tools you need, in one place.
        </p>
      </div>

      <div className={styles.bottom}>
        {filteredTools.map((tool) => (
          <NavLink
            key={tool.path}
            to={tool.path}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
