import React from 'react';

import Item from '../../components/Item';
import Title from '../../components/Title';
import Text from '../../components/Text';
import List from '../../components/List';

export default ({ comments }) => {
  return (
    <List>
      {comments.map(e => (
        <Item key={`comment-${e.id}`}>
          <Title>{`${e.name}`}</Title>
          <Text>{`${e.body}`}</Text>
        </Item>
      ))}
    </List>
  );
}
