import { stringify as csvStringify } from 'csv-stringify'

export async function getCsvFromObject(data) {
  return new Promise((resolve, reject) => {
    csvStringify(
      data,
      {
        header: true,
        quoted_empty: true,
        quoted_string: true,
      },
      (err, dataAsCsv) => {
        if (err) {
          reject(err)

          return
        }

        resolve(dataAsCsv)
      },
    )
  })
}
