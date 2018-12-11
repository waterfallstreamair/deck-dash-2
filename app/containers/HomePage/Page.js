/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Column from '../../components/Column';
import H3 from '../../components/H3';
import Content from '../../components/Content';
import Item from '../../components/Item';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Remove from '../../components/Remove';
import Search from '../../components/Search';
import Head from '../../components/Head';
import List from '../../components/List';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      search: null
    };
  }
  
  componentDidMount() {
    this.props.getPostsRequest();
  }
  
  getComments = (options) => {
    const { post } = options;
    if (!post.comments) {
      this.props.getCommentsRequest({ post });
    }
  };
  
  removeComments = (options) => {
    const { post } = options;
    this.props.removeComments({ post });
  };
  
  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  };
  
  render() {
    console.log({ props: this.props })
    const { posts } = this.props;
    const search = this.state.search ? this.state.search.toLowerCase() : null;
    const filtered = search ? 
      posts.filter(e => e.title.toLowerCase().includes(search)) 
      : 
      null;
    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta
            name="description"
            content="A Deck dash application"
          />
        </Helmet>
        <div>
        
     <Content>
        <Column key={'posts'} >
          <Head>
            <H3>Posts</H3>
            <Search placeholder="Search..." onKeyUp={e => this.handleSearch(e) } />
          </Head>
          <List>
            {posts.length ? (filtered || posts).map(e =>
              <Item key={`post-${e.id}`} onClick={event => this.getComments({ post: e }) } >
                <Title>{`${e.title}`}</Title>
                <Text>{`${e.body}`}</Text>
              </Item>
            ) : ''}
          </List>
        </Column>
        {posts.map(e =>
          e.comments && 
            <Column key={`comments-${e.id}`}>
              <Head>
                <H3>{`Post ${e.id} Comments`}</H3>
                <Remove onClick={event => this.removeComments({ post: e }) }>X</Remove>
              </Head>
              <List>
              {e.comments.length ? e.comments.map(c =>
                <Item key={`comment-${c.id}`}>
                  <Title>{`${c.name}`}</Title>
                  <Text>{`${c.body}`}</Text>
                </Item>
              ) : ''}
              </List>
            </Column>
        )}
      </Content>
     
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  posts: PropTypes.array.isRequired,
  getPostsRequest: PropTypes.func.isRequired,
  getCommentsRequest: PropTypes.func.isRequired,
  removeComments: PropTypes.func.isRequired
};

export default HomePage

/*

class BoardPage extends Component {
  
  

  
  
  
  
  
  
  

  render = () => {
    
    return (
      
    );
  };
}

export default BoardPage;


*/