import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { useLeaders } from "../../context/hooks/useLeaders";
import { getLeaders } from "../../api";

const levels = [3, 6, 9];

export function SelectLevelPage() {
  const { setLeaders } = useLeaders();
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(3);
  const easyPath = isEasyMode ? "/easy-mode" : "";
  useEffect(() => {
    getLeaders().then(response => {
      setLeaders(response.leaders);
    });
  }, [setLeaders]);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          {levels.map((level, index) => (
            <li
              className={styles.level}
              key={level}
              onClick={() => {
                setSelectedLevel(level);
              }}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <Checkbox
          id={"easy-mode"}
          name={"easy-mode"}
          label={"Легкий режим (3 жизни)"}
          checked={isEasyMode}
          onClick={() => {
            setIsEasyMode(prev => !prev);
          }}
        ></Checkbox>
        <Link to={`/game/${selectedLevel}${easyPath}`}>
          <Button>Начать игру</Button>
        </Link>
        <Link to="/leaderboard">
          <p>Перейти к лидерборду</p>
        </Link>
      </div>
    </div>
  );
}
