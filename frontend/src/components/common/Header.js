import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/auth';

const Header = () => {
  const { isAuthenticated, clearUser } = useAuth();

  const handleLogout = () => {
    logout();
    clearUser();
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          ストレッチアシスタント
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/assessment">チェック</Link>
          </li>
          <li>
            <Link to="/results">診断結果</Link>
          </li>
          <li>
            <Link to="/stretches">ストレッチ</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/profile">プロフィール</Link>
              </li>
              <li>
                <button onClick={handleLogout}>ログアウト</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">ログイン</Link>
              </li>
              <li>
                <Link to="/register">新規登録</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
