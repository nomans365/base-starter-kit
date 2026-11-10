export interface DocumentNavigationItem {
  id: string
  title: string
  number?: string
  sectionIndex: number
  subsectionIndex?: number
}

export interface DocumentNavigationSection {
  id: number
  title: string
  index: number
  subsections?: DocumentNavigationItem[]
}
