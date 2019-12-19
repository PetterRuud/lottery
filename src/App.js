import React, { useState, useRef } from "react";
import Reward from "react-rewards";
import "./App.css";

const entries = ["A1", "A2", "A3"];

const App = () => {
  const confettiRef = useRef();
  const [isLoading, setLoading] = useState(false);
  const [getWinner, setWinner] = useState();
  const [getWinners, setWinners] = useState([]);
  const [getEntries, setEntries] = useState(entries);

  const pickWinner = () => {
    setLoading(true);
    const random = Math.floor(Math.random() * getEntries.length);
    const winner = getEntries[random];
    const newEntries = getEntries.filter(entry => entry !== winner);
    const winners = Array.from(new Set([...getWinners, winner]));

    setWinner(winner);
    setWinners(winners);
    setEntries(newEntries);
    setTimeout(() => {
      setLoading(false);
      confettiRef.current.rewardMe();
    }, 2000);
  };

  const reset = () => {
    setLoading(true);
    setWinner();
    setWinners([]);
    setEntries(entries);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <div className="spinnercontainer">
        <svg
          className="spinner"
          width="0"
          height="0"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    );
  }
  return (
    <div className="lotterycontainer">
      <div className="header">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xmlSpace="preserve"
          >
            <path
              class="st0"
              d="M80.5,80.5h-60c-5.5,0-10-4.5-10-10v-12c4.4,0,8-3.6,8-8s-3.6-8-8-8v-12c0-5.5,4.5-10,10-10h60  c5.5,0,10,4.5,10,10v40C90.5,76,86,80.5,80.5,80.5z M86.5,30.5c0-3.3-2.7-6-6-6h-39v13h-4v-13h-17c-3.3,0-6,2.7-6,6v8.7  c4.7,1.6,8,6.1,8,11.3s-3.3,9.7-8,11.3v8.7c0,3.3,2.7,6,6,6h17v-13h4v13h39c3.3,0,6-2.7,6-6V30.5z M37.5,43.5h4v14h-4V43.5z"
            />
          </svg>
        </div>

        {getEntries.length > 0 && (
          <button className="button" onClick={() => pickWinner()}>
            Trekk lodd
          </button>
        )}
      </div>

      <div className="lottery">
        {getWinner && (
          <div className="winner">
            <h2>Gratulerer</h2>
            <Reward ref={confettiRef} type="confetti">
              <div className="winner__number winner__number--large">
                {getWinner}
              </div>
            </Reward>
          </div>
        )}
        {getWinners.length > 0 && (
          <div className="winners">
            <h3>Vinnere</h3>
            {getWinners.map(entry => (
              <div className="winner__number winner__number--teal" key={entry}>
                {entry}
              </div>
            ))}
          </div>
        )}
        {getEntries.length === 0 && (
          <button className="reset" onClick={() => reset()}>
            <svg
              id="reset"
              xmlns="http://www.w3.org/2000/svg"
              width="17.7"
              height="20"
              viewBox="0 0 17.7 20"
            >
              <path
                className="st0"
                d="M8.1 2.7V.3c0-.2-.2-.3-.4-.2L3.2 3.7c-.1.1-.1.3 0 .4l4.5 3.7c.2.1.4 0 .4-.2V5.2c3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-.7-.6-1.2-1.2-1.2S0 10.1 0 10.8c0 4.5 3.6 8.1 8.1 8.1s8.1-3.6 8.1-8.1-3.6-8.1-8.1-8.1z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
