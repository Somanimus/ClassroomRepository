const Reducer = (state, action) => {
        switch(action.type) {
            case "LOGIN_START":
                return {
                    user:null
                }

            case "LOGIN_SUCCESS": 
            return {
                user: action.payload
            }
           case "LOGIN_FAILURE":
               return {
                   user:null
               }
            case "LOG_OUT":
                return {
                     user:null
            }
            case "USER_UPDATE":
                return {
                    user: action.payload
                }
            case "USER_DELETE":
                return {
                    user: null
                }
               default:return state 
        }
}
export default Reducer