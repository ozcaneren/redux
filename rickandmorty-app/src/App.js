import './App.css';

//pages
import Home from './pages/Home';
import Detail from './pages/Detail';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />          
          <Route path="/:id" component={Detail} />          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
