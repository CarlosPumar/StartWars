import { useState, useEffect } from 'react';
import characterService from './services/characters';
import CharacterList from './components/CharacterList/CharacterList';
import Menu from './components/Menu/Menu';
import Loading from './components/Loading/Loading';
import Container from 'react-bootstrap/Container';
import { NUMBER_ELEMENTS_ON_PAGE } from './constants/utils';

function App() {
  const [characters, setCharacters] = useState([]);
  const [shownCharacters, setShownCharacters] = useState([]);
  const [firstElementPage, setFirstElementPage] = useState(0);
  const [lastElementPage, setLastElementPage] = useState(
    NUMBER_ELEMENTS_ON_PAGE
  );
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    let newCharacters;
    setLoading(true);
    newCharacters = await characterService.getAll();
    setCharacters(newCharacters);
    setLoading(false);
    const newShownCharacters = newCharacters.slice(
      firstElementPage,
      lastElementPage
    );
    setShownCharacters(newShownCharacters);
  };

  // getData when load page
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  const setNewShownCharacters = (
    newFirstElementPage = 0,
    newLastElementPage = NUMBER_ELEMENTS_ON_PAGE
  ) => {
    const newShownCharacters = characters.slice(
      newFirstElementPage,
      newLastElementPage
    );

    setShownCharacters(newShownCharacters);
    setFirstElementPage(newFirstElementPage);
    setLastElementPage(newLastElementPage);
  };

  // When click on next or previous, page load the data
  const nextDisable = lastElementPage > characters.length ? true : false;
  const handleNextPage = async () => {
    if (!nextDisable) {
      const newFirstElementPage = firstElementPage + NUMBER_ELEMENTS_ON_PAGE;
      const newLastElementPage = lastElementPage + NUMBER_ELEMENTS_ON_PAGE;

      setNewShownCharacters(newFirstElementPage, newLastElementPage);
    }
  };
  const previousDisable = firstElementPage === 0 ? true : false;
  const handlePreviousPage = async () => {
    if (!previousDisable) {
      const newFirstElementPage = firstElementPage - NUMBER_ELEMENTS_ON_PAGE;
      const newLastElementPage = lastElementPage - NUMBER_ELEMENTS_ON_PAGE;

      setNewShownCharacters(newFirstElementPage, newLastElementPage);
    }
  };

  // Sort by name and by height
  const sortByName = () => {
    const sortedCharacters = [...characters];
    sortedCharacters.sort((a, b) => -a.name.localeCompare(b.name));

    let newShownCharacters = sortedCharacters.slice(0, NUMBER_ELEMENTS_ON_PAGE);

    setCharacters(sortedCharacters);
    setShownCharacters(newShownCharacters);
    setFirstElementPage(0);
    setLastElementPage(NUMBER_ELEMENTS_ON_PAGE);
  };

  const sortByHeight = () => {
    const sortedCharacters = [...characters];
    sortedCharacters.sort((a, b) => {
      if (a.height === 'unknown') return 1;
      if (b.height === 'unknown') return -1;
      return a.height - b.height;
    });
    setCharacters(sortedCharacters);

    const newShownCharacters = sortedCharacters.slice(
      0,
      NUMBER_ELEMENTS_ON_PAGE
    );

    setCharacters(sortedCharacters);
    setShownCharacters(newShownCharacters);
    setFirstElementPage(0);
    setLastElementPage(NUMBER_ELEMENTS_ON_PAGE);
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
            characters={shownCharacters}
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
