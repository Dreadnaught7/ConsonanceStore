export const SQUARE_BOOK_VARIATIONS: Record<string, string> = {
  "matriarch-bf1": "FIXFVB6TKMRBDIJZWLVLAM7Z",
  "who-are-we-book-one-the-record": "EYFBFZH45BKBC3A3VZEQZQTB",
  "who-are-we-book-two-the-human-ledger": "IDM4KI3TVGNAJHLGTWBAMHPS",
  "before-the-bullet-target-black-messiah": "E36P4ZHOAIU2U5PIMX5IB2IO",
  "before-the-bullet-a-dream-observed": "4VPYB3FORYYFQT7RJLFN3SEO",
  "before-the-bullet-the-means-they-feared": "TOTPTBFA7CVPSTPSNGN2PIVY",
  "the-resonance-method-second-edition": "FVGBGAIAVISR3QVQEYCXWKAH",
  "grounds-harlem": "F3PBWNTWEIXCKNFID2NLGBYJ",
  "the-air-was-safe": "BQQEJKJJ2M2XRGBYXOY45UCO",
  "among-the-reeds": "I5QJXX6KRAVIRSXNPA6L2JY3",
  "uncrossed": "YUQUHY7WHPIFMI4XISVY5JSJ",
};

export function squareVariationIdFor(slug: string) {
  return SQUARE_BOOK_VARIATIONS[slug];
}
