import { fromJS } from 'immutable';

import homeReducer from '../reducer';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      posts: {
        all: false,
        filtered: false,
      },
      comments: {},
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });
});
