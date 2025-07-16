import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiClient from '../services/api';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [stretchHistory, setStretchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // バリデーションスキーマ
  const validationSchema = Yup.object({
    name: Yup.string().required('名前は必須です'),
    age: Yup.number()
      .positive('年齢は正の数で入力してください')
      .integer('年齢は整数で入力してください')
      .nullable(),
    gender: Yup.string().nullable(),
  });

  // アセスメント履歴を取得
  const fetchAssessmentHistory = async () => {
    try {
      const response = await apiClient.get('/body_assessments');
      setAssessmentHistory(response.data);
    } catch (error) {
      console.error('アセスメント履歴の取得に失敗しました:', error);
    }
  };

  // ストレッチ履歴を取得
  const fetchStretchHistory = async () => {
    try {
      const response = await apiClient.get('/user_stretches/completed');
      setStretchHistory(response.data);
    } catch (error) {
      console.error('ストレッチ履歴の取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'assessments') {
      fetchAssessmentHistory();
    } else if (activeTab === 'stretches') {
      fetchStretchHistory();
    }
  }, [activeTab]);

  // プロフィール更新処理
  const handleProfileSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await apiClient.put('/users', { user: values });
      updateUser(response.data);
      setMessage('プロフィールを更新しました');
    } catch (error) {
      setMessage('プロフィールの更新に失敗しました');
      console.error('プロフィール更新エラー:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // 日付フォーマット関数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!currentUser) {
    return <div className="text-center p-8">ユーザー情報を読み込み中...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">プロフィール</h1>

      {/* タブナビゲーション */}
      <div className="tabs tabs-bordered mb-6">
        <button
          className={`tab tab-lg ${activeTab === 'profile' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          基本情報
        </button>
        <button
          className={`tab tab-lg ${activeTab === 'assessments' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('assessments')}
        >
          アセスメント履歴
        </button>
        <button
          className={`tab tab-lg ${activeTab === 'stretches' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('stretches')}
        >
          ストレッチ履歴
        </button>
      </div>

      {/* 基本情報タブ */}
      {activeTab === 'profile' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">基本情報の編集</h2>

            {message && (
              <div className={`alert ${message.includes('失敗') ? 'alert-error' : 'alert-success'} mb-4`}>
                {message}
              </div>
            )}

            <Formik
              initialValues={{
                name: currentUser.name || '',
                age: currentUser.age || '',
                gender: currentUser.gender || '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleProfileSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">名前</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-error text-sm mt-1"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">メールアドレス</span>
                      </label>
                      <input
                        type="email"
                        value={currentUser.email}
                        className="input input-bordered w-full"
                        disabled
                      />
                      <label className="label">
                        <span className="label-text-alt text-gray-500">
                          メールアドレスは変更できません
                        </span>
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">年齢</span>
                      </label>
                      <Field
                        type="number"
                        name="age"
                        className="input input-bordered w-full"
                        min="1"
                        max="120"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-error text-sm mt-1"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">性別</span>
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="select select-bordered w-full"
                      >
                        <option value="">選択してください</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                        <option value="other">その他</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-error text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className={`btn btn-primary ${(loading || isSubmitting) ? 'loading' : ''}`}
                      disabled={loading || isSubmitting}
                    >
                      更新する
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* アセスメント履歴タブ */}
      {activeTab === 'assessments' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">アセスメント履歴</h2>

            {assessmentHistory.length === 0 ? (
              <div className="text-center p-8 bg-base-200 rounded">
                <p className="text-gray-600">アセスメント履歴がありません</p>
                <p className="text-sm text-gray-500 mt-2">
                  まずは身体の状態評価を受けてみましょう
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>評価日</th>
                      <th>肩</th>
                      <th>首</th>
                      <th>背中</th>
                      <th>腰</th>
                      <th>膝</th>
                      <th>足首</th>
                      <th>合計スコア</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentHistory.map((assessment, index) => (
                      <tr key={index}>
                        <td>{formatDate(assessment.assessment_date)}</td>
                        <td>
                          <div className={`badge ${assessment.shoulder_score > 5 ? 'badge-warning' : 'badge-success'}`}>
                            {assessment.shoulder_score}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${assessment.neck_score > 5 ? 'badge-warning' : 'badge-success'}`}>
                            {assessment.neck_score}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${assessment.back_score > 5 ? 'badge-warning' : 'badge-success'}`}>
                            {assessment.back_score}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${assessment.hip_score > 5 ? 'badge-warning' : 'badge-success'}`}>
                            {assessment.hip_score}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${assessment.knee_score > 5 ? 'badge-warning' : 'badge-success'}`}>
                            {assessment.knee_score}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${assessment.ankle_score > 5 ? 'badge-warning' : 'badge-success'}`}>
                            {assessment.ankle_score}
                          </div>
                        </td>
                        <td>
                          <div className="font-bold">
                            {assessment.shoulder_score + assessment.neck_score + assessment.back_score +
                             assessment.hip_score + assessment.knee_score + assessment.ankle_score}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ストレッチ履歴タブ */}
      {activeTab === 'stretches' && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">ストレッチ履歴</h2>

            {stretchHistory.length === 0 ? (
              <div className="text-center p-8 bg-base-200 rounded">
                <p className="text-gray-600">ストレッチ履歴がありません</p>
                <p className="text-sm text-gray-500 mt-2">
                  ストレッチを実行して記録を蓄積しましょう
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stretchHistory.map((userStretch, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-base-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {userStretch.stretch.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {userStretch.stretch.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="badge badge-outline">
                            {userStretch.stretch.target_area}
                          </span>
                          <span className="badge badge-outline">
                            難易度 {userStretch.stretch.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="stat-value text-primary text-2xl">
                          {userStretch.completed_count}
                        </div>
                        <div className="stat-desc">回実施</div>
                        {userStretch.last_completed_at && (
                          <div className="text-xs text-gray-500 mt-1">
                            最終実施: {formatDate(userStretch.last_completed_at)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
