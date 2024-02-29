import styles from './add-todo.module.css';

/* eslint-disable-next-line */
export interface AddTodoProps {
  handleSubmit: (e: any) => void;
  itemIdToEdit: number;
  title: string;
  description: string;
  setDescription: (val: string) => void;
  setTitle: (val: string) => void;
}

export function AddTodo(props: AddTodoProps) {
  const {
    handleSubmit,
    itemIdToEdit,
    title,
    description,
    setTitle,
    setDescription,
  } = props;

  return (
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
        <button type="submit">
          {itemIdToEdit !== 0 ? 'Update' : 'Add todo'}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
