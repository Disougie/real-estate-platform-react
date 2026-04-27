import { Navigate, useLocation } from 'react-router-dom'
import { getCurrentRole } from './useRole'

export default function RoleGuard({ allowedRoles, children }) {
  const location = useLocation()
  const role = getCurrentRole()

  if (!allowedRoles.includes(role)) {
    const redirectTo = role === 'admin' ? '/admin' : '/lawyer'
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  return children
}

