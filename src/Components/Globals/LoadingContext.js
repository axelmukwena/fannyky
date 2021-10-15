import React, { createContext, useState } from "react";

const LoadingContext = createContext(undefined);
const LoadingDispatchContext = createContext(undefined);

function LoadingProvider({ children }) {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={loading}>
			<LoadingDispatchContext.Provider value={setLoading}>
				{children}
			</LoadingDispatchContext.Provider>
		</LoadingContext.Provider>
	);
}

export { LoadingProvider, LoadingContext, LoadingDispatchContext };
