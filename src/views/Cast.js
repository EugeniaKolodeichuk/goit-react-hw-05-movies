import { Fragment } from 'react';
import shortid from 'shortid';
import defaultImage from '../default_photo.png';

export default function Casts({ actors }) {
  /* console.log(actors.cast); */

  return (
    <ul>
      {actors.cast.length ? (
        actors.cast.map(actor => (
          <Fragment key={shortid.generate()}>
            {actor.profile_path ? (
              <img
                key={shortid.generate()}
                width="100px"
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.original_name}
              />
            ) : (
              <img
                key={shortid.generate()}
                width="100px"
                src={defaultImage}
                alt={actor.original_name}
              />
            )}
            <li key={actor.id}>{actor.name}</li>
            <li key={shortid.generate()}>{`Character: ${actor.character}`}</li>
          </Fragment>
        ))
      ) : (
        <p>We don't have any information about cast</p>
      )}
    </ul>
  );
}
