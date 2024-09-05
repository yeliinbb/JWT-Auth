import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
  const { isLogout } = useAuthStore();
  return (
    <header className="flex items-center justify-between w-full h-25 p-2 shadow-md">
      <h1 className="font-extrabold text-2xl">Home</h1>
      <div className="flex items-center h-full">
        <Link to="/my-page">
          <button className="mr-2 font-bold text-xl bg-slate-300 px-4 py-2 rounded-xl hover:bg-slate-200">
            My Page
          </button>
        </Link>
        <button
          onClick={() => isLogout()}
          className="font-bold text-xl bg-slate-400 px-4 py-2 rounded-xl hover:bg-slate-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
