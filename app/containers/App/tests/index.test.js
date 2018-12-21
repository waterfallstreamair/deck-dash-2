import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../index';
import HomePage from '../../HomePage';
import H1 from '../../../components/H1';

describe('<App />', () => {
  it('should render H1', () => {
    const component = shallow(<App />);
    expect(component.find(H1)).toHaveLength(1);
  });

  it('should render some routes', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Route)).not.toHaveLength(0);
  });

  it('should render BoardPage', () => {
    const component = shallow(<App />);
    expect(component.find(HomePage)).toHaveLength(1);
  });
});
