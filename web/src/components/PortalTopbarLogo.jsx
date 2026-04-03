import logoUrl from '@home/icon.svg?url';

/** We Are Music mark for portal top bars (Artist, Coach, Student, Admin). */
export function PortalTopbarLogo() {
  return (
    <img
      src={logoUrl}
      alt="We Are Music"
      className="ap-topbar-logo"
      width={80}
      height={57}
    />
  );
}
