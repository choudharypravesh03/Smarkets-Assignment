import { Link, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import TopEvents from './pages/TopEvents'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <>
    <Router>
      <Route exact path="/">
        <Redirect to="/sports/football" />
      </Route>
      <Route exact path="/sports/football" component={TopEvents} />
    </Router>
  </>)
}

export default App;
