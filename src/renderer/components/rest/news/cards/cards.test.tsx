import "@testing-library/jest-dom"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Cards from "Renderer/components/rest/news/cards/cards.component"

const newsItems = {
  "299": {
    category: "Forum",
    title: "Hot discussion",
    content: "One feature I would love to see added",
    communityLink:
      "https://forum.mudita.com/t/one-feature-i-would-love-to-see-added/299",
    link:
      "https://forum.mudita.com/t/one-feature-i-would-love-to-see-added/299",
    discussionId: "299",
    imageId: "6j1K3VOLf3aAdijTuObagd",
  },
  "703": {
    category: "Blog",
    title: "Latest News",
    content:
      "Our campaign on Kickstarter was a success, reaching 262% of the initial goal!",
    communityLink:
      "https://forum.mudita.com/t/mudita-pure-kickstarter-campaign-is-live/703",
    link:
      "https://mudita.com/community/blog/the-kickstarter-campaign-of-mudita-pure-is-finished/",
    discussionId: "703",
    imageId: "6mdeQ9Pm5Kgsek3x8Pt7Yh",
  },
  "1027": {
    category: "Blog",
    title: "Featured Article",
    content: "Attention: The precious currency we’re giving away for free.",
    communityLink:
      "https://forum.mudita.com/t/attention-the-precious-currency-we-re-giving-away-for-free/1027",
    link:
      "https://mudita.com/community/blog/attention-the-precious-currency-were-giving-away-for-free/",
    discussionId: "1027",
    imageId: "7qdkPb6OhjDR3ZRb90bcck",
  },
}

const newsIds = ["299", "1027", "703"]

const commentsCount = {
  "299": 54,
  "703": 2,
  "1027": 3,
}

const images = {
  "6j1K3VOLf3aAdijTuObagd":
    "//images.ctfassets.net/isxmxtc67n72/6j1K3VOLf3aAdijTuObagd/5c406b7a69a6806003aff0a4b8cb5493/MuditaOS.jpg",
  "6mdeQ9Pm5Kgsek3x8Pt7Yh":
    "//images.ctfassets.net/isxmxtc67n72/6mdeQ9Pm5Kgsek3x8Pt7Yh/2a946227e8a874a8dd047b0497309d4c/final.jpg",
  "7qdkPb6OhjDR3ZRb90bcck":
    "//images.ctfassets.net/isxmxtc67n72/7qdkPb6OhjDR3ZRb90bcck/67c404e8e737a86ed743569ebb39f761/attention.jpg",
}

const moreNewsItems = {
  ...newsItems,
  "1023": {
    category: "Blog",
    title: "Featured Article",
    content: "Attention: The precious currency we’re giving away for free.",
    communityLink:
      "https://forum.mudita.com/t/attention-the-precious-currency-we-re-giving-away-for-free/1027",
    link:
      "https://mudita.com/community/blog/attention-the-precious-currency-were-giving-away-for-free/",
    discussionId: "1023",
    imageId: "7qdkPb6OhjDR3ZRb90bcck",
  },
}

const moreNewsIds = [...newsIds, "1023"]

const moreCommentsCount = { ...commentsCount, "1023": 33 }

const moreImages = {
  ...images,
  "6j1K3VOLf3aAdijTuObagd":
    "//images.ctfassets.net/isxmxtc67n72/6j1K3VOLf3aAdijTuObagd/5c406b7a69a6806003aff0a4b8cb5493/MuditaOS.jpg",
}

test("should render 3 cards", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards
      newsItems={newsItems}
      newsIds={newsIds}
      commentsCount={commentsCount}
      images={images}
    />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})

test("should render 3 cards even when more than 3 elements are passed through props", () => {
  const cardsTestId = "news-card"
  const { getAllByTestId } = renderWithThemeAndIntl(
    <Cards
      newsItems={moreNewsItems}
      newsIds={moreNewsIds}
      images={moreImages}
      commentsCount={moreCommentsCount}
    />
  )

  expect(getAllByTestId(cardsTestId)).toHaveLength(3)
})
