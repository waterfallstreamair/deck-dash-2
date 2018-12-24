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

  handleSearch = e => {
    this.setState({
      search: e.target.value,
    });
  };

  /*renderPosts = options => {
    const { posts } = options;
    if (posts) {
      return posts.map(e => (
        <Item
          key={`post-${e.id}`}
          onClick={() => this.getComments({ post: e })}
        >
          <Title>{`${e.title}`}</Title>
          <Text>{`${e.body}`}</Text>
        </Item>
      ));
    }
    return '';
  };*/

  render() {
    const { posts, comments } = this.props;
    const search = this.state.search ? this.state.search.toLowerCase() : null;
    const filtered = search
      ? posts.filter(e => e.title.toLowerCase().includes(search))
      : null;
    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="A Deck dash application" />
        </Helmet>
        <div>
          <Content>
            <Column key="posts">
              <Head>
                <H3>Posts</H3>
                <Search
                  placeholder="Search..."
                  onKeyUp={e => this.handleSearch(e)}
                />
              </Head>
              <Posts 
                posts={filtered || posts} 
                getComments={this.getComments}
              />
            </Column>
            {posts &&
              posts.map(
                e =>
                  comments.get(e.id) && (
                    <Column key={`comments-${e.id}`} id={`comments-${e.id}`}>
                      <Head>
                        <H3>{`Post ${e.id} Comments`}</H3>
                        <Remove
                          onClick={() => this.removeComments({ post: e })}
                        >
                          X
                        </Remove>
                      </Head>
                      <Comments comments={comments.get(e.id)} />
                    </Column>
                  ),
              )}
          </Content>
        </div>
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
