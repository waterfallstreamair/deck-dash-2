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
    const { id } = options;
    this.props.removeComments({ id });
  };

  handleSearch = async event => {
    const { value } = event.target;
    this.props.setFilterRequest({ search: value });
  };

  render() {
    const { posts, comments, filtered } = this.props;
    const items = filtered || posts;
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
          {[...comments.keys()].map(
              e =>
                comments.get(e) && (
                  <Column key={`comments-${e}`} id={`comments-${e}`}>
                    <Head>
                      <Remove onClick={() => this.removeComments({ id: e })}>
                        X
                      </Remove>
                    </Head>
                    <H3>{`Post ${e} Comments`}</H3>
                    <Comments comments={comments.get(e)} />
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
  filtered: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  getPostsRequest: PropTypes.func.isRequired,
  setFilterRequest: PropTypes.func.isRequired,
  getCommentsRequest: PropTypes.func.isRequired,
  removeComments: PropTypes.func.isRequired,
};

export default HomePage;
