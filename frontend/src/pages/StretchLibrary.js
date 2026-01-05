import React from 'react';
import StretchList from '../components/stretches/StretchList';

const StretchLibrary = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ストレッチ一覧</h1>
      <StretchList />
    </div>
  );
};

export default StretchLibrary;
