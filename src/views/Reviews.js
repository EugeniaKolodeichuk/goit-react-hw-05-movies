import styles from './views.module.css';

export default function Reviews({ reviews }) {
  return (
    <div className={styles.main}>
      <ul className={styles.list_noorder}>
        {reviews.results.length ? (
          reviews.results.map(review => (
            <li key={review.id}>
              <p>
                <b>Author:</b> {review.author}
              </p>

              <p> {review.content}</p>
            </li>
          ))
        ) : (
          <p className={styles.title}>
            <b>We don't have any reviews for this movie</b>
          </p>
        )}
      </ul>
    </div>
  );
}
