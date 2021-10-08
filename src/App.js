import { Switch, Route } from 'react-router-dom';

import Welcome from './features/welcome';

function App() {
  return (
      <Switch>
            <Route exact path = '/' component={Welcome}></Route>
            <Route exact path = '/chat-room' component={Welcome}></Route>
      </Switch>
  );
}

export default App;

