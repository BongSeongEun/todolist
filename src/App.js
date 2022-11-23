import Todo from './components/Todo';
import styled from 'styled-components';

const MainWrap = styled.div`
  background: #e9ecef;
  height: 100vh;
`;

function App() {
  return (
    <MainWrap>
      <Todo />
    </MainWrap>
  );
}

export default App;
