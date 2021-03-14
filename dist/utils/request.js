export const url = 'https://api.discommu.ga/graphql';
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