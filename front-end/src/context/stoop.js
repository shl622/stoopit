import { createContext } from 'react'

const stoopContext = createContext({
	stoops: [],
	setStoops: () => null
})
export const StoopProvider = stoopContext.Provider
export default stoopContext
