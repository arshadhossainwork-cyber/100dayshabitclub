import { Component } from 'react';
import { STORAGE_KEY } from '../../utils/constants.js';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  handleClearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.icon} aria-hidden="true">&#x26A0;&#xFE0F;</div>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.message}>
              An unexpected error occurred. Try reloading the page.
            </p>
            <div className={styles.actions}>
              <button className={styles.reloadBtn} onClick={this.handleReload}>
                Reload
              </button>
              <button className={styles.clearBtn} onClick={this.handleClearData}>
                Clear Data &amp; Restart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
