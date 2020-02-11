const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of one blog is equal to its likes', () => {
    const result = listHelper.totalLikes(blogs.slice(3, 4))
    expect(result).toBe(10)
  })

  test('of bigger list is sum of all', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('of all is one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expectedResult = blogs[2]
    expect(result).toEqual(expectedResult)
  })
})

describe('most blogging author', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('of one blog is same', () => {
    const result = listHelper.mostBlogs(blogs.slice(1, 2))
    expectedResult = { author: blogs[1].author, blogs: 1 }
    expect(result).toEqual(expectedResult)
  })

  test('of all is blogger with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expectedResult)
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('of one blog is same', () => {
    const result = listHelper.mostLikes(blogs.slice(5, 6))
    expectedResult = { author: blogs[5].author, likes: blogs[5].likes }
    expect(result).toEqual(expectedResult)
  })

  test('of all is blogger with most combined likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expectedResult)
  })
})
