import React from 'react';
import 'prismjs/themes/prism-tomorrow.css';

import Header from './Header';

import styles from './template.module.css';

class Template extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <Header />
        {children()}
      </div>
    );
  }
}

export default Template;
