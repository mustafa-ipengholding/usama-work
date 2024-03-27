import { Route, Routes } from "react-router-dom";
import './App.css';
import Employee from './components/Employee';
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" element={<Employee />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
