import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { login, register } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';
import useAuthForm from '../hooks/useAuthForm';

// Mocking external dependencies
jest.mock('../api/auth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Mock useAuthStore
type AuthStore = ReturnType<typeof useAuthStore>;
const mockUseAuthStore = jest.fn<Partial<AuthStore>, []>(() => ({
  isLogin: jest.fn()
  // Add other properties or methods as needed
}));
jest.mock('../store/useAuthStore', () => ({
  useAuthStore: () => mockUseAuthStore()
}));

describe('useAuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthStore.mockClear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  it('should validate form fields correctly', () => {
    const { result } = renderHook(() => useAuthForm({ isSignUp: true }), {
      wrapper
    });

    act(() => {
      // TypeScript에서 useRef의 current 프로퍼티를 직접 할당할 수 없으므로,
      // 실제 DOM 요소를 시뮬레이트합니다.
      const mockElement = document.createElement('input');
      mockElement.value = 'test';
      Object.defineProperty(result.current.idRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'password';
      Object.defineProperty(result.current.pwdRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'nickname';
      Object.defineProperty(result.current.nicknameRef, 'current', {
        value: mockElement
      });

      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.SyntheticEvent);
    });

    expect(result.current.errors).toEqual({});
  });

  it('should show error for invalid input', () => {
    const { result } = renderHook(() => useAuthForm({ isSignUp: true }), {
      wrapper
    });

    act(() => {
      const mockElement = document.createElement('input');
      mockElement.value = 'tes';
      Object.defineProperty(result.current.idRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'pwd';
      Object.defineProperty(result.current.pwdRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'n';
      Object.defineProperty(result.current.nicknameRef, 'current', {
        value: mockElement
      });

      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.SyntheticEvent);
    });

    expect(result.current.errors).toHaveProperty('id');
    expect(result.current.errors).toHaveProperty('password');
    expect(result.current.errors).toHaveProperty('nickname');
  });

  it('should call register API for sign up', async () => {
    (register as jest.Mock).mockResolvedValue({});
    const { result } = renderHook(() => useAuthForm({ isSignUp: true }), {
      wrapper
    });

    await act(async () => {
      const mockElement = document.createElement('input');
      mockElement.value = 'testuser';
      Object.defineProperty(result.current.idRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'password123';
      Object.defineProperty(result.current.pwdRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'nickname';
      Object.defineProperty(result.current.nicknameRef, 'current', {
        value: mockElement
      });

      await result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.SyntheticEvent);
    });

    expect(register).toHaveBeenCalledWith({
      id: 'testuser',
      password: 'password123',
      nickname: 'nickname'
    });
  });

  it('should call login API and update auth state for sign in', async () => {
    (login as jest.Mock).mockResolvedValue({});
    const mockIsLogin = jest.fn();
    mockUseAuthStore.mockReturnValue({ isLogin: mockIsLogin });
    const { result } = renderHook(() => useAuthForm({ isSignUp: false }), {
      wrapper
    });

    await act(async () => {
      const mockElement = document.createElement('input');
      mockElement.value = 'testuser';
      Object.defineProperty(result.current.idRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'password123';
      Object.defineProperty(result.current.pwdRef, 'current', {
        value: mockElement
      });

      await result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.SyntheticEvent);
    });
    expect(login).toHaveBeenCalledWith({
      id: 'testuser',
      password: 'password123'
    });
    expect(mockIsLogin).toHaveBeenCalled();
  });

  it('should handle API errors', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('API Error'));
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { result } = renderHook(() => useAuthForm({ isSignUp: false }), {
      wrapper
    });

    await act(async () => {
      const mockElement = document.createElement('input');
      mockElement.value = 'testuser';
      Object.defineProperty(result.current.idRef, 'current', {
        value: mockElement
      });

      mockElement.value = 'password123';
      Object.defineProperty(result.current.pwdRef, 'current', {
        value: mockElement
      });

      await result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.SyntheticEvent);
    });

    expect(consoleSpy).toHaveBeenCalledWith('로그인 오류', expect.any(Error));
    consoleSpy.mockRestore();
  });
});
