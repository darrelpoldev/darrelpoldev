import { useState } from 'react';
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
//  TODO: Create a context for this list
const todoInitialState: Todo[] = [
  {
    id: 123,
    description: 'Just another description',
    title: 'My first todo',
  },
];

//  TODO: Create a simple hook as a helper?
const randomId = () => Math.floor(Math.random() * 9999);

export function UltimateTodo(props: UltimateTodoProps) {
  //  TODO: Convert this to a reducer and add `dateAdded` column
  const [todoList, setTodoList] = useState(todoInitialState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemIdToEdit, setItemIdToEdit] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Refactor this as well
    if (itemIdToEdit) {
      setTodoList((prevState) => {
        const indexOfItemToBeDeleted = prevState.findIndex(
          (todo) => todo.id === itemIdToEdit
        );

        if (indexOfItemToBeDeleted !== -1) {
          const updatedTodoList = [...prevState];
          updatedTodoList[indexOfItemToBeDeleted].description = description;
          updatedTodoList[indexOfItemToBeDeleted].title = title;
          return updatedTodoList;
        }
        return prevState;
      });
      setTitle('');
      setDescription('');
      setItemIdToEdit(0);
      alert('Item updated!');
    } else {
      //  TODO: Use Yup validation?
      if (title !== '' && description !== '') {
        const newTodo: Todo = {
          id: randomId(),
          title: title,
          description: description,
        };
        setTodoList((prevState) => {
          return [...prevState, newTodo];
        });
        //  TODO: Use Formik????
        setTitle('');
        setDescription('');
      } else {
        alert('Please add a title and a description ');
      }
    }
  };

  //  TODO: Refactor this
  const handleRemove = (todoId: number) => {
    setTodoList((prevState) => {
      const newList = prevState.filter((todo) => todo.id !== todoId);
      return [...newList];
    });
  };

  //  TODO: Refactor this
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
