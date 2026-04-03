export function dashboardPathForRole(role) {
  switch (role) {
    case 'ADMIN':
      return '/admin';
    case 'COACH':
      return '/coach';
    case 'ARTIST':
      return '/artist';
    case 'STUDENT':
      return '/student';
    default:
      return '/';
  }
}
