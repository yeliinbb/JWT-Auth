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
    if (isError) {
      console.error('todos data error', error);
    }
  }, []);

  if (isSuccess) {
    console.log('todoList', todoList);
  }
  return (
    <div>
      <h2>Todo List</h2>
      {isPending && <span>투두 리스트를 가져오는 중입니다.</span>}
      {isSuccess &&
        todoList.map((todo) => <div key={todo.id}>{todo.title}</div>)}
    </div>
  );
};

export default TodoList;
