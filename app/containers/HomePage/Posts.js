import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../components/Item';
import Title from '../../components/Title';
import Text from '../../components/Text';
import List from '../../components/List';

const Posts = ({ posts, getComments }) =>
  posts ? (
    <List>
      {posts.map(e => (
        <Item key={`post-${e.id}`} onClick={() => getComments({ post: e })}>
          <Title>{`${e.title}`}</Title>
          <Text>{`${e.body}`}</Text>
        </Item>
      ))}
    </List>
  ) : (
    ''
  );

Posts.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  getComments: PropTypes.func.isRequired,
};

export default Posts;
