import './App.css';
import AppRouter from './AppRouter';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
    // <Movie />
  );
}

export default App;
