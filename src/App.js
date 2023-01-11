import champions from './champions.json';
import styled from 'styled-components';
import './index.css';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: 'flex';
  alignItems: 'center';
  justifyContent: 'center';
  text-align: center;
`;

const Option = styled.option`
  color: blue;
`;

const InputField = styled.input`
  font-size: 20px;
  padding: 6px 14px;
  border: 2px solid #0C92A4;
  border-radius: 5px;
  background: #1E2328;
  outline:none;
  color: white;
`;

const Guessed = styled.div`
  background: linear-gradient(#16783C,#1D2328);
  transition: all 0.5s;
  text-align: center;
  font-size: 18px;
  color: white;
  padding: 15px;
`;

const Guesses = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 10px;
`;

const ChampionRow = styled.div`
  display: flex;
`;

const ChampionImage = styled.img`
  height: 80px;
  width: 80px;
`;

const StatBox = styled.div`
  display: flex;
  border: 1px solid white;
  height: 80px;
  width: 80px;
  justify-content: center;
  align-items: center;
  background: green;
  margin-right: 2px;
  margin-bottom: 2px;
  color: white;
  font-size 14px;
  font-weight: 600;
`;

const Button = styled.button`
  border: 2px solid #0C92A4;
  border-radius: 5px;
  background: #1E2328;
  color: white;
  font-size: 20px;
  padding: 6px 14px;
  margin-bottom: 10px;
  &:hover{
    cursor: pointer;
  }
`;

const EnterButton = styled.button`
  border: 2px solid #0C92A4;
  border-radius: 5px;
  background: #1E2328;
  color: #CFA33B;
  font-size: 20px;
  padding: 6px 14px;
  margin-bottom: 10px;
  margin-left: 10px;
  &:hover{
    cursor: pointer;
  }
`;


const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
`

function App() {
  const [championImages, setChampionImages] = useState('');
  const [typedChampion, setTypedChampion] = useState('');
  const [tries, setTries] = useState(0);

  const [championToGuess, setChampionToGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [guessed, setGuessed] = useState(false);

  function importAll(r) {
    return r.keys().map(r);
  }

  useEffect(() => {
    setChampionImages(importAll(require.context('./assets/champions', false, /\.(png|jpe?g|svg)$/)));
    newGame();
  }, [])

  function onInputChange(e) {
    setTypedChampion(e.target.value);
  }

  const getRandomChampion = (champions) => {
    let champion = champions[Math.floor(Math.random() * champions.length)];
    return champion;
  }

  const newGame = () => {
    setChampionToGuess(getRandomChampion(champions));
    setGuessed(false);
    setGuesses([]);
    setTries(0);
  }

  const guessChampion = (name) => {
    let typedChampion = champions.find(champion => champion.ime === name);
    if (typedChampion && !guessed) {
      if (!guesses.includes(typedChampion)) {
        guesses.push(typedChampion);
        setTries(tries + 1)
      }
      if (typedChampion === championToGuess) {
        setGuessed(true);
      }
    }
    setTypedChampion('');
  }

  return (
    <StyledApp>
      <Wrapper>
        <div style={{ marginBottom: '10px', opacity: tries > 0 ? 1 : 0, background: '#1E2328', borderRadius: '5px', color: 'white', padding: '6px 12px', fontSize: '20px', transition: 'all 0.5s' }}>
          <p>Number of tries: {tries}</p>
        </div>
        <InputField list='data' onChange={onInputChange} />
        <EnterButton onClick={() => guessChampion(typedChampion)}>Guess</EnterButton>
        <datalist id='data'>
          {champions.map(champion =>
            <Option>{champion.ime}</Option>
          )}
        </datalist>

        <Guesses>
          {
            guesses.map((champion) => {
              return (
                <ChampionRow key={champion.id}>
                  <StatBox className='stat-box'>
                    <ChampionImage src={championImages[champion.id - 1]} alt={champion.name} />
                  </StatBox>
                  <StatBox style={{ background: champion.spol === championToGuess.spol ? '#16783C' : '#F31E19' }}>{champion.spol}</StatBox>
                  <StatBox style={{ background: champion.mana === championToGuess.mana ? '#16783C' : '#F31E19' }}>{champion.mana}</StatBox>
                  <StatBox style={{ background: champion.cena === championToGuess.cena ? '#16783C' : '#F31E19' }}>{champion.cena} BE</StatBox>
                  <StatBox style={{ background: champion.krajRojstva === championToGuess.krajRojstva ? '#16783C' : '#F31E19' }}>{champion.krajRojstva}</StatBox>
                  <StatBox style={{ background: champion.release === championToGuess.release ? '#16783C' : '#F31E19' }}>
                    {champion.release}
                    {champion.release > championToGuess.release ? '⬇️' : champion.release < championToGuess.release ? '⬆️' : ''}
                  </StatBox>
                  <StatBox style={{ background: champion.doseg === championToGuess.doseg ? '#16783C' : '#F31E19' }}>{champion.doseg}</StatBox>
                  <StatBox style={{ background: champion.main === championToGuess.main ? '#16783C' : '#F31E19' }}>{champion.main}</StatBox>
                  <StatBox style={{ background: champion.lane === championToGuess.lane ? '#16783C' : '#F31E19' }}>{champion.lane}</StatBox>
                </ChampionRow>
              )
            })
          }
        </Guesses>
        <Button onClick={newGame}>New game</Button>
        <Guessed style={{ opacity: guessed ? 1 : 0 }}>
          <p>You guessed the champion</p>
          <p style={{ color: '#E5C242' }}>{championToGuess.ime}</p>
          <img src={championImages[championToGuess.id - 1]} alt={championToGuess.ime} />
        </Guessed>
      </Wrapper>
    </StyledApp>
  );
}

export default App;
