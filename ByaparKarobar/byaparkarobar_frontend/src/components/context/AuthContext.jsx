// import React, { createContext, useState, useEffect } from "react"
// import ApiService from "../../service/ApiService"

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false)
//     const [isMerchant, setIsMerchant] = useState(false)

//     useEffect(() => {
//         checkAuth()
//     }, [])

//     const checkAuth = () => {
//         setIsAuthenticated(ApiService.isAuthenticated())
//         setIsMerchant(ApiService.isMerchant())
//     }

//     const login = () => {
//         checkAuth()
//     }

//     const logout = () => {
//         ApiService.logout()
//         setIsAuthenticated(false)
//         setIsMerchant(false)
//     }

//     return (
//         <AuthContext.Provider value={{
//             isAuthenticated,
//             isMerchant,
//             login,
//             logout
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
