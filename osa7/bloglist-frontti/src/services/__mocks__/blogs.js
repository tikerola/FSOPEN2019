

const blogs = [
  {
    title: 'title1',
    author: 'author1',
    likes: 12,
    url: 'url1',
    user: 'user1'
  },
  {
    title: 'title2',
    author: 'author2',
    likes: 24,
    url: 'url2',
    user: 'user2'
  },
  {
    title: 'title3',
    author: 'author3',
    likes: 48,
    url: 'url3',
    user: 'user3'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const restoreToken = () => {}

export default { getAll, restoreToken }