import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import TopEvents from './pages/TopEvents'
import './App.css';
import EventDetails from "./pages/EventDetails";

function App() {
  return (
  <>
    <Router>
      <Route exact path="/">
        <Redirect to="/sports/football" />
      </Route>
      <Route exact path="/sports/football" component={TopEvents} />
      <Route path="/game/:slug" component={EventDetails} />
    </Router>
  </>)
}

export default App;
