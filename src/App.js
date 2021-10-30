import React from 'react'
import styles from './App.module.css'

import { FaSignInAlt } from 'react-icons/fa'

const App = () => {
  const logout = () => {
    localStorage.removeItem('localJWT')
    window.location.href = '/'
  }

  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button onClick={logout} className={styles.signBtn}>
          <FaSignInAlt />
        </button>
      </div>
      <div className={styles.appDetails}></div>
    </div>
  )
}

export default App
