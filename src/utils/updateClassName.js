// @flow

import { DomUtil } from 'leaflet'
import { forEach } from 'lodash'

const splitClassName = (className: string = ''): Array<string> =>
  className.split(' ').filter(Boolean)

export default (
  container: ?HTMLElement,
  prevClassName: ?string,
  nextClassName: ?string,
) => {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      forEach(splitClassName(prevClassName), cls => {
        DomUtil.removeClass(container, cls)
      })
    }
    if (nextClassName != null && nextClassName.length > 0) {
      forEach(splitClassName(nextClassName), cls => {
        DomUtil.addClass(container, cls)
      })
    }
  }
}
