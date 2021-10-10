import { Switch, Route } from 'react-router-dom';

import Welcome from './features/welcome';
import ProtectedRoute from './components/ProtectedRoute';
import {ChatRoom} from './features/Chat-room';

function App() {
  return (
      <Switch>
            <Route exact path = '/' component={Welcome}></Route>
            <ProtectedRoute exact path='/chat-room' component={ChatRoom}/>
      </Switch>
  );
}

export default App;

