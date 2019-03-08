import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const sampleTodo = {
    id: 1,
    text: 'TDD 배우기',
    done: false
  };

  it('has text and button', () => {
    const { getByText } = render(<TodoItem todo={sampleTodo} />);
    getByText('TDD 배우기'); // 텍스트가 잘 보여지는지 확인
    getByText('삭제'); // 삭제 버튼이 있는지 확인
  });

  it('gives line-through style to span', () => {
    // span 에 text-decoration: line-through 속성을 주는지 확인
    const { getByText } = render(
      <TodoItem todo={{ ...sampleTodo, done: true }} />
    );
    const span = getByText('TDD 배우기'); // 텍스트가 잘 보여지는지 확인
    expect(span.style.textDecoration).toBe('line-through'); // 스타일 확인
  });

  it('calls onToggle and onRemove', () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();

    const { getByText } = render(
      <TodoItem todo={sampleTodo} onToggle={onToggle} onRemove={onRemove} />
    );
    const span = getByText('TDD 배우기');
    const button = getByText('삭제');

    fireEvent.click(span); // span 클릭
    expect(onToggle).toBeCalledWith(1); // 파라미터 1 (id) 로 호출했는지 확인
    fireEvent.click(button); // button 클릭
    expect(onRemove).toBeCalledWith(1); // 파라미터 1 (id) 로 호출했는지 확인
  });
});
