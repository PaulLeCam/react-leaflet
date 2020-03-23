// @flow

import { DomUtil } from 'leaflet'

const splitClassName = (className: string = ''): Array<string> => {
  return className.split(' ').filter(Boolean)
}

export const addClassName = (container: HTMLElement, className: string) => {
  splitClassName(className).forEach((cls) => {
    DomUtil.addClass(container, cls)
  })
}

export const removeClassName = (container: HTMLElement, className: string) => {
  splitClassName(className).forEach((cls) => {
    DomUtil.removeClass(container, cls)
  })
}

export default (
  container: ?HTMLElement,
  prevClassName: ?string,
  nextClassName: ?string,
) => {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      removeClassName(container, prevClassName)
    }
    if (nextClassName != null && nextClassName.length > 0) {
      addClassName(container, nextClassName)
    }
  }
}
