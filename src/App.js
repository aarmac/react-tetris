import React, { useEffect, useState } from "react";

import { rand } from "./helpers";

import "./App.css";

function App() {
  const title = "React CSS Grid Tetris";
  const rows = 20;
  const columns = 10;
  const colors = ["red", "orange", "yellow", "green", "blue", "violet"];
  const shapes = ["rectangle", "square", "triangle", "Z", "L"];
  const speed = 500; // milliseconds
  const score = 0;

  const emptyTiles = [...Array(rows)].map(() =>
    [...Array(columns)].map(() => "")
  );

  const [tiles, setTiles] = useState(emptyTiles);
  const [activeTile, setActiveTile] = useState({
    color: rand(colors),
    shape: rand(shapes),
    x: 0,
    y: 0,
  });

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        setActiveTile({
          ...activeTile,
          x: activeTile.x - 1,
        });
        break;
      case "ArrowRight":
        setActiveTile({
          ...activeTile,
          x: activeTile.x + 1,
        });
        break;
      case "ArrowDown":
        setActiveTile({
          ...activeTile,
          y: activeTile.y + 1,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      let rewrite = emptyTiles;

      if (activeTile.y < rows - 1) {
        setActiveTile({
          ...activeTile,
          y: activeTile.y + 1,
        });
      } else {
        setActiveTile({
          color: rand(colors),
          shape: rand(shapes),
          x: Math.floor(Math.random() * columns),
          y: 0,
        });
      }

      setTiles(rewrite);
    }, speed);

    window.addEventListener("keydown", (event) =>
      event.repeat ? false : handleKeyDown(event)
    );
  });

  return (
    <div
      className="tetris"
      style={{ "--x": activeTile.x, "--y": activeTile.y }}
    >
      <h1>{title}</h1>
      <div className="tetris__board">
        <div className="tetris__tile tetris__tile--active"></div>
        <div className="tetris__rows">
          {tiles.map((row, i) => (
            <div className="tetris__row" key={i}>
              {row.map((color, i) => (
                <div
                  className={
                    "tetris__tile" + (color ? " tetris__tile--" + color : "")
                  }
                  key={i}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <pre>
        Score: {score}
        <br />
        X: {activeTile.x} Y: {activeTile.y}
        <br />
        Speed (ms): {speed}
      </pre>
    </div>
  );
}

export default App;
