const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return _.sumBy(blogs, 'likes')
}

const favoriteBlog = blogs => {
  return _.maxBy(blogs, 'likes')
}

const mostBlogs = blogs => {
  return _(blogs)
    .countBy('author')
    .map((total, author) => ({ author: author, blogs: total }))
    .maxBy('blogs')
}

const mostLikes = blogs => {
  return _(blogs)
    .groupBy('author')
    .map((likes, author) => ({
      author: author,
      likes: _.sumBy(likes, 'likes')
    }))
    .maxBy('likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
