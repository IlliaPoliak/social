export const required = value => value ? undefined : 'Field is required'

export const maxLengthCreator = maxLength => value => {
    if (value.length > maxLength){
        return `Max length is ${maxLength} symbols`
    }
    return undefined
}

export const minLengthCreator = minLength => value => {
    if (value.length < minLength){
        return `Min length is ${minLength} symbols`
    }
    return undefined
}