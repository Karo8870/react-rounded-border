import React from "react";
import "./App.scss";
import RoundedBorder from "./components/rounded-border/RoundedBorder";

function App() {
  return (
    <main>
        <RoundedBorder style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
            <label style={{
              padding: '1rem'
            }}>test1234567890</label>
            <button>saas</button>
        </RoundedBorder>
    </main>
  );
}

export default App;
