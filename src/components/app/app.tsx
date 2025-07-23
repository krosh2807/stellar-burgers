import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Router } from '../../router/router';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkAuth } from '../../services/authSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Router />
    </div>
  );
};

export default App;
