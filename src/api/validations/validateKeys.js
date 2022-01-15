export const validateKeys = (data, keys) =>{
    
    const totalKeys = Object.keys(keys)
    const keysReceived = Object.keys(data)

    const missingParams = getMissingParams(keysReceived, totalKeys);

    if(missingParams.length > 0){
        return {
            status: false,
            type: "missingParams",
            missing_params: missingParams
        }
    }

    let ERROR = false
    const invalid_params = []

    totalKeys.forEach(k => {
        if(data[k] === "" || !data[k] || data[k] == ""){
            invalid_params.push(k)
        }
    })


    if(invalid_params.length > 0){
        return {
            status: false,
            type: 'invalidParams',
            invalid_params: invalid_params,
        }
    }

    return {
        status: true,
        type: "success"
    }
}

export const getMissingParams = (keysReceived, totalKeys) => {
    const missingParams = totalKeys.filter(k => !keysReceived.includes(k))
    return missingParams
}

export const filterValidKeys = (recievedKeys, keys) => {
    return Object.keys(recievedKeys).filter(k => keys[k])
}