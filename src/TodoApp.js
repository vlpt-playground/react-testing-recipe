import React, { useState, useCallback, useRef } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'TDD 배우기',
      done: true
    },
    {
      id: 2,
      text: 'react-testing-library 사용하기',
      done: false
    }
  ]);

  // 새로운 항목을 만들 때마다 1씩 올라가는 고유 id 값
  // 렌더링 될 필요가 없으니 ref 로 동적 값 관리
  const id = useRef(3);

  const onInsert = useCallback(
    text => {
      setTodos(
        todos.concat({
          id: id.current++,
          text,
          done: false
        })
      );
    },
    // 현재 상태에 변화를 반영하는 것이므로 useCallback 을 쓴다면 이부분에 todos 가 바뀔 때 마다
    // 콜백 함수를 새로 만들도록 배열 안에 todos 넣기
    [todos]
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [todos] // 여기도 마찬가지로 todos 가 바뀔 때 마다 콜백 함수를 새로 만들도록 명시해줌
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos]
  );

  return (
    <div>
      <TodoForm onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </div>
  );
};

export default TodoApp;
