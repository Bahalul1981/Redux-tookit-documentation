import { useSelector } from "react-redux";
import "./App.css";
import SendDataFromThisComponent from "./SendDataFromThisComponent";

function App() {
  const dataFromStore = useSelector((parametar) => {
    return parametar.show;
  });

  return (
    <div className="App">
      <h1>
        {` Name: ${dataFromStore.name} 
        `}
        <br />
        {`Age: ${dataFromStore.age}
        `}
        <br />
        {`City: ${dataFromStore.city}
        `}
      </h1>
      <SendDataFromThisComponent />
    </div>
  );
}

export default App;
