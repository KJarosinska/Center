import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"

export type Dictionary = Record<string, SortDirection>
export type SimpleDictionary<T = any> = Record<string, T>

interface GetData<T = Dictionary> {
  dataToSort: T[]
  hasBeenSorted: boolean
  sortDirection: Dictionary
  sortKey: string
}

export const getData = <T = Dictionary>({
  dataToSort,
  hasBeenSorted,
  sortDirection,
  sortKey,
}: GetData<T>) => {
  if (hasBeenSorted) {
    return sortDirection[sortKey] === SortDirection.Descending
      ? dataToSort
      : dataToSort.reverse()
  }

  return dataToSort
}

export const getSortingDirection = (term: SortDirection): SortDirection => {
  /**
   * When you want to add another state, simply create a new case
   * and modify `TableSortButton` accordingly.
   */
  switch (term) {
    case SortDirection.Descending:
      return SortDirection.Ascending
    case SortDirection.Ascending:
    default:
      return SortDirection.Descending
  }
}
export const createSortDirection = (
  input: (Dictionary | SimpleDictionary)[]
): Dictionary => {
  return Object.keys(input[0]).reduce(
    (acc, item) => ({
      ...acc,
      [item]: SortDirection.Ascending,
    }),
    {}
  )
}
