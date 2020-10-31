import { addClassName, removeClassName, updateClassName } from '../src'

describe('dom', () => {
  test('addClassName() adds a class', () => {
    const el = document.createElement('div')
    el.className = 'first'
    addClassName(el, 'second')
    expect(el.className).toBe('first second')
  })

  test('removeClassName() removes a class', () => {
    const el = document.createElement('div')
    el.className = 'first second'
    removeClassName(el, 'first')
    expect(el.className).toBe('second')
  })

  test('updateClassName() updates the classes', () => {
    const el = document.createElement('div')
    el.className = 'first second'
    updateClassName(el, 'first second', 'first third')
    expect(el.className).toBe('first third')
  })

  test('updateClassName() adds the classes', () => {
    const el = document.createElement('div')
    updateClassName(el, undefined, 'first')
    expect(el.className).toBe('first')
  })

  test('updateClassName() removes the classes', () => {
    const el = document.createElement('div')
    el.className = 'first'
    updateClassName(el, 'first')
    expect(el.className).toBe('')
  })

  test('updateClassName() does nothing if the element is not provided', () => {
    const el = document.createElement('div')
    el.className = 'first'
    updateClassName(null, 'first', 'second')
    expect(el.className).toBe('first')
  })
})
