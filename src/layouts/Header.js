import React from 'react';
import Link from 'gatsby-link';

import styles from './header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link to={'/'}>Home</Link>
          </div>
          <div className={styles.right} />
        </div>
      </header>
    );
  }
}

export default Header;
