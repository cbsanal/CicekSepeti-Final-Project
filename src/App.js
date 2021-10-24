import { Switch, Route } from "react-router-dom";
import { Auth, ItemDetails, EveryItems, Account, AddItem } from "./pages";

const App = () => {
  return (
    <Switch>
      <Route path="/login">
        <Auth formType={"login"} />
      </Route>
      <Route path="/register">
        <Auth formType={"register"} />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/item/:id">
        <ItemDetails />
      </Route>
      <Route path="/newItem">
        <AddItem />
      </Route>
      <Route path="/:type?">
        <EveryItems />
      </Route>
    </Switch>
  );
};

export default App;
