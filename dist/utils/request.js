export const url = 'http://localhost:3000/graphql';
export const req = async ({ query, variables = {}, headers = {} }) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token || ''}`,
            ...headers
        },
        body: JSON.stringify({ query, variables })
    })
    return await res.json()
}