import reducer, { defaultState } from 'redux/modules/publishers';
import deepFreeze from 'deep-freeze';

describe('(Redux) publishers', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    });
  });
});
