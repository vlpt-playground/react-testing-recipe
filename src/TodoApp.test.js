import React from 'react';
import { render, fireEvent, getByTestId } from 'react-testing-library';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  it('renders correctly', () => {
    const { container } = render(<TodoApp />);
    const form = container.querySelector('form');
    expect(form).toBeTruthy(); // form 태그가 있는지 호가인
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2); // 두개가 li 태그가 있는지 확인
  });

  it('inserts new todo', () => {
    const { container, getByText } = render(<TodoApp />);

    // 인풋 수정
    const input = container.querySelector('input');
    fireEvent.change(input, {
      target: { value: '일정 관리 애플리케이션 만들기' }
    });

    // 등록 버튼 클릭
    const button = getByText('등록');
    fireEvent.click(button);

    // 3개의 투두가 있고, 방금 추가한 텍스트가 존재하는지 확인
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(3);
    getByText('일정 관리 애플리케이션 만들기');
  });

  it('toggles first todo', () => {
    // 첫번째 할 일 토글하기
    const { getByText } = render(<TodoApp />);
    const span = getByText('TDD 배우기');
    expect(span.style.textDecoration).toBe('line-through'); // 취소선이 그어져있는지 확인
    fireEvent.click(span); // 클릭
    expect(span.style.textDecoration).toBe('none'); // 취소선이 사라졌는지 확인
  });

  it('removes first todo', () => {
    // 첫번째 할 일 제거하기
    const { getByText, queryByText, container } = render(<TodoApp />);
    const span = getByText('TDD 배우기');
    const button = span.nextElementSibling; // 바로 옆에있는 버튼 선택하기
    fireEvent.click(button); // 삭제 버튼 크릵

    expect(queryByText('TDD 배우기')).toBeFalsy(); // TDD 배우기가 더 이상 존재하지 않음
    expect(container.querySelectorAll('li').length).toBe(1); // 한개의 항목만 보여짐
  });
});
