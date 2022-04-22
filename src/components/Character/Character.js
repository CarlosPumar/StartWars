import { useState } from 'react';
import styles from './Character.module.css';

const Character = ({ character }) => {
  const [visible, setVisible] = useState(character.visible);

  const handleVisibility = () => {
    character.visible = !character.visible;
    setVisible(character.visible);
  };

  const exists = (element) => {
    return element !== 'none' && element !== 'n/a' && element !== 'unknown';
  };

  // Displayed when is not visible
  const close = () => (
    <div className={styles.closeDiv}>
      <p>{character.name}</p>
    </div>
  );

  // displayed when is visible
  const open = () => (
    <div className={styles.openDiv}>
      <ul>
        {exists(character.name) && <li>{character.name}</li>}
        <div>
          {exists(character.height) && <li>{character.height} cm</li>}
          {exists(character.hair_color) && <li>{character.hair_color} hair</li>}
          {exists(character.gender) && <li>{character.gender}</li>}
        </div>
      </ul>
    </div>
  );

  return (
    <div onClick={handleVisibility} className={styles.container}>
      {visible && open()}
      {!visible && close()}
      <br />
    </div>
  );
};

export default Character;
