import React, { createContext, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
	const [userDetails, setUserDetails] = useState({
		// Never use ID for comparisons,
		// the value could be 0 though rare
		id: null,
		email: null,
		created_at: null,
		admin: null,
	});

	return (
		<UserContext.Provider value={userDetails}>
			<UserDispatchContext.Provider value={setUserDetails}>
				{children}
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	);
}

export { UserProvider, UserContext, UserDispatchContext };
