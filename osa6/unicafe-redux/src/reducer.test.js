import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('multiple increments leads to correct state', () => {
    const stateAtBeginning = initialState
    deepFreeze(stateAtBeginning)

    const state1 = counterReducer(stateAtBeginning, { type: 'GOOD' })
    const state2 = counterReducer(state1, { type: 'BAD' })
    const state3 = counterReducer(state2, { type: 'OK' })
    const state4 = counterReducer(state3, { type: 'GOOD' })
    const finalState = counterReducer(state4, { type: 'OK' })
    expect(finalState).toEqual({
      good: 2,
      ok: 2,
      bad: 1
    })
  })

  test('zeroing causes state to reset', () => {
    const stateAtBeginning = initialState
    deepFreeze(stateAtBeginning)

    const state1 = counterReducer(stateAtBeginning, { type: 'GOOD' })
    const state2 = counterReducer(state1, { type: 'BAD' })
    const stateAtMiddle = counterReducer(state2, { type: 'GOOD' })

    expect(stateAtMiddle).toEqual({
      good: 2,
      ok: 0,
      bad: 1
    })

    const finalState = counterReducer(stateAtMiddle, { type: 'ZERO' })

    expect(finalState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
