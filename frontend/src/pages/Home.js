import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">セルフストレッチ</h1>
          <p className="py-6">
            あなたの身体評価に基づいた、パーソナライズされたストレッチ推奨。
            柔軟性を向上させ、痛みを軽減し、全体的な健康状態を高めましょう。
          </p>
          {isAuthenticated ? (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/assessment" className="btn btn-primary">診断を受ける</Link>
              <Link to="/library" className="btn btn-outline">ストレッチライブラリ</Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary">始める</Link>
              <Link to="/login" className="btn btn-outline">ログイン</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
