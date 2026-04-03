import { Footer } from '../components/Footer.jsx';

export function PartnerPage() {
  return (
    <div className="marketing-hero min-vh-100">
      <div className="container marketing-main py-5">
        <p className="marketing-section-title">Partner With Us</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Schools, venues &amp; collaborators
        </h1>
        <div className="marketing-prose">
          <p>
            We partner with local businesses, schools, senior centers (&ldquo;Service Our Seniors&rdquo;), cafes, and
            hospitals for breakfast and lunch-hour music. Coaches and artists onboard globally with timezone and currency
            awareness; Stripe Connect will power payouts and platform fees (e.g. configurable splits).
          </p>
          <p className="mb-0">
            For enterprise or sponsorship inquiries, email your team from the site contact once mail is configured. Admin
            training and support are included for site owners.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
