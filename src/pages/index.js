import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Post from '../components/Post';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <div>
        <Helmet title={siteTitle} />
        {posts.filter(post => post.node.path !== '/404/').map(post => {
          const title = get(post, 'node.frontmatter.title', post.node.path);
          const path = get(post, 'node.frontmatter.path', post.node.path);
          return <Post key={path} post={post} title={title} />;
        })}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
