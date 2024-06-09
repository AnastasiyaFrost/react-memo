import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { useState } from "react";
import { Button } from "../../components/Button/Button";

const levels = [3, 6, 9];

export function SelectLevelPage() {
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(3);
  // function levelHandle(index) {
  //   selectedLevel = levels[index];
  // }
  const easyPath = isEasyMode ? "/easy-mode" : "";

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
          onClick={() => {
            setIsEasyMode(prev => !prev);
          }}
        ></Checkbox>
        <Link to={`/game/${selectedLevel}${easyPath}`}>
          <Button>Начать игру</Button>
        </Link>
      </div>
    </div>
  );
}
