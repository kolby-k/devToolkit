import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import TOOLS from "../constants/tools";
import normalize from "../utils/normalize";
import ToolCard from "../components/ToolCard";
import { BiSolidBarChartAlt2 } from "react-icons/bi";

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
        <span className={styles.textContainer}>
          <h1>
            Developer Toolkit
            <BiSolidBarChartAlt2
              style={{ marginBottom: -10, marginLeft: 15 }}
              color="white"
            />
          </h1>
          <p className={styles.subTitle}>
            All of the tools you need, in one place.
          </p>
        </span>
        <input
          className={styles.toolSearchInput}
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search ..."
        />
      </div>

      <div className={styles.bottom}>
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.path}
            name={tool.name}
            description={tool.description}
            path={tool.path}
            icon={tool.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
