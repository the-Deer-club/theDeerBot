import fs from 'fs'
import path from 'path'

export const getAllFiles = (
  directory: string,
  folderOnly: boolean = false,
): string[] => {
  const fileNames: string[] = []

  try {
    const files = fs.readdirSync(directory, { withFileTypes: true })

    for (const file of files) {
      const filePath = path.join(directory, file.name)
    if (folderOnly && file.isDirectory()) {
        fileNames.push(filePath)
    } else if (!folderOnly && file.isFile()) {
        fileNames.push(filePath)
    }
    }
  } catch (error) {
    console.error(`Error reading directory: ${directory}`)
    console.error(error)
  }
  
  return fileNames
}
