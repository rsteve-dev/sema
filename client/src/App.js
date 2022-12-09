import {BrowserRouter,Routes,Route} from "react-router-dom";
import Asset from "./components/Asset";
import AddAsset from "./components/AddAsset";
import UpdateAsset from "./components/UpdateAssets";
import "./style.css"

function App() {
  return (
    <div className="app">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Asset/>}/>
          <Route path="/add" element={<AddAsset/>}/>
          <Route path="/update" element={<UpdateAsset/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
