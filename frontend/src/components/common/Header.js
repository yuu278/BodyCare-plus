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
      {/* 左側：ロゴ + モバイルメニュー */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/assessment">チェック</Link></li>
            <li><Link to="/results">診断結果</Link></li>
            <li><Link to="/stretches">ストレッチ</Link></li>

            {isAuthenticated ? (
              <>
                <li><Link to="/profile">プロフィール</Link></li>
                <li><button onClick={handleLogout}>ログアウト</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">ログイン</Link></li>
                <li><Link to="/register">新規登録</Link></li>
              </>
            )}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-xl">
          ストレッチアシスタント
        </Link>
      </div>

      {/* 右側：PC用メニュー */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/assessment">チェック</Link></li>
          <li><Link to="/results">診断結果</Link></li>
          <li><Link to="/stretches">ストレッチ</Link></li>

          {isAuthenticated ? (
            <>
              <li><Link to="/profile">プロフィール</Link></li>
              <li><button onClick={handleLogout}>ログアウト</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">ログイン</Link></li>
              <li><Link to="/register">新規登録</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
