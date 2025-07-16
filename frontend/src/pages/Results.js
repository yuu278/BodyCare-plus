import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

const Results = () => {
  const [assessments, setAssessments] = useState([]);
  const [recommendedStretches, setRecommendedStretches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 最新の評価結果を取得
      const assessmentsResponse = await apiClient.get('/body_assessments');
      const assessmentsData = assessmentsResponse.data;
      setAssessments(assessmentsData);

      // 推奨ストレッチを取得
      const stretchesResponse = await apiClient.get('/user_stretches/recommended');
      setRecommendedStretches(stretchesResponse.data);

    } catch (error) {
      console.error('データ取得エラー:', error);
      setError('データの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score <= 3) return 'bg-green-100 text-green-800';
    if (score <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreLabel = (score) => {
    if (score <= 3) return '良好';
    if (score <= 6) return '注意';
    return '改善が必要';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={fetchData} className="btn btn-sm btn-outline ml-4">
            再試行
          </button>
        </div>
      </div>
    );
  }

  const latestAssessment = assessments[0];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">診断結果</h1>

      {latestAssessment ? (
        <>
          {/* 最新の評価結果 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">最新の評価結果</h2>
              <span className="text-gray-500">
                {new Date(latestAssessment.assessment_date).toLocaleDateString('ja-JP')}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">肩</div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(latestAssessment.shoulder_score)}`}>
                  {latestAssessment.shoulder_score}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getScoreLabel(latestAssessment.shoulder_score)}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">首</div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(latestAssessment.neck_score)}`}>
                  {latestAssessment.neck_score}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getScoreLabel(latestAssessment.neck_score)}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">背中</div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(latestAssessment.back_score)}`}>
                  {latestAssessment.back_score}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getScoreLabel(latestAssessment.back_score)}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">腰</div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(latestAssessment.hip_score)}`}>
                  {latestAssessment.hip_score}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getScoreLabel(latestAssessment.hip_score)}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">膝</div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(latestAssessment.knee_score)}`}>
                  {latestAssessment.knee_score}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getScoreLabel(latestAssessment.knee_score)}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">足首</div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${getScoreColor(latestAssessment.ankle_score)}`}>
                  {latestAssessment.ankle_score}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getScoreLabel(latestAssessment.ankle_score)}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-blue-800 font-semibold">総合スコア</span>
                <span className="text-2xl font-bold text-blue-800">
                  {latestAssessment.total_score ||
                   (latestAssessment.shoulder_score + latestAssessment.neck_score +
                    latestAssessment.back_score + latestAssessment.hip_score +
                    latestAssessment.knee_score + latestAssessment.ankle_score)} / 60
                </span>
              </div>
            </div>
          </div>

          {/* 推奨ストレッチ */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">あなたにおすすめのストレッチ</h2>

            {recommendedStretches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedStretches.map((stretch) => (
                  <div key={stretch.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{stretch.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{stretch.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {stretch.target_area}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        難易度: {stretch.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => markAsCompleted(stretch.id)}
                      className="btn btn-sm btn-primary w-full"
                    >
                      実行完了
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">まだ推奨ストレッチがありません。</p>
                <Link to="/assessment" className="btn btn-primary">
                  身体評価を受ける
                </Link>
              </div>
            )}
          </div>

          {/* 過去の評価履歴 */}
          {assessments.length > 1 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">評価履歴</h2>
              <div className="space-y-4">
                {assessments.slice(1, 6).map((assessment) => (
                  <div key={assessment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">
                      {new Date(assessment.assessment_date).toLocaleDateString('ja-JP')}
                    </span>
                    <span className="font-semibold">
                      総合スコア: {assessment.total_score ||
                       (assessment.shoulder_score + assessment.neck_score +
                        assessment.back_score + assessment.hip_score +
                        assessment.knee_score + assessment.ankle_score)} / 60
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">評価結果がありません</h2>
          <p className="text-gray-600 mb-6">
            まずは身体の状態を評価して、パーソナライズされたストレッチ推奨を受けましょう。
          </p>
          <Link to="/assessment" className="btn btn-primary btn-lg">
            身体評価を受ける
          </Link>
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/assessment" className="btn btn-outline btn-lg mr-4">
          新しい評価を受ける
        </Link>
        <Link to="/library" className="btn btn-primary btn-lg">
          すべてのストレッチを見る
        </Link>
      </div>
    </div>
  );

  async function markAsCompleted(stretchId) {
    try {
      await apiClient.post('/user_stretches/mark_completed', {
        stretch_id: stretchId
      });
      alert('ストレッチ完了をマークしました！');
    } catch (error) {
      console.error('完了マークエラー:', error);
      alert('エラーが発生しました。');
    }
  }
};

export default Results;
