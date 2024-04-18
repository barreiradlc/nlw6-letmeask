import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./styles/global.scss"
import "./services/firebase"
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import { LocaleContextProvider } from "./contexts/LocaleContext";

function App() {
  return (
    
      <AuthContextProvider>
        <LocaleContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/rooms/new" component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />

              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </BrowserRouter>
        </LocaleContextProvider>
      </AuthContextProvider>
    
  );
}

export default App;