import Button from 'react-bootstrap/Button';

const ButtonPage = ({ text, onclick, disable }) => {
  const color = disable ? 'dark' : 'secondary';

  return (
    <>
      <Button onClick={onclick} variant={color}>
        {text}
      </Button>
    </>
  );
};

export default ButtonPage;
