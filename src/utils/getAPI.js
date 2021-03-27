import { req } from "./request"

export const getPosts = async ({ searchValue, selectedOption, category, tags }) => {
    const tagText = `${tags}`
        .split(',')
        .map(x => `"${x}"`)
        .join(",")

    const res = await req({
        query: `
            query {
                posts(searchType: "${selectedOption}", searchQuery: "${searchValue}", ${tags.length ?  `tags: [${tagText}],` : ""} category: "${category}") {
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