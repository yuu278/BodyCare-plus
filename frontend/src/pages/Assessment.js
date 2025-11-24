import React from 'react';
import AssessmentForm from '../components/assessment/AssessmentForm';

const Assessment = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            あなたの身体状態
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            あなたの現在の身体状態や生活習慣について詳しく教えてください。
            この情報を基に、最適なストレッチプログラムを提案いたします。
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <AssessmentForm />
        </div>
      </div>
    </div>
  );
};

export default Assessment;
