import { directus } from "../services/directus";
import { useState, useContext } from 'react';
import { useAppContext } from "../layouts/Default"
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../utils/auth";

export default function Form() {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  const { app, dispatch } = useAppContext();
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(mail, pass);

      setStatus('success');
      nav("/")
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleMailChange(e) {
    setMail(e.target.value);
  }

  function handlePassChange(e) {
    setPass(e.target.value);
  }

  return (
    <>
      <main>
        <div className="container">
          <h2>请登录</h2>
          <form onSubmit={handleSubmit}>
            <label>邮箱:</label>
            <input
              value={mail}
              onChange={handleMailChange}
              disabled={status === 'submitting'}
            />
            <br />
            <br />

            <label>密码:</label>
            <input
              type='password'
              value={pass}
              onChange={handlePassChange}
              disabled={status === 'submitting'}
            />
            <br />
            <br />
            <button disabled={
              mail.length === 0 ||
              status === 'submitting'
            }>
              提交
            </button>
            {error !== null &&
              <p className="Error">
                {error.message}
              </p>
            }
          </form>
        </div>

      </main>

    </>
  );
  function submitForm(mail, pass) {
    // 模拟接口请求
    return new Promise((resolve, reject) => {
      directus.auth.login({ email: mail, password: pass }).then((resp) => {
        console.log(resp)
        dispatch({ type: "SET_LOGIN_NAME", playload: mail })
        setToken(resp.access_token)
        resolve();
      }).catch((err) => {
        console.log(err)
        reject(new Error('猜的不错，但答案不对。再试试看吧！'));
      })
      // setTimeout(() => {
      //   let shouldError = answer.toLowerCase() !== 'lima'
      //   if (shouldError) {
      //     reject(new Error('猜的不错，但答案不对。再试试看吧！'));
      //   } else {
      //     resolve();
      //   }
      // }, 1500);
    });
  }
}


