import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  it('has input and button', () => {
    const { getByText, getByPlaceholderText } = render(<TodoForm />);
    getByPlaceholderText('할 일을 입력하세요');
    getByText('등록'); // 버튼이 있는지 확인
  });

  it('changes input', () => {
    // 인풋 값이 잘 바뀌는지 확인
    const { getByPlaceholderText } = render(<TodoForm />);
    const input = getByPlaceholderText('할 일을 입력하세요');
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기'
      }
    });
    expect(input.value).toBe('TDD 배우기');
  });

  it('submits form', () => {
    // 등록 기능을 확인
    const onInsert = jest.fn(); // Mock 함수를 만듭니다
    const { getByPlaceholderText, getByText } = render(
      <TodoForm onInsert={onInsert} />
    );
    const button = getByText('등록');
    const input = getByPlaceholderText('할 일을 입력하세요');
    // 인풋에 입력하고
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기'
      }
    });
    // 버튼을 클릭했을 때
    fireEvent.click(button);
    expect(input.value).toBe(''); // 인풋 값이 비워져야함
    expect(onInsert).toBeCalled(); // 함수가 호출 됐어야함
    expect(onInsert).toBeCalledWith('TDD 배우기'); // 함수가 'TDD 배우기' 라는 파라미터로 호출돼썽야함
  });
});
