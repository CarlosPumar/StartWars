import { useState, useEffect } from 'react';
import characterService from './services/characters';
import CharacterList from './components/CharacterList/CharacterList';
import Menu from './components/Menu/Menu';
import Loading from './components/Loading/Loading';
import Container from 'react-bootstrap/Container';

function App() {
  const [characters, setCharacters] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async (url) => {
    let data;
    setLoading(true);
    if (!url) {
      data = await characterService.getAll();
    } else {
      data = await characterService.getAll(url);
    }
    setCharacters(data.results);
    setLoading(false);
    setNext(data.next);
    setPrevious(data.previous);
  };

  // getData when load page
  useEffect(() => {
    getData();
  }, []);

  // When click on next or previous, page load the data
  const nextDisable = next === null ? true : false;
  const handleNextPage = async () => {
    if (!nextDisable) getData(next);
  };
  const previousDisable = previous === null ? true : false;
  const handlePreviousPage = async () => {
    if (!previousDisable) getData(previous);
  };

  // Sort by name and by height
  const sortByName = () => {
    const sortedCharacters = [...characters];
    sortedCharacters.sort((a, b) => -a.name.localeCompare(b.name));
    setCharacters(sortedCharacters);
  };

  const sortByHeight = () => {
    const sortedCharacters = [...characters];
    sortedCharacters.sort((a, b) => {
      if (a.height === 'unknown') return 1;
      if (b.height === 'unknown') return -1;
      return a.height - b.height;
    });
    setCharacters(sortedCharacters);
  };

  // Menu sort options
  const menuOptions = [
    {
      sort: sortByName,
      name: 'name',
    },
    {
      sort: sortByHeight,
      name: 'height',
    },
  ];

  return (
    <>
      <Menu options={menuOptions} />
      <Container>
        {loading && <Loading />}
        {!loading && (
          <CharacterList
            characters={characters}
            nextPage={handleNextPage}
            previousPage={handlePreviousPage}
            nextDisable={nextDisable}
            previousDisable={previousDisable}
          />
        )}
      </Container>
    </>
  );
}

export default App;
