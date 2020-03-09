import Prismic from 'prismic-javascript'

export const apiEndpoint = 'https://oiseau.cdn.prismic.io/api/v2'
export const accessToken = ''

// Client method to query documents from the Prismic repo
export const prismicClient = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

const createClientOptions = (req = null, prismicAccessToken: string | null = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  return {
    ...reqOption,
    ...accessTokenOption,
  }
}