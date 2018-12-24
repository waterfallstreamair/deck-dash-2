import React from 'react';

import Item from '../../components/Item';
import Title from '../../components/Title';
import Text from '../../components/Text';
import List from '../../components/List';

export default ({ posts, getComments }) => {
  if (posts) {
    return (
      <List>
        {posts.map(e => (
          <Item
            key={`post-${e.id}`}
            onClick={() => getComments({ post: e })}
          >
            <Title>{`${e.title}`}</Title>
            <Text>{`${e.body}`}</Text>
          </Item>
        ))}
      </List>
    );
  }
  return '';
}
