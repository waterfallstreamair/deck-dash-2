/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import Column from '../../components/Column';
import H3 from '../../components/H3';
import Content from '../../components/Content';
import Remove from '../../components/Remove';
import Search from '../../components/Search';
import Head from '../../components/Head';
import Comments from './Comments';
import Posts from './Posts';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      filtered: null
    };
  }

  componentDidMount() {
    this.props.getPostsRequest();
  }

  getComments = options => {
    const { post } = options;
    this.props.getCommentsRequest({ post });
  };

  removeComments = options => {
    const { post } = options;
    this.props.removeComments({ post });
  };

  handleSearch = async (e) => {
    const { value } = e.target;
    const search = value ? value.toLowerCase() : null;
    const filtered = search
      ? this.props.posts.filter(e => e.title.toLowerCase().includes(search))
      : null;
    this.setState({
      search, filtered
    });
  };

  render() {
    const { posts, comments } = this.props;
    const { filtered } = this.state;
    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="A Deck dash application" />
        </Helmet>
        <Content>
          <Column key="posts">
            <H3>Posts</H3>
            <Search
              placeholder="Search..."
              onKeyUp={e => this.handleSearch(e)}
            />
            <Posts posts={filtered || posts} getComments={this.getComments} />
          </Column>
          {posts &&
            posts.map(
              e =>
                comments.get(e.id) && (
                  <Column key={`comments-${e.id}`} id={`comments-${e.id}`}>
                    <Head>
                      <Remove
                        onClick={() => this.removeComments({ post: e })}
                      >
                        X
                      </Remove>
                    </Head>  
                    <H3>{`Post ${e.id} Comments`}</H3>
                    <Comments comments={comments.get(e.id)} />
                  </Column>
                ),
            )}
        </Content>
      </article>
    );
  }
}

HomePage.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  getPostsRequest: PropTypes.func.isRequired,
  getCommentsRequest: PropTypes.func.isRequired,
  removeComments: PropTypes.func.isRequired,
};

export default HomePage;
