import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider.jsx';
import Navbar from '@/components/Navbar.jsx';

const App = () => {
  const { token } = useAuth();
  return (
    <div>
      {token && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;
