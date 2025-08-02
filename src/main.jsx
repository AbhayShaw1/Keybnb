import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/state/store.js';

import { seedLocalDatabase } from './api/data/seed';
import Router from './Router';

import './index.css';
import { AuthProvider } from '@/components/AuthProvider.jsx';

seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </Provider>,
);
