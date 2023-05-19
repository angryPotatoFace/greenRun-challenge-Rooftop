import { checkAuth, checkRoleAuth } from "../../middlewares/auth"

export const MiddlewaresAdministrator = [ 
    { method: checkAuth, assign: 'auth' },
    { method: checkRoleAuth, assign: 'role'}
]

export const MiddlewaresUser = [ 
    { method: checkAuth, assign: 'auth' },
]