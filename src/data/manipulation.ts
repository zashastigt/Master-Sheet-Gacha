export function convertToObject(array: Object[]) {
  return Object.keys(array).reduce((acc: Record<string, any>, key: any) => {
    const innerObject: Record<string, any> = array[key]
    const innerKey = Object.keys(innerObject)[0]
    acc[innerKey] = innerObject[innerKey]
    return acc
  }, {})
}

export function filterObject(item: Record<string, any>, remove: string[]) {
  return Object.keys(item).filter(key => !remove?.includes(key)).reduce((obj, key) => {
    return {
      ...obj, [key]: item[key]
    }
  }, {})
}

export const toPascalCase = (str: string) =>
  str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map((x: string) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
  .join('');

export function replaceChar(link: string, array: string[]) {
  return link.replace(/\{var(\d+)\}/g, (substr: string, idx: string) => array[parseInt(idx) - 1])
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);