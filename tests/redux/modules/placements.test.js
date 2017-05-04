import reducer, { defaultState } from 'redux/modules/placements';
import deepFreeze from 'deep-freeze';

describe('(Redux) placements', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    });
  });
});
