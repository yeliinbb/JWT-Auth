import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getTodoList } from '../api/todos';
import TodoList from '../components/TodoList';

// Mock the API function
jest.mock('../api/todos', () => ({
  getTodoList: jest.fn()
}));

const mockTodos = [
  { id: 1, title: 'Test Todo 1', userId: 1 },
  { id: 2, title: 'Test Todo 2', userId: 1 }
];

describe('TodoList Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });
    // Reset mock before each test
    (getTodoList as jest.Mock).mockReset();
  });

  test('renders loading state', () => {
    (getTodoList as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );
    expect(
      screen.getByText('투두 리스트를 가져오는 중입니다.')
    ).toBeInTheDocument();
  });

  test('renders todo list when data is fetched successfully', async () => {
    (getTodoList as jest.Mock).mockResolvedValue(mockTodos);
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Todo 1/)).toBeInTheDocument();
      expect(screen.getByText(/Test Todo 2/)).toBeInTheDocument();
    });
  });

  test('renders error message when fetch fails', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (getTodoList as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'todos data error',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test('renders correct number of todo items', async () => {
    (getTodoList as jest.Mock).mockResolvedValue(mockTodos);
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const todoItems = screen.getAllByRole('listitem');
      expect(todoItems).toHaveLength(2);
    });
  });
});
