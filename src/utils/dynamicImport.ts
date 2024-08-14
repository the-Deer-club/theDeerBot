import { isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'
import { EOS } from './enum'
import os from 'os'

export default async function dynamicImport(path: string): Promise<string> {
  let newPath = path
  if (os.platform() === EOS.WINDOWS) {
    newPath = 'file://' + path
  }
  return await import(
    isAbsolute(newPath) ? pathToFileURL(newPath).toString() : newPath
  )
}
