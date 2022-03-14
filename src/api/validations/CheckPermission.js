export const checkPermission = (id, permissionToCheck, permissions ) => {
    let isAllowed = false 

    permissions.forEach(p => {
        if(p.member_id === id){
            isAllowed = p.permissions.includes(permissionToCheck)
        }
    })

    return isAllowed
}