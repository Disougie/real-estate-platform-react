export function getCurrentRole() {
  const stored = localStorage.getItem('role')
  if (stored === 'admin' || stored === 'lawyer') return stored
  return 'lawyer'
}

export function setCurrentRole(role) {
  if (role !== 'admin' && role !== 'lawyer') return
  localStorage.setItem('role', role)
}

export function clearCurrentRole() {
  localStorage.removeItem('role')
}

