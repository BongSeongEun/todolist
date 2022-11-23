import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
const GlobalStyle = createGlobalStyle`
  body{
    background: #FFCDCD;
  }
`;
const Wrap = styled.div`
  text-align: center;
  overflow-y: auto;
`;

const Wrap1 = styled.div`
  height: 100vh;
  background: #e9ecef;
`;
const InputBox = styled.input`
  border-radius: 1rem;
  width: 20rem;
  height: 2rem;
  padding-left: 1rem;
`;
const TodoTemplateBox = styled.div`
  width: 32rem;
  height: 43.5rem;
  position: relative;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #343a40;
  font-weight: bolder;
`;
const Day = styled.div`
  margin-top: 0.25rem;
  color: #868e96;
  font-size: 1.5rem;
`;

const CheckBtn = styled.button`
  background-color: transparent;
  border: none;
`;
export default function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('localTasks')) {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]));
      setTask('');
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem('localTasks', JSON.stringify(deleted));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem('localTasks');
  };

  const onClick = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]));
      setTask('');
    }
  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <div className='container row'>
      <GlobalStyle />

      <TodoTemplateBox>
        <Wrap>
          <h1 className='mt-3 text-white'>To-Do App</h1>
          <Title>
            {dateString}
            &nbsp;{dayName}
          </Title>
        </Wrap>
        <Wrap>
          <MainWrap>
            <InputBox
              name='task'
              type='text'
              value={task}
              placeholder='할 일을 적은 후, Enter키를 눌러주세요'
              className='form-control'
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={onKeyEnter}
            />
            {/* <div className='col-4'>
            <button
              className='btn btn-primary form-control material-icons'
              onClick={addTask}
            >
              추가하기
            </button>
          </div> */}
          </MainWrap>
          <MainWrap>
            <div>
              할 일이
              {!tasks.length
                ? ' 없습니다'
                : tasks.length === 1
                ? ' 1개 있습니다'
                : tasks.length > 1
                ? ` ${tasks.length}개 있습니다`
                : null}
            </div>
          </MainWrap>
          <MainWrap>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <div className='col-1'>
                  <CheckBtn
                    className=' mt-2 btn btn-warning material-icons'
                    onClick={() => handleDelete(task)}
                  >
                    ✔️
                  </CheckBtn>
                </div>
                <div className='col-11'>
                  <span
                    className='form-control bg-white btn mt-2'
                    style={{ textAlign: 'left', fontWeight: 'bold' }}
                  >
                    {task.title}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </MainWrap>
          {!tasks.length ? null : (
            <div>
              <button
                className='btn btn-secondary  mt-4 mb-4'
                onClick={() => handleClear()}
              >
                리스트 초기화
              </button>
            </div>
          )}
        </Wrap>
      </TodoTemplateBox>
    </div>
  );
}
