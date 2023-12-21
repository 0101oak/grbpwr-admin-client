import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { LoginResponse } from 'api/proto-http/auth';
import { login } from 'api/auth';
import { ROUTES } from 'constants/routes';
import { useNavigate } from '@tanstack/react-location';
import styles from 'styles/login-block.module.scss';

export const LoginBlock: FC = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate({ to: ROUTES.main, replace: true });
    }
  }, [navigate]);

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        throw new Error('empty fields');
      }
      const response: LoginResponse = await login({ username: username, password: password });

      if (!response.authToken) {
        setErrorMessage('token not received');
        return;
      }

      const authToken = response.authToken;

      localStorage.setItem('authToken', authToken);

      navigate({ to: ROUTES.main, replace: true });
    } catch (error: any) {
      console.error(error);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.logo}></div>
      <div className={styles.card_body}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form className={styles.form} onSubmit={handlePasswordSubmit}>
          <div className={styles.user_container}>
            <input
              className={styles.input}
              onChange={handleUsernameChange}
              type='text'
              name='username'
              placeholder='USERNAME'
            />
          </div>
          <div className={styles.user_container}>
            <input
              className={styles.input}
              onChange={handlePasswordChange}
              type='password'
              name='password'
              placeholder='PASSWORD'
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};
