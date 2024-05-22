import process from 'process'
import { promises as fs } from 'fs'

import { isCLICall } from './utils'

const INC_TYPE_NUM = {
  MAJOR: 0,
  MINOR: 1,
  PATCH: 2,
}

export const INC_TYPE = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
  PATCH: 'PATCH',
}

const getIncVersion = (version = '', incType = 'PATCH') => {
  const _incType = incType in INC_TYPE_NUM ? incType : 'PATCH'
  let newVersion = version.split('.').map((num, i) => {
    if (INC_TYPE_NUM[incType] < i) {
      return 0;
    }
    const incArg = i === INC_TYPE_NUM[_incType] ? 1 : 0
    return parseInt(num, 10) + incArg;
  })
  return newVersion.join('.');
}

export const incVersion = async (incType = 'PATCH') => {
  const [pkg, pkgLines] = await fs.readFile('./package.json', 'utf-8').then(pkg => [
    JSON.parse(pkg),
    pkg.split('\n'),
  ])
  const versionIndex = pkgLines.findIndex(line => line.trim().startsWith('"version"'))

  const pkgVersion = pkgLines[versionIndex]
  const newVersion = getIncVersion(pkg.version, incType)
  const newVersionLine = pkgVersion.replace(`"${pkg.version}"`, `"${newVersion}"`)
  pkgLines[versionIndex] = newVersionLine

  // Write new pkg file
  await fs.writeFile('./package.json', pkgLines.join('\n'))

  await fs.writeFile('./dist/api.json', JSON.stringify({ version: newVersion }))

  return newVersion;
}

const isCLI = isCLICall(import.meta.filename)

if (isCLI) {
  const arg = process.argv.find(arg => arg.startsWith('--inc='))
  incVersion(arg && arg.replace('--inc=', ''));
}

export default incVersion;
