import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/auth';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('名前は必須です'),
    email: Yup.string()
      .email('メールアドレスの形式が正しくありません')
      .required('メールアドレスは必須です'),
    password: Yup.string()
      .min(6, 'パスワードは6文字以上で入力してください')
      .required('パスワードは必須です'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'パスワードが一致しません')
      .required('パスワード確認は必須です'),
    age: Yup.number()
      .positive('年齢は正の数で入力してください')
      .integer('年齢は整数で入力してください')
      .nullable(),
    gender: Yup.string().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await register(values);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('登録に失敗しました。入力内容を確認してください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-6">新規登録</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
              age: '',
              gender: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">名前</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="input input-bordered border border-base-300 bg-base-100 focus:border-primary focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">メールアドレス</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="input input-bordered border border-base-300 bg-base-100 focus:border-primary focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">パスワード</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="input input-bordered border border-base-300 bg-base-100 focus:border-primary focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">パスワード確認</span>
                  </label>
                  <Field
                    type="password"
                    name="password_confirmation"
                    className="input input-bordered border border-base-300 bg-base-100 focus:border-primary focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="password_confirmation"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">年齢（任意）</span>
                  </label>
                  <Field
                    type="number"
                    name="age"
                    className="input input-bordered border border-base-300 bg-base-100 focus:border-primary focus:outline-none w-full"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">性別（任意）</span>
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="select select-bordered border border-base-300 bg-base-100 focus:border-base-400 focus:ring-0 focus:outline-none w-full"
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

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className={`btn btn-primary border border-black border-2 w-full ${isSubmitting && 'loading'}`}
                    disabled={isSubmitting}
                  >
                    登録
                  </button>
                </div>

                <p className="text-center mt-4 text-sm">
                  すでにアカウントをお持ちですか？{' '}
                  <Link to="/login" className="link link-primary">
                    ログインはこちら
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
