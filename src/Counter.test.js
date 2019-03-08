import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Counter from './Counter';

describe('Counter', () => {
  // 렌더링 성공 및 스냅샷 확인
  it('renders correctly', () => {
    const { container } = render(<Counter />);
    expect(container).toMatchSnapshot();
  });

  // 숫자와 두 버튼이 있는지 확인
  it('has number and two buttons', () => {
    const { getByText, container } = render(<Counter />);
    getByText('값: 0');
    const buttons = container.querySelectorAll('button');
    expect(buttons[0].innerHTML).toBe('+1');
    expect(buttons[1].innerHTML).toBe('-1');
  });

  it('increases', () => {
    const { getByText, container } = render(<Counter />);
    const button = getByText('+1'); // +1 버튼을 찾고
    fireEvent.click(button); // 클릭한다
    const number = container.querySelector('h1'); // h1 태그를 찾아서
    expect(number).toHaveTextContent('1'); // 그 안에 1 이라는 문자가 있는지 확인
  });

  it('decreases', () => {
    const { getByText, container } = render(<Counter />);
    const button = getByText('-1'); // +1 버튼을 찾고
    fireEvent.click(button); // 클릭한다
    const number = container.querySelector('h1'); // h1 태그를 찾아서
    expect(number).toHaveTextContent('-1'); // 그 안에 1 이라는 문자가 있는지 확인
  });
});
