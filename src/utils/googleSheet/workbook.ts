import { GoogleSpreadsheet } from "npm:google-spreadsheet"
import { JWT } from "npm:google-auth-library"

export class GoogleSheetWorkbook {
  private static instance?: GoogleSheetWorkbook
  private doc: GoogleSpreadsheet

  private constructor () {
    // if (typeof window !== "undefined") throw Error("Don't call this class in browser.")
    this.doc = new GoogleSpreadsheet(Deno.env.get("DOCUMENT_ID")!, new JWT({
      email: Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL")!,
      key: Deno.env.get("GOOGLE_PRIVATE_KEY")!,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ]
    }))
  }

  static async getInstance () {
    if (this.instance) return this.instance

    const instance = new GoogleSheetWorkbook()
    await instance.doc.loadInfo()

    return instance
  }

  get sheetNames () { return this.doc.sheetsByIndex.map(sheet => sheet.title) }

  sheetsByIndex = (index: number) => this.doc.sheetsByIndex[index] ?? []
  sheetsByTitle = (title: string) => this.doc.sheetsByTitle[title] ?? []
}