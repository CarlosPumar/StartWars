import Character from '../Character/Character';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import ButtonPage from '../ButtonPage/ButtonPage';
import styles from './CharacterList.module.css';

const CharacterList = ({
  characters,
  nextPage,
  previousPage,
  nextDisable,
  previousDisable,
}) => (
  <>
    <Container>
      <Row>
        {characters.map((character) => (
          <Col key={character.name} xs="5">
            <Character character={character} />
          </Col>
        ))}
      </Row>
      <div className={styles.buttons}>
        <ButtonPage onclick={previousPage} text="<" disable={previousDisable} />
        <ButtonPage onclick={nextPage} text=">" disable={nextDisable} />
      </div>
    </Container>
  </>
);

export default CharacterList;
