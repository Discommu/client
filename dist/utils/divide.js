const divide = (List, Limit) => {
    let result = []
    for (let i = 0 ; i < parseInt((List.length + Limit - 1) / Limit) ; i ++) {
        let result2 = []
        for (let j = i * Limit ; j < (i + 1) * Limit ; j ++) {
            if (!List[j]) break;
            result2.push(List[j])
        }
        result.push(result2)
    }
    return result
}

export default divide;