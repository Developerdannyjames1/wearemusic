import { Footer } from '../components/Footer.jsx';

const PLACEHOLDER = [
  { title: 'Welcome to the New Age of music education', date: 'Coming soon' },
  { title: 'Booking shorter gigs that pay', date: 'Coming soon' },
  { title: 'Streaming & curriculum in one place', date: 'Coming soon' },
];

export function BlogsPage() {
  return (
    <div className="marketing-hero min-vh-100">
      <div className="container marketing-main py-5">
        <p className="marketing-section-title">Blog</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Stories &amp; SEO
        </h1>
        <p className="marketing-prose mb-4">
          Articles for sales, search, and community updates will live here. Connect your CMS or publish posts from the
          admin tools when ready.
        </p>
        <ul className="list-unstyled">
          {PLACEHOLDER.map((p) => (
            <li key={p.title} className="mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <span className="small text-secondary">{p.date}</span>
              <div className="h5 text-white mb-0 mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                {p.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
