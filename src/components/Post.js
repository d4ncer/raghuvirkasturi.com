import React from 'react';
import Link from 'gatsby-link';

import styles from './post.module.css';

class Post extends React.Component {
  render() {
    const { post, title } = this.props;
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>
          <Link style={{ boxShadow: 'none' }} to={post.node.frontmatter.path}>
            {title}
          </Link>
        </h3>
        <p className={styles.date}>{post.node.frontmatter.date}</p>
      </div>
    );
  }
}

export default Post;
