import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const { loading,user,isAuthenticated} = useSelector((state) => state.user);

    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }
  return (children);
};

// const ProtectedRoute = ({isAdmin,children}) => {
//   const { loading,user,isAuthenticated} = useSelector((state) => state.user);
    
//       if(loading === false && isAuthenticated === false && isAdmin===true && user.role !=="admin") { 
//         return <Navigate to="/login" />; 
//       }

//     return (children);
// };

export default ProtectedRoute;
