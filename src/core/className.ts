import { DomUtil } from 'leaflet'

function splitClassName(className = ''): string[] {
  return className.split(' ').filter(Boolean)
}

export function addClassName(container: HTMLElement, className: string): void {
  splitClassName(className).forEach(cls => {
    DomUtil.addClass(container, cls)
  })
}

export function removeClassName(
  container: HTMLElement,
  className: string,
): void {
  splitClassName(className).forEach(cls => {
    DomUtil.removeClass(container, cls)
  })
}

export function updateClassName(
  container?: HTMLElement,
  prevClassName?: string,
  nextClassName?: string,
) {
  if (container != null && nextClassName !== prevClassName) {
    if (prevClassName != null && prevClassName.length > 0) {
      removeClassName(container, prevClassName)
    }
    if (nextClassName != null && nextClassName.length > 0) {
      addClassName(container, nextClassName)
    }
  }
}
