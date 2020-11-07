import { withPane } from '../src'

describe('pane', () => {
  test('withPane() using context', () => {
    expect(withPane({ attribution: 'text' }, { pane: 'test' } as any)).toEqual({
      attribution: 'text',
      pane: 'test',
    })
  })

  test('withPane() using prop over context', () => {
    expect(
      withPane({ attribution: 'text', pane: 'prop' }, {
        pane: 'context',
      } as any),
    ).toEqual({
      attribution: 'text',
      pane: 'prop',
    })
  })

  test('withPane() with no pane', () => {
    expect(withPane({ attribution: 'text' }, {} as any)).toEqual({
      attribution: 'text',
    })
  })
})
