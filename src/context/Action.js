export const LoginStart = () => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
})

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})
export const LogOut = () => ({
    type: "LOG_OUT"
})
export const UpdateUser = () => ({
    type: "USER_UPDATE",
    payload: user

})
export const DeleteUser = () => (
    {
        type: "USER_DELETE",
    }
)