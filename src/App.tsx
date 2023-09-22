import './App.scss';
import TodoList from './Components/TodoList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
