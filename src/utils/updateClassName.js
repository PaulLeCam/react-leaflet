// @flow

import { DomUtil } from 'leaflet'

const splitClassName = (className: string = ''): Array<string> => {
  return className.split(' ').filter(Boolean)
}

export default (
  container: ?HTMLElement,
  prevClassName: ?string,
  nextClassName: ?string,
) => {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      splitClassName(prevClassName).forEach(cls => {
        DomUtil.removeClass(container, cls)
      })
    }
    if (nextClassName != null && nextClassName.length > 0) {
      splitClassName(nextClassName).forEach(cls => {
        DomUtil.addClass(container, cls)
      })
    }
  }
}
