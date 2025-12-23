import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, guestLogin } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const [guestLoading, setGuestLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('メールアドレスの形式が正しくありません')
      .required('メールアドレスは必須です'),
    password: Yup.string().required('パスワードは必須です'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await login(values.email, values.password);
      localStorage.setItem('token', data.token);
      updateUser(data.user);
      navigate('/');
    } catch (err) {
      setError('ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ ゲストログイン処理を追加
  const handleGuestLogin = async () => {
    try {
      setGuestLoading(true);
      setError('');
      const data = await guestLogin();
      updateUser(data.user);
      navigate('/');
    } catch (err) {
      setError('ゲストログインに失敗しました。もう一度お試しください。');
    } finally {
      setGuestLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-6">ログイン</h2>
          {error && <div className="alert alert-error">{error}</div>}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">メールアドレス</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
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
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn border border-black border-2 btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ログイン中...' : 'ログイン'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="divider">または</div>

          <button
            onClick={handleGuestLogin}
            className="btn btn-outline bg-[#F8C6BD] border-black border-2 btn-secondary"
            disabled={guestLoading}
          >
            {guestLoading ? 'ログイン中...' : 'ゲストとしてログイン'}
          </button>

          <div className="text-center mt-4">
            <p>
              アカウントをお持ちでない方は
              <Link to="/register" className="link link-primary">
                新規登録
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
