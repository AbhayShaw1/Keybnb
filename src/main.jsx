import ReactDOM from 'react-dom/client';

import { seedLocalDatabase } from './api/data/seed';
import App from './App';

import './index.css';

seedLocalDatabase();

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
