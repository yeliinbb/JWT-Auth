import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <h1>Home</h1>
      <Link to="/my-page">
        <span>My Page</span>
      </Link>
    </header>
  );
};

export default Header;
