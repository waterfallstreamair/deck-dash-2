import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../components/Item';
import Title from '../../components/Title';
import Text from '../../components/Text';
import List from '../../components/List';

const Comments = ({ comments }) => (
  <List>
    {comments.map(e => (
      <Item key={`comment-${e.id}`}>
        <Title>{`${e.name}`}</Title>
        <Text>{`${e.body}`}</Text>
      </Item>
    ))}
  </List>
);

Comments.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
};

export default Comments;
