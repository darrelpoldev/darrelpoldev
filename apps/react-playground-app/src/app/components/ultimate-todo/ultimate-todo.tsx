import { useReducer, useState } from 'react';
import styles from './ultimate-todo.module.css';
import TodoTable from '../TodoTable/todo-table/todo-table';
import AddTodo from '../add-todo/add-todo/add-todo';

/* eslint-disable-next-line */
export interface UltimateTodoProps {}

export interface Todo {
  id: number;
  title: string;
  description: string;
}

const initialTodoList: Todo[] = [
  {
    id: 123,
    description: 'Just another description',
    title: 'My first todo',
  },
];

const randomId = () => Math.floor(Math.random() * 9999);

export function UltimateTodo(props: UltimateTodoProps) {
  const [todoList, dispatch] = useReducer(todoListReducer, initialTodoList);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemIdToEdit, setItemIdToEdit] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (itemIdToEdit) {
      // setTodoList((prevState) => {
      //   const indexOfItemToBeDeleted = prevState.findIndex(
      //     (todo) => todo.id === itemIdToEdit
      //   );
      //   if (indexOfItemToBeDeleted !== -1) {
      //     const updatedTodoList = [...prevState];
      //     updatedTodoList[indexOfItemToBeDeleted].description = description;
      //     updatedTodoList[indexOfItemToBeDeleted].title = title;
      //     return updatedTodoList;
      //   }
      //   return prevState;
      // });
      // setTitle('');
      // setDescription('');
      // setItemIdToEdit(0);
      // alert('Item updated!');
    } else {
      if (title !== '' && description !== '') {
        const newTodo: Todo = {
          id: randomId(),
          title: title,
          description: description,
        };
        dispatch({
          type: 'added',
          ...newTodo,
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

const todoListReducer = (todoList: Todo[], action: any) => {
  switch (action.type) {
    case 'added': {
      return [
        ...todoList,
        {
          id: action.id,
          description: action.description,
          title: action.title,
        },
      ];
    }
    case 'done': {
      return todoList.filter((todo) => todo.id !== action.id);
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};
