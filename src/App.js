import "./styles/app.scss";
import gameLoop from "./lib/game";

const App = () => {
  gameLoop();
  return <div className="App"></div>;
};

export default App;
