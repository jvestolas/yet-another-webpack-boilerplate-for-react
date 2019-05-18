import React, { Component } from 'react';
import styles from './styles'

class App extends Component {
  render() {
    return(
      <div className={styles.app_container}>
        <h1 className={styles.heading}>Help me Obi Wan Kenobi, you're my only hope</h1>
      </div>
    )
  }
}

export default App;
