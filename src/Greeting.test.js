import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Greeting from './Greeting';

describe('Greeting', () => {
  // 렌더링 성공 및 초기 스냅샷 확인
  it('renders correctly', () => {
    const { container } = render(<Greeting />);
    expect(container).toMatchSnapshot();
  });

  it('handles change event', () => {
    const { getByPlaceholderText, getByText } = render(<Greeting />);
    // placeholder 값으로 인풋을 찾습니다.
    const input = getByPlaceholderText('이름을 입력하세요');
    // change 이벤트를 발생 시킬땐 이벤트 객체를 임의로 만들어주어야합니다.
    fireEvent.change(input, {
      target: {
        value: 'Bob'
      }
    });
    // input 값이 제대로 바뀐것을 확인합니다.
    expect(input.value).toBe('Bob');

    const heading = getByText(/^안녕하세요/); // h1 을 정규식으로 찾습니다
    expect(heading).toHaveTextContent('Bob'); // 그 안에 Bob 이라는 텍스트가 있는지 확인합니다
  });
});
