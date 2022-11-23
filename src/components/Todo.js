import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Wrap = styled.div`
  text-align: center;
  overflow-y: auto;
`;

const Wrap1 = styled.div`
  flex-wrap: wrap;
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

  return (
    <div className='container row'>
      <Wrap>
        <h1 className='mt-3 text-white'>To-Do App</h1>
      </Wrap>
      <Wrap>
        <MainWrap>
          <Wrap1>
            <div className='col-8'>
              <input
                name='task'
                type='text'
                value={task}
                placeholder='할 일을 적어주세요'
                className='form-control'
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={onKeyEnter}
              />
            </div>
          </Wrap1>
          <div className='col-4'>
            <button
              className='btn btn-primary form-control material-icons'
              onClick={addTask}
            >
              추가하기
            </button>
          </div>
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
              <div className='col-11'>
                <span
                  className='form-control bg-white btn mt-2'
                  style={{ textAlign: 'left', fontWeight: 'bold' }}
                >
                  {task.title}
                </span>
              </div>
              <Wrap1>
                <div className='col-1'>
                  <button
                    className=' mt-2 btn btn-warning material-icons'
                    onClick={() => handleDelete(task)}
                  >
                    완료하기
                  </button>
                </div>
              </Wrap1>
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
    </div>
  );
}
