import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './component/login/index';
import Admin from './component/admin/index';
import User from './component/user/index';
import AdminRoute from './middleware/adminRoute';
import UserRoute from './middleware/userRoute';

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} exact />
        <AdminRoute path="/admin" Component={Admin} />
        <UserRoute path="/user" Component={User} />
        <UserRoute path="*" Component={Login} />
      </Switch>
    </>
  );
}

export default App;
