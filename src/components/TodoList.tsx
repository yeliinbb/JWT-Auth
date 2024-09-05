import { useQuery } from '@tanstack/react-query';
import { getTodoList } from '../api/todos';
import { queryKeys } from '../lib/constants/queryKeys';
import { useEffect } from 'react';
import { todo } from '../types/todo.types';
const TodoList = () => {
  // json 투두데이터 가져와서 리스팅 + 더보기
  const {
    data: todoList,
    isPending,
    isSuccess,
    isError,
    error
  } = useQuery<todo[]>({
    queryKey: [queryKeys.todos],
    queryFn: getTodoList
  });

  useEffect(() => {
    if (isError && error instanceof Error) {
      console.error('todos data error', error);
    }
  }, [isError, error]);

  if (isSuccess) {
    console.log('todoList', todoList);
  }

  return (
    <div className="p-1">
      <h2 className="font-bold text-lg">Todo List</h2>
      {isPending && <span>투두 리스트를 가져오는 중입니다.</span>}
      <ul className="grid grid-cols-4 gap-2 p-4">
        {isSuccess &&
          todoList.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col p-5 rounded-3xl shadow-md bg-slate-50"
            >
              <span>No.{todo.id}</span>
              <span className="text-base font-medium truncate">
                Title : {todo.title}
              </span>
              <span>userId : {todo.userId}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
