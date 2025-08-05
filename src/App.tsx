import { Toaster } from 'sonner';
import './App.css';
import Router from './routes';
import { Check, Info, AlertTriangle } from 'lucide-react';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster
        position="top-right"
        closeButton
        icons={{
          success: <Check color="green" width={16} height={16} />,
          warning: <AlertTriangle color="orange" width={16} height={16} />,
          error: <Info color="red" width={16} height={16} />,
        }}
      />
    </AuthProvider>
  );
}

export default App;
