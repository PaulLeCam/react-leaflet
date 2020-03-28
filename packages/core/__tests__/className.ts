import { addClassName, removeClassName, updateClassName } from '../src'

describe('className', () => {
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

  it('updateClassName() adds the classes', () => {
    const el = document.createElement('div')
    updateClassName(el, undefined, 'first')
    expect(el.className).toBe('first')
  })

  it('updateClassName() removes the classes', () => {
    const el = document.createElement('div')
    el.className = 'first'
    updateClassName(el, 'first')
    expect(el.className).toBe('')
  })

  it('updateClassName() does nothing if the element is not provided', () => {
    const el = document.createElement('div')
    el.className = 'first'
    updateClassName(null, 'first', 'second')
    expect(el.className).toBe('first')
  })
})
