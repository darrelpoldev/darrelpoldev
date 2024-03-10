import { useReducer, useState } from 'react';
import styles from './ultimate-todo.module.css';
import TodoTable from '../todo-table/todo-table';
import AddTodo from '../add-todo/add-todo/add-todo';
import {
  useTodoList,
  useTodoListDispatch,
} from '../../providers/todo-list-context-provider';

/* eslint-disable-next-line */
export interface UltimateTodoProps {}

export interface Todo {
  id: number;
  title: string;
  description: string;
}

const randomId = () => Math.floor(Math.random() * 9999);

export function UltimateTodo(props: UltimateTodoProps) {
  const todoList = useTodoList();
  const dispatch = useTodoListDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemIdToEdit, setItemIdToEdit] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (itemIdToEdit) {
      const updatedTodo: Todo = {
        id: itemIdToEdit,
        title: title,
        description: description,
      };
      dispatch({ type: 'changed', todo: updatedTodo });
      setTitle('');
      setDescription('');
      setItemIdToEdit(0);
      alert('Item updated!');
    } else {
      if (title !== '' && description !== '') {
        const newTodo: Todo = {
          id: randomId(),
          title: title,
          description: description,
        };
        dispatch({
          type: 'added',
          todo: newTodo,
        });
        setTitle('');
        setDescription('');
      } else {
        alert('Please add a title and a description ');
      }
    }
  };

  const handleRemove = (todoId: number) => {
    dispatch({
      type: 'done',
      id: todoId,
    });
  };

  const handleEdit = (todoId: number) => {
    const selectedItem = todoList.find((todo) => todo.id === todoId);
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDescription(selectedItem.description);
      setItemIdToEdit(selectedItem.id);
    }
  };

  return (
    <div className={styles['container']}>
      <AddTodo
        handleSubmit={handleSubmit}
        itemIdToEdit={itemIdToEdit}
        title={title}
        description={description}
        setDescription={setDescription}
        setTitle={setTitle}
      />
      <hr></hr>
      <TodoTable
        todoList={todoList}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        itemIdToEdit={itemIdToEdit}
      />
    </div>
  );
}

export default UltimateTodo;
