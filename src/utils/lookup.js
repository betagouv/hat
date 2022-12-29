import { promisify } from 'util'
import whois from 'whois'

import { spinner } from './spinner.js'

const asyncWhoisLookup = promisify(whois.lookup)

export async function lookup(ip) {
  spinner.start(`LOOKUP: ${ip}...`)

  const output = await asyncWhoisLookup(ip)
  const result = output
    .replace(/^(%|#).*/gm, '')
    .replace(/ +/g, ' ')
    .replace(/\n+/gm, '\n')
    .replace(/\n\s+/gm, ' ')
    .trim()
    .split(/\n/)
    .reduce((prev, outputRow) => {
      const chunks = outputRow.split(/:\s/)
      if (chunks.length < 2) {
        spinner.warn(`Warning: Unable to parse WHOIS line "${outputRow}".`)
        spinner.start(`LOOKUP: ${ip}...`)
        // console.debug(output)

        return prev
      }

      const key = chunks[0].toLowerCase()
      const value = chunks.slice(1).join(': ').trim()

      return {
        ...prev,
        [key]: prev[key] && value !== prev[key] ? `${prev[key]} ${value}` : value,
      }
    }, {})

  spinner.succeed(
    `LOOKUP: [${ip}] Country: ${result.country}, Name: ${result.netname} (${result.descr || result.organization}).`,
  )

  return result
}
