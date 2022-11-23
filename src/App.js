import Todo from './components/Todo';
import styled from 'styled-components';

const MainWrap = styled.div`
  background: #ffe6e6;
  height: 100vh;
  overflow-y: auto;
`;

function App() {
  return (
    <MainWrap>
      <Todo />
    </MainWrap>
  );
}

export default App;
