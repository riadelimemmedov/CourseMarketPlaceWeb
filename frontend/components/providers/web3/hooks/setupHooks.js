//!Hooks methods
import { handler as createAccountHook } from "./useAccount";
import {handler as createNetworkHook } from "./useNetwork";
import {handler as useOwnedCourses} from "./useOwnedCourses"


//?setupHooks
export const setupHooks = (...deps) => {
    return{
        useAccount:createAccountHook(...deps),
        useNetwork:createNetworkHook(...deps),
        useOwnedCourses:useOwnedCourses(...deps)
    }
} 