import { isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'
import os from 'os'

export default function dynamicImport(path: string) {
  let newPath = path
  if (os.platform() === 'win32') {
    newPath = 'file://' + path
  }
  return import(
    isAbsolute(newPath) ? pathToFileURL(newPath).toString() : newPath
  )
}
