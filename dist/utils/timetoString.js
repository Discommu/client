const timetoString = stamp =>
    new Date(stamp)
    .toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        second: '2-digit'
    })

export default timetoString;