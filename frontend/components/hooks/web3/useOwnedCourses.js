//!useHooks 
import { useHooks } from "@components/providers/web3"


//?useOwnedCourses
export const useOwnedCourses = (...args) => {
    return useHooks(hooks => hooks.useOwnedCourses)(...args)
}