import axios from "axios"
import { Asset, Entry } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"

export const downloadContentful = async () => {
  try {
    const {
      data: { items, includes },
    } = await axios.get(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}&content_type=newsItem`
    )
    const news = items.map(({ fields, sys }: Entry<NewsEntry>) => {
      return {
        ...fields,
        newsId: sys.id,
        updatedAt: sys.updatedAt,
        createdAt: sys.createdAt,
        imageId: fields?.image?.sys?.id,
      }
    })
    news.forEach((item: NewsEntry) => {
      const {
        fields: {
          title,
          file: { url },
        },
      } = includes.Asset.find((asset: Asset) => {
        return item?.image?.sys?.id === asset.sys.id
      })
      item.imageSource = url
      item.imageAlt = title
    })

    return {
      newsItems: news,
    }
  } catch (error) {
    return {}
  }
}

export const downloadComments = async (news: any) => {
  const getCommentsCountByDiscussionId = async (
    discussionId?: string,
    newsId?: string
  ): Promise<{ newsId?: string; count: number }> => {
    const {
      data: { posts_count },
    } = await axios.get(
      `${process.env.GATSBY_COMMUNITY_URL}/t/${discussionId}.json`
    )
    return { newsId, count: posts_count }
  }

  const commentsCalls = news.map(
    ({
      discussionId,
      newsId,
    }: Partial<NewsEntry>): Promise<{
      newsId?: string
      discussionId?: string
      count: number
    }> => getCommentsCountByDiscussionId(discussionId, newsId)
  )
  const commentsCounts = await Promise.all<{
    newsId: string
    count: number
  }>(commentsCalls)

  const counts = commentsCounts.reduce((acc, { newsId, count }) => {
    acc[newsId] = count
    return acc
  }, {} as Record<string, number>)

  return {
    commentsCount: counts,
  }
}
