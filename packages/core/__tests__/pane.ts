import { type LeafletContextInterface, withPane } from '../src'

describe('pane', () => {
  test('withPane() using context', () => {
    expect(
      withPane({ attribution: 'text' }, {
        pane: 'test',
      } as unknown as LeafletContextInterface),
    ).toEqual({
      attribution: 'text',
      pane: 'test',
    })
  })

  test('withPane() using prop over context', () => {
    expect(
      withPane({ attribution: 'text', pane: 'prop' }, {
        pane: 'context',
      } as unknown as LeafletContextInterface),
    ).toEqual({
      attribution: 'text',
      pane: 'prop',
    })
  })

  test('withPane() with no pane', () => {
    expect(
      withPane(
        { attribution: 'text' },
        {} as unknown as LeafletContextInterface,
      ),
    ).toEqual({
      attribution: 'text',
    })
  })
})
