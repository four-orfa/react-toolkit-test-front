import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import styles from './Login.module.css'
import {
  editUsername,
  editPassword,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuth,
  selectIsLoginView,
} from './loginSlice'

const Login = () => {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  const isLoginView = useSelector(selectIsLoginView)
  const btnDisabler = auth.username === '' || auth.password === ''

  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(auth))
    } else {
      const result = await dispatch(fetchAsyncRegister(auth))
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(auth))
      }
    }
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? 'Login' : 'Register'}</h1>
        <span>Login</span>
        <input
          type='text'
          className={styles.inputLog}
          name='username'
          placeholder=''
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type='password'
          className={styles.inputLog}
          name='password'
          placeholder=''
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button variant='contained' disabled={btnDisabler} color='primary' onClick={login}>
            {isLoginView ? 'Login' : 'Create'}
          </Button>
        </div>
        <span className={styles.switchText} onClick={(e) => dispatch(toggleMode())}>
          {isLoginView ? 'Create Account ?' : 'Back to Login'}
        </span>
      </div>
    </div>
  )
}

export default Login
