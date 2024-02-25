// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { UltimateTodo } from './components/ultimate-todo/ultimate-todo';
export function App() {
  return (
    <div>
      <UltimateTodo />
    </div>
  );
}

export default App;
