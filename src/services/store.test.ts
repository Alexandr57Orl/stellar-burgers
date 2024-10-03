import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import store from './store';

describe('store tests', () => {
  test('initial state test', () => {
    const fakeAction = {
      type: '@@INIT'
    };
    const initialState = rootReducer(undefined, fakeAction);
    expect(initialState).toEqual(store.getState());
  });
});
