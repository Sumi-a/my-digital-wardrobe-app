// // import React, { createContext, useContext, useEffect, useState } from "react";
// // import { auth } from "./firebase"; // Adjust as necessary
// // import { onAuthStateChanged } from "firebase/auth";

// // const UserContext = createContext(null);

// // export const UserProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setLoading(false);
// //       setUser(user);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   return (
// //     <UserContext.Provider value={{ user, loading }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const useUser = () => {
// //   return useContext(UserContext);
// // };
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "./firebase"; // Adjust as necessary
// import { onAuthStateChanged } from "firebase/auth";

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setLoading(false);
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };
