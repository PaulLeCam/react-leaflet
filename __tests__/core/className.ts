import {
  addClassName,
  removeClassName,
  updateClassName,
} from '../../src/core/className'

describe('core/className', () => {
  it('addClassName() adds a class', () => {
    const el = document.createElement('div')
    el.className = 'first'
    addClassName(el, 'second')
    expect(el.className).toBe('first second')
  })

  it('removeClassName() removes a class', () => {
    const el = document.createElement('div')
    el.className = 'first second'
    removeClassName(el, 'first')
    expect(el.className).toBe('second')
  })

  it('updateClassName() updates the classes', () => {
    const el = document.createElement('div')
    el.className = 'first second'
    updateClassName(el, 'first second', 'first third')
    expect(el.className).toBe('first third')
  })
})
