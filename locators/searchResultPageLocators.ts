export const searchResultPageLocators = {
  heading: (searchTerm: string) => `role=heading[name="ค้นหางาน “${searchTerm}”"]`,
  cards: '.trb-product-card',
  cardTitle: '.info-container .title',
  clearButton: 'i.fa-light.fa-xmark._fs-200._cl-text-default-100._bgcl-neutral-200._bdrd-4px',
  searchInput: 'input.SearchFreelance_input__IasXv._pdl-2px',
} as const;