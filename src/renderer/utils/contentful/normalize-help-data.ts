import { Entry, SyncCollection } from "contentful"
import { Document } from "@contentful/rich-text-types"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"

export interface HelpEntry {
  id: string
  question: Record<string, string>
  answer: { [key: string]: Document & { [key: string]: any } }
}

export interface NormalizedHelpEntry {
  id: string
  question: string
  answer: Document
}

export interface NormalizedOutput extends QuestionAndAnswer {
  nextSyncToken?: string
}

export const normalizeHelpData = (
  data: SyncCollection,
  locale: string
): NormalizedOutput => {
  const { entries, nextSyncToken } = data
  const items = entries.reduce((acc, currentValue) => {
    return {
      ...acc,
      [currentValue.sys.id]: {
        id: currentValue.sys.id,
        question: currentValue.fields.question[locale],
        answer: currentValue.fields.answer[locale],
      },
    }
  }, {})
  const collection = entries.map(({ sys }: Entry<HelpEntry>) => sys.id)
  return {
    collection,
    items,
    nextSyncToken,
  }
}
