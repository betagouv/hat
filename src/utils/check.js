import { load } from 'cheerio'
import fetch from 'node-fetch'

import { spinner } from './spinner.js'

export async function check(ip) {
  spinner.start(`CHECK: ${ip}...`)

  const url = `https://scamalytics.com/ip/${ip}`
  const res = await fetch(url)
  const body = await res.text()
  const $ = load(body)
  const outputAsJson = $('pre').text()
  const result = {
    ...JSON.parse(outputAsJson),
    checkUrl: url,
  }

  spinner.succeed(`CHECK: [${ip}] Fraud Score: ${result.score} / 100 (${url}).`)

  return result
}
