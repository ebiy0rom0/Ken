import { JWT } from "npm:google-auth-library"
import { GoogleSpreadsheet } from "npm:google-spreadsheet"

import creds from "./test.json" assert { type: "json" };

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ]
})

try {
console.log("here")
const doc = new GoogleSpreadsheet(DOCUMENT_ID, jwt)
console.log("we")
await doc.loadInfo()
console.log("go")

const sheet = doc.sheetsByIndex[0]
await sheet.loadHeaderRow()

const headers = sheet.headerValues
const shift = (new Array(24).fill(false)).map((_, i) => [11,12,13,14,15,16,17].includes(i))
const tmp: number[] = []

shift.map((v, i) => { if (v) tmp.push(i) })
console.log(`シフト時間:${tmp.join(",")}`)
try {
  const rows = await sheet.getRows()
  const date = rows[1]

  const userRow = rows.find(v => v.get("username") === "sh12ku_prsk")
  console.log(`ユーザー:${userRow?.get("name")}`)

  const index = ((target: string) => {
    for (let i = 0; i < headers.length; i ++) {
      if (date.get(headers[i]) == target) {
        return i
      }
    }
    return -1
  })("12月5日")
  console.log(`12月5日 シフトX座標:${index}`)

  shift.forEach((v, i) => { if (v) { userRow.set(headers[index + i], "o") } })
  userRow.save({ raw: true })

  const newRow = await sheet.addRows([...rows, { username: "name", name: "test" }])
  shift.forEach((v, i) => { if (v) { newRow.set(headers[index + i], "o") } })
  newRow.save()
} catch(e) {
  console.log(`[ERROR]:${e}`)
}

} catch (e) {
  console.log(e)
}