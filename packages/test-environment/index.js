import { TestEnvironment } from 'jest-environment-jsdom'

function noop() {}
class ResizeObserver {
  observe = noop
  unobserve = noop
  disconnect = noop
}

export default class LeafletTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup()
    this.global.ResizeObserver = ResizeObserver
  }
}
