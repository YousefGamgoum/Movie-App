import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Not-Found/notFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorText}>404 - Project Not Found</h1>
      <p className={styles.message}>The project you are looking for does not exist.</p>
      <Link to="/" className={styles.homeLink}>
        Return to Projects List
      </Link>
    </div>
  );
};

export default NotFound;