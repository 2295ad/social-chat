import {useSelector} from 'react-redux';
import {Route} from 'react-router-dom';
import { Redirect } from 'react-router';

const ProtectedRoute = ({component:Component,...rest }) => {

  const userType = useSelector(state=>state.userType);
 
  return (
    <Route
    {...rest}
    render={props =>
      userType? (
        <Component {...props}  />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
    />
  )}
export default ProtectedRoute;