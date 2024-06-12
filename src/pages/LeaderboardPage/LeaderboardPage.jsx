import { Link } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";
import { Button } from "../../components/Button/Button";
import { useLeaders } from "../../context/hooks/useLeaders";
import classNames from "classnames";
import { toMMSS } from "../../common";

export function LeaderboardPage() {
  const { leaders } = useLeaders();
  // setLeaders(leaders.sort((a, b) => +a.time - +b.time));
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Лидерборд</p>
          <Link to="/">
            <Button>Начать игру</Button>
          </Link>
        </div>
        <div>
          <div className={styles.block}>
            <p className={classNames(styles.name, styles.name01, styles.firstline)}>Позиция</p>
            <p className={classNames(styles.name, styles.name02, styles.firstline)}>Пользователь</p>
            <p className={classNames(styles.name, styles.name03, styles.firstline)}>Время</p>
          </div>
          {leaders.map(leader => (
            <div key={leader.id} className={styles.block}>
              <p className={classNames(styles.name, styles.name01)}>{leaders.indexOf(leader) + 1}</p>
              <p className={classNames(styles.name, styles.name02)}>{leader.name}</p>
              <p className={classNames(styles.name, styles.name03)}>{toMMSS(leader.time)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
