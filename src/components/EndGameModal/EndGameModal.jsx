import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { postLeader } from "../../api";
import { useLeaders } from "../../context/hooks/useLeaders";
import { Link } from "react-router-dom";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const [newLeader, setNewLeader] = useState({
    name: "",
    time: gameDurationSeconds,
  });
  const { setLeaders, leaders } = useLeaders();
  const [btnDisabled, setBtnDisabled] = useState(false);
  console.log(leaders);
  setLeaders(leaders.sort((a, b) => +a.time - +b.time));

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewLeader({
      ...newLeader,
      [name]: value,
    });
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    postLeader({ name: newLeader.name, time: newLeader.time })
      .then(leaders => {
        setLeaders(leaders.leaders);
        setBtnDisabled(!btnDisabled);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };
  let title = isWon ? "Вы победили!" : "Вы проиграли!";
  let lastIndexLeader = leaders[leaders.length - 1];
  let isLeader = gameDurationMinutes * 60 + gameDurationSeconds < lastIndexLeader.time && isWon;
  if (isLeader) {
    title = "Вы попали на лидерборд!";
  }
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader && (
        <div>
          <input
            type="text"
            name="name"
            value={newLeader.name}
            onChange={handleInputChange}
            id="formTitle"
            placeholder="Пользователь"
            autoFocus=""
          />
          <button onClick={handleFormSubmit} disabled={btnDisabled}>
            Сохранить результат
          </button>
        </div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>

      <div>
        <Link to="/leaderboard">
          <p>Перейти к лидерборду</p>
        </Link>
      </div>
    </div>
  );
}
