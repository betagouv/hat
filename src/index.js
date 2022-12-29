import { promises as fs } from 'fs'
import { keys, omit } from 'ramda'

import { check } from './utils/check.js'
import { compareByIp } from './utils/compareByIp.js'
import { getCsvFromObject } from './utils/getCsvFromObject.js'
import { lookup } from './utils/lookup.js'
import { spinner } from './utils/spinner.js'

process.removeAllListeners('warning')
const [, , ...IPS] = process.argv

async function processIp(ip) {
  const cleanIp = ip.replace(/[^\d\.]+/gm, '').replace(/^\.|\.$/gm, '')
  const ipLength = cleanIp.split('.').length

  if (ipLength === 4) {
    console.log('―'.repeat(80))

    const checkResult = await check(cleanIp)
    const lookupResult = await lookup(cleanIp)

    console.log()

    return [
      {
        check: checkResult,
        lookup: lookupResult,
      },
    ]
  }

  if (ipLength === 3) {
    let ipLastPart = -1
    const results = []
    while (++ipLastPart <= 255) {
      console.log('―'.repeat(80))

      const fullIp = `${cleanIp}.${ipLastPart}`
      const checkResult = await check(fullIp)
      const lookupResult = await lookup(fullIp)

      results.push({
        check: checkResult,
        lookup: lookupResult,
      })

      console.log()
    }

    return results
  }

  console.error(`Error: Unable to parse IP "${ip}".`)

  return
}

;(async () => {
  if (!IPS.length) {
    spinner.error(`Error: You must specify at least one IP (i.e.: "npm start 1.2.3.4" or "npm start 1.2.3").`)

    return
  }

  const results = []
  const sortedIps = IPS.sort(compareByIp)
  for (const ip of sortedIps) {
    const newResults = await processIp(ip)

    results.push(...newResults)
  }

  console.log('―'.repeat(80))
  spinner.start(`Writting results to \`${process.cwd()}/results.csv\` and \`${process.cwd()}/results.json\`...`)

  const resultsAsCsv = await getCsvFromObject(
    results.map(({ check, lookup }) => ({
      ...check,
      ...omit(keys(check), lookup),
    })),
  )
  await fs.writeFile('./results.csv', resultsAsCsv, 'utf-8')

  const resultsAsJson = JSON.stringify(results, null, 2)
  await fs.writeFile('./results.json', resultsAsJson, 'utf-8')

  spinner.succeed(`Results written in \`${process.cwd()}/results.csv\` and \`${process.cwd()}/results.json\`.`)
  console.log()
})()
