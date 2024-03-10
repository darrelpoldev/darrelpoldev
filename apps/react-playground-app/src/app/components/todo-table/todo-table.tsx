import { Todo } from '../ultimate-todo/ultimate-todo';
import styles from './todo-table.module.css';

/* eslint-disable-next-line */
export interface TodoTableProps {
  todoList: Todo[];
  handleRemove: (todoId: number) => void;
  handleEdit: (todoId: number) => void;
  itemIdToEdit: number;
}

export function TodoTable(props: TodoTableProps) {
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
}

export default TodoTable;
