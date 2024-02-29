import { useState } from 'react';
import styles from './ultimate-todo.module.css';

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

export interface TodoListProps {
  todoList: Todo[];
  handleRemove: (todoId: number) => void;
  handleEdit: (todoId: number) => void;
  itemIdToEdit: number;
}
const TodoTable = (props: TodoListProps) => {
  const { todoList, handleEdit, handleRemove, itemIdToEdit } = props;
  return (
    <div>
      <h1>Todo List:</h1>
      {todoList.length > 0 && (
        <table style={{ borderBlockStyle: 'solid' }}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <input
                      onClick={() => handleRemove(todo.id)}
                      type="checkbox"
                    />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <b>{todo.title}</b>
                  </td>
                  <td>{todo.description}</td>
                  <td>
                    <button
                      hidden={itemIdToEdit != 0}
                      onClick={() => handleEdit(todo.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {todoList.length == 0 && <h3>All done for today!</h3>}
    </div>
  );
};

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
      <div>
        {
          //  TODO: Make a new component for the form
        }
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
          <button type="submit">
            {itemIdToEdit !== 0 ? 'Update' : 'Add todo'}
          </button>
        </form>
      </div>
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
