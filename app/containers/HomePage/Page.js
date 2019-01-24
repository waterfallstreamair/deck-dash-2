/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
      filtered: null,
    };
  }

  componentDidMount() {
    this.props.getPostsRequest();
  }

  getComments = async options => {
    const { post } = options;
    this.props.getCommentsRequest({ post });
  };

  removeComments = async options => {
    const { post } = options;
    this.props.removeComments({ post });
  };

  handleSearch = async event => {
    const { value } = event.target;
    const search = value ? value.toLowerCase() : null;
    const filtered = search
      ? this.props.posts.filter(e => e.title.toLowerCase().includes(search))
      : null;
    this.setState({
      filtered,
    });
  };

  render() {
    const { posts, comments } = this.props;
    const { filtered } = this.state;
    const items = posts || filtered;
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
            <Posts posts={items} getComments={this.getComments} />
          </Column>
          {items && items.length &&
            items.map(
              e =>
                comments.get(e.id) && (
                  <Column key={`comments-${e.id}`} id={`comments-${e.id}`}>
                    <Head>
                      <Remove onClick={() => this.removeComments({ post: e })}>
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
