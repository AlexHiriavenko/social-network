import {getProfile, setAuthorizedUser, setUser} from "./redux/user.slice/user.slice.js";

export const editUser = (dispatch) =>{

    const editUser =  dispatch(getProfile())
    editUser.then(result =>{

        if(result.payload) {
            localStorage.setItem("authorizedUser", JSON.stringify({...result.payload, isAuthorized: true}))
            localStorage.setItem("user", JSON.stringify({...result.payload, isAuthorized: true}))
            dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))))
            dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
        }
    })
}