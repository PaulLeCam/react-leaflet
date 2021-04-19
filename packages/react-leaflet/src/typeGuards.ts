import { GeoJSON, Geometry } from 'geojson'


const geometryTypes = [
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon',
  'GeometryCollection',
]

export const isGeometry = (data?: GeoJSON | null): data is Geometry => !!data && geometryTypes.includes(data.type)


export interface TypeMap {
  string: string
  number: number
  bigint: bigint
  boolean: boolean
  symbol: symbol
  undefined: undefined
  object: Record<PropertyKey, unknown> | null
  function: Function  // eslint-disable-line @typescript-eslint/ban-types

  any: any  // eslint-disable-line @typescript-eslint/no-explicit-any
  unknown: unknown

  array: any[]  // eslint-disable-line @typescript-eslint/no-explicit-any
  nonNullObject: Record<PropertyKey, unknown>
  key: PropertyKey
}

export const isOfType = <T extends keyof TypeMap>(
  data: unknown,
  ...types: T[]
): data is TypeMap[T] => {
  for (const type of types) {
    switch (type) {
      case 'any':
        return true

      case 'unknown':
        return true

      case 'array':
        if (Array.isArray(data)) {
          return true
        }
        continue

      case 'nonNullObject':
        if (data !== null && typeof data === 'object') {
          return true
        }
        continue

      case 'key':
        if (isOfType(data, 'string', 'number', 'symbol')) {
          return true
        }
        continue

      default:
        if (typeof data === type) {
          return true
        }
        continue
    }
  }
  return false
}


export const hasProperty = <P extends PropertyKey, T extends keyof TypeMap>(
  data: unknown,
  property: P,
  ...types: T[]
): data is { [key in P]: TypeMap[T] } =>
    isOfType(data, 'nonNullObject') && property in data && (
      types.length === 0 || isOfType(data[property], ...types)
    )
