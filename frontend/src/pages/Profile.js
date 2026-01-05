import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiClient from '../services/api';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // バリデーションスキーマ
  const validationSchema = Yup.object({
    name: Yup.string().required('名前は必須です'),
    age: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
      .positive('年齢は正の数で入力してください')
      .integer('年齢は整数で入力してください')
      .nullable(),
    gender: Yup.string().nullable(),
  });

  // プロフィール更新処理
  const handleProfileSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setMessage('');

    try {
      // APIに送る前に空文字の age を null に変換
      const payload = {
        user: {
          ...values,
          age: values.age === '' ? null : values.age,
        },
      };

      const response = await apiClient.put(`/users/${currentUser.id}`, payload);

      // APIの返り値が { user: {...} } かそれ以外かに対応
      const updatedUser = response.data?.user ?? response.data;
      if (updatedUser) {
        updateUser(updatedUser);
      }

      setMessage('プロフィールを更新しました');
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        'プロフィールの更新に失敗しました';
      setMessage(errMsg);
      console.error('プロフィール更新エラー:', error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
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
    </div>
  );
};

export default Profile;
