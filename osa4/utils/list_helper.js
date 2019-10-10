const dummy = (blogs) => {
    // ...

    return 1
}



const totalLikes = blogs => {
    if (!blogs) return 0

    return blogs.reduce((a, b) => a + b.likes, 0)
}



const favoriteBlog = blogs => {
    let max = blogs.reduce((a, b) => Math.max(a, b.likes), -1)
    const blog = blogs.find(blog => blog.likes === max)

    return blog
}



const mostBlogs = blogs => {

    if (!blogs || blogs.length === 0) 
        return {}

    let dataContainer = new Map()

    blogs.forEach(blog => {
        if (!dataContainer.has(blog.author)) {
            dataContainer.set(blog.author, 1)
        } else {
            dataContainer.set(blog.author, dataContainer.get(blog.author) + 1)
        }
    })

    const maxValue = Math.max(...dataContainer.values())
    
    let author = ''

    dataContainer.forEach((value, key) => {
        if (value === maxValue && !author) 
            author = key
    })

    return {
        author, 
        blogs: maxValue
    }
}


const mostLikes = blogs => {
    if (!blogs || blogs.length === 0) 
        return {}

    let dataContainer = new Map()

    blogs.forEach(blog => {
        if (!dataContainer.has(blog.author)) {
            dataContainer.set(blog.author, blog.likes)
        } else {
            dataContainer.set(blog.author, dataContainer.get(blog.author) + blog.likes)
        }
    })

    const maxValue = Math.max(...dataContainer.values())
    
    let author = ''

    dataContainer.forEach((value, key) => {
        if (value === maxValue && !author) 
            author = key
    })

    return {
        author, 
        likes: maxValue
    }
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}