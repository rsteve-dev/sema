import {BrowserRouter,Routes,Route} from "react-router-dom";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import UpdateBooks from "./components/UpdateBook";
import "./style.css"

function App() {
  return (
    <div className="app">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<AddBook/>}/>
          <Route path="/update" element={<UpdateBooks/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
