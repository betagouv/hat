export function compareByIp(firstIp, secondIp) {
  const firstIpAsNumber = Number(
    firstIp
      .split('.')
      .map(part => part.padStart(3, '0'))
      .join('')
      .padEnd(12, '0'),
  )
  const secondIpAsNumber = Number(
    secondIp
      .split('.')
      .map(part => part.padStart(3, '0'))
      .join('')
      .padEnd(12, '0'),
  )

  return firstIpAsNumber - secondIpAsNumber
}
