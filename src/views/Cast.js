import shortid from 'shortid';
import defaultImage from '../default_photo.png';
import styles from './views.module.css';

export default function Casts({ actors }) {
  return (
    <div className={styles.main}>
      <ul className={styles.list_noorder}>
        {actors.cast.length ? (
          actors.cast.map(actor => (
            <li key={shortid.generate()}>
              {actor.profile_path ? (
                <img
                  key={shortid.generate()}
                  width="150px"
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.original_name}
                />
              ) : (
                <img
                  key={shortid.generate()}
                  width="150px"
                  src={defaultImage}
                  alt={actor.original_name}
                />
              )}

              <p key={actor.id}>
                {actor.name}
                <br />
                <b>Character:</b> {actor.character}
              </p>
            </li>
          ))
        ) : (
          <p>We don't have any information about cast</p>
        )}
      </ul>
    </div>
  );
}
