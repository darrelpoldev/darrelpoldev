import { useState } from 'react';
import styles from './ultimate-todo.module.css';

/* eslint-disable-next-line */
export interface UltimateTodoProps {}

export interface Todo {
  id: number;
  title: string;
  description: string;
}
const todoInitialState: Todo[] = [
  {
    id: 123,
    description: 'Just another description',
    title: 'My first todo',
  },
];

const randomId = () => Math.floor(Math.random() * 9999);

export function UltimateTodo(props: UltimateTodoProps) {
  const [todoList, setTodoList] = useState(todoInitialState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (title !== '' && description !== '') {
      const newTodo: Todo = {
        id: randomId(),
        title: title,
        description: description,
      };
      setTodoList((prevState) => {
        return [...prevState, newTodo];
      });
      setTitle('');
      setDescription('');
    } else {
      alert('Please add a title and a description ');
    }
  };

  return (
    <div className={styles['container']}>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="todo-title">Title: </label>
            <input
              name="todo-title"
              id="todo-title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor="todo-description">Description: </label>
            <textarea
              name="todo-description"
              id="todo-description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <button type="submit">Add todo</button>
        </form>
      </div>
      <hr></hr>
      <div>
        <h1>Todo List:</h1>
        {todoList.map((todo) => {
          return (
            <div key={todo.id}>
              <p>
                <b>{todo.title}</b> - {todo.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UltimateTodo;
