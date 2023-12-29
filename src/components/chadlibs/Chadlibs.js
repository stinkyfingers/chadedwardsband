import React from 'react';
import { useRoutes } from 'react-router-dom';
import Header from './Header';
import Play from './Play';
import List from './List';
import Edit from './Edit';
import {ErrorContext, UserContext} from '../../Context';

import { checkAuth } from '../../Api';

const Error = ({ err }) => {
  return <div className='error'>{String(err)}</div>;
};

const Chadlibs = () => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [err, setErr] = React.useState();

  React.useEffect(() => {
    if (!user || !checkAuth) {
      return;
    }
    checkAuth({ token: user.credential })
      .then((resp) => {
        if (resp.error || resp.message === 'unauthorized') {
          localStorage.removeItem('user');
          setUser(null);
        }
      })
      .catch(setErr);
  }, [user])

  const routes = useRoutes([
    { path: '/admin', element: <List /> },
    { path: '/play/:id', element: <Play /> },
    { path: '/edit/:id', element: <Edit /> },
    { path: '/edit', element: <Edit /> },
    { path: '/list', element: <List /> },
    { path: '/*', element: <List /> },
  ]);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <ErrorContext.Provider value={[err, setErr]}>
          <Header />
          <div className='content'>
            <Error err={err} />
            {routes}
          </div>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default Chadlibs;
