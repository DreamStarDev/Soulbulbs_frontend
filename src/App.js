import { BrowserRouter, Switch, Route } from "react-router-dom";
import Listpage from './Pages/Listpage';
import Details from './Pages/Details';
import Preview from './Pages/Preview';
import Home from "./Pages/Home";
import { AppWrapper } from './Context/state';

function App() {
  return (
    <AppWrapper>
      <BrowserRouter >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details" >
            <Details />
          </Route>
          <Route path="/listpage"  >
            <Listpage />
          </Route>
          <Route path="/preview"  >
            <Preview />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppWrapper>

  );
}

export default App;
