import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.unmount());

  it('renders the app', () => {
    wrapper = mount(
      <App />
    );

    expect(wrapper.find('.app')).toHaveLength(1);
  });
});
