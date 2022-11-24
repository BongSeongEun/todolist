import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const MainWrap = styled.div`
  justify-content: center;
  text-align: center;
  overflow-y: auto;
`;
const GlobalStyle = createGlobalStyle`
  body{
    background: #FFCDCD;
  }
`;
const InputBox = styled.input`
  border-radius: 1rem;
  width: 20rem;
  height: 2rem;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  background: #ffcdcd;
  border: none;
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
const CheckBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
`;
const TodoList = styled.div`
  display: flex;
  font-weight: bolder;
  font-size: 1rem;
  margin-left: 1rem;
`;
const Delete = styled.button`
  align-items: center;
  width: 7rem;
  margin-bottom: 1rem;
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
        <MainWrap>
          <h1>To-Do App</h1>
          <Title>
            {dateString}
            &nbsp;{dayName}
          </Title>
          <InputBox
            name='task'
            type='text'
            value={task}
            placeholder='할 일을 적은 후, Enter키를 눌러주세요'
            className='form-control'
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={onKeyEnter}
          />
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
          {tasks.map((task) => (
            <TodoList>
              <React.Fragment key={task.id}>
                <CheckBtn onClick={() => handleDelete(task)}>✔️</CheckBtn>
                {task.title}
              </React.Fragment>
            </TodoList>
          ))}
          {!tasks.length ? null : (
            <Delete onClick={() => handleClear()}>리스트 초기화</Delete>
          )}
        </MainWrap>
      </TodoTemplateBox>
    </div>
  );
}
