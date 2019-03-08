import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import TodoList from './TodoList';

describe('TodoList', () => {
  const sampleTodos = [
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
  ];

  it('renders correctly', () => {
    const { container } = render(<TodoList todos={sampleTodos} />);
    const items = container.querySelectorAll('li'); // li 태그로 조회
    expect(items.length).toBe(2); // 두개의 li 태그가 렌더링됨
  });

  it('calls onToggle and onRemove', () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const { getByText } = render(
      <TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />
    );
    fireEvent.click(getByText('TDD 배우기')); // 텍스트 부분 클릭 (onToggle)
    fireEvent.click(getByText('삭제')); // 삭제 버튼 클릭 (onRemove)

    expect(onToggle).toBeCalled(); // 호출 됐어야 함
    expect(onRemove).toBeCalled(); // 호출 됐어야 함
  });
});
