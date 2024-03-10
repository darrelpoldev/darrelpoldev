import { createContext, useReducer, ReactNode, useContext } from 'react';
import { Todo } from '../components/ultimate-todo/ultimate-todo';

type Action =
  | { type: 'added'; todo: Todo }
  | { type: 'changed'; todo: Todo }
  | { type: 'done'; id: number };

type Dispatch = (action: Action) => void;

const TodoListContext = createContext<Todo[] | null>(null);
const TodoListDispatchContext = createContext<Dispatch | null>(null);

interface Props {
  children?: ReactNode;
}

export const TodoListContextProvider = ({ children, ...props }: Props) => {
  const [todoList, dispatch] = useReducer(todoListReducer, initialTodoList);
  return (
    <TodoListContext.Provider value={todoList}>
      <TodoListDispatchContext.Provider value={dispatch}>
        {children}
      </TodoListDispatchContext.Provider>
    </TodoListContext.Provider>
  );
};

export const useTodoList = (): Todo[] => {
  const context = useContext(TodoListContext);
  if (context == null) {
    throw new Error(
      'useTodoList must be used within a TodoListContextProvider'
    );
  }
  return context;
};

export const useTodoListDispatch = (): Dispatch => {
  const context = useContext(TodoListDispatchContext);
  if (context == null) {
    throw new Error(
      'useTodoListDispatch must be used within a TodoListDispatchContextProvider'
    );
  }
  return context;
};

const initialTodoList: Todo[] = [
  {
    id: 123,
    description: 'Just another description',
    title: 'My first todo',
  },
];

const todoListReducer = (todoList: Todo[], action: any) => {
  switch (action.type) {
    case 'added': {
      return [
        ...todoList,
        {
          id: action.todo.id,
          description: action.todo.description,
          title: action.todo.title,
        },
      ];
    }
    case 'changed': {
      return todoList.map((todo) => {
        if (todo.id === action.todo.id) {
          return action.todo;
        } else {
          return todo;
        }
      });
    }
    case 'done': {
      return todoList.filter((todo) => todo.id !== action.id);
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};
