// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { UltimateTodo } from './components/ultimate-todo/ultimate-todo';
import { TodoListContextProvider } from './providers/todo-list-context-provider';
export function App() {
  return (
    <TodoListContextProvider>
      <div>
        <UltimateTodo />
      </div>
    </TodoListContextProvider>
  );
}

export default App;
