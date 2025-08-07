import { Toaster } from 'sonner';
import './App.css';
import Router from './routes';
import { Check, Info, AlertTriangle } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

export default App;
