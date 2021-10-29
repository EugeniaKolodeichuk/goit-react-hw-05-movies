import { Fragment } from 'react';
import shortid from 'shortid';

export default function Reviews({ reviews }) {
  /* console.log(reviews); */

  return (
    <ul>
      {reviews.results.length ? (
        reviews.results.map(review => (
          <Fragment key={shortid.generate()}>
            <li key={review.id}>Author: {review.author}</li>
            <li key={shortid.generate()}>{review.content}</li>
          </Fragment>
        ))
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </ul>
  );
}
