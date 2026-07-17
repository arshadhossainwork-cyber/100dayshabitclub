import { Link, useParams, Navigate } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './AuthorsPage.module.css';
import { getAuthorBySlug } from '../../data/authors.js';

export default function AuthorDetailPage() {
  const { slug } = useParams();
  const author = getAuthorBySlug(slug);

  if (!author) {
    return <Navigate to="/authors" replace />;
  }

  const sameAs = author.social
    ? Object.values(author.social).filter(Boolean)
    : [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['ProfilePage', 'Person'],
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `https://www.100dayshabitclub.xyz/authors/${author.slug}`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  useDocumentMeta({
    title: author.name,
    description: author.bio,
    path: `/authors/${author.slug}`,
    schema,
  });

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/authors" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Authors', path: '/authors' },
            { label: author.name },
          ]}
        />

        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar} aria-hidden="true">
            {author.name.charAt(0)}
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>{author.name}</h1>
            <p className={styles.profileRole}>{author.role}</p>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.prose}>{author.bio}</p>
        </section>

        {author.expertise && author.expertise.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Expertise</h2>
            <div className={styles.expertiseList}>
              {author.expertise.map((tag) => (
                <span key={tag} className={styles.expertiseTag}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {author.areas && author.areas.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Content Areas</h2>
            <div className={styles.areasList}>
              {author.areas.map((area) => (
                <Link
                  key={area.path}
                  to={area.path}
                  className={styles.areaLink}
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
