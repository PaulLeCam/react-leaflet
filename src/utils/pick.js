// @flow

export default function pick(object: Object, keys: Array<string>): Object {
  return keys.reduce((obj, key) => {
    if (object[key]) {
      obj[key] = object[key]
    }
    return obj
  }, {})
}
