import { req } from "./request"

export const getPosts = async params => {
    const { searchValue, selectedOption, category, tags } = params || {}
    const tagText = tags ? `tag: [${`${tags}`
        .split(',')
        .map(x => `"${x}"`)
        .join(",")}]` : ""

    const res = await req({
        query: `
            query {
                posts${!!Object.keys(params).length ? `(${selectedOption ? `searchType: "${selectedOption}",` : ""} ${searchValue ? `searchQuery: "${searchValue}",` : ""} ${tagText} ${category ? `category: "${category}"` : ""})` : ""} {
                    _id
                    author {
                        username
                        discriminator
                        id
                    }
                    title
                    tag
                    hearts
                    views
                    comments {
                        _id
                    }
                }
            }
        `
    })
    return res;
}

export const getCategories = async params => {
    const { searchValue, selectedOption } = params || {}

    const res = await req({
        query: `
            query {
                categories${params ? `(${selectedOption ? `searchType: "${selectedOption}",` : ""} ${searchValue ? `searchQuery: "${searchValue}"` : ""})` : ""} {
                    name
                    description
                    author {
                        username
                        discriminator
                    }
                    posts {
                        _id
                    }
                }
            }
        `
    })
    return res;
}