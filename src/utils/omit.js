// @flow

export default function omit(
  obj: Object,
  ...keysToOmit: Array<string>
): Object {
  return Object.keys(obj).reduce((acc, key) => {
    if (keysToOmit.indexOf(key) === -1) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}
