import { useReducer, useState } from 'react';

const ACTION_TYPES = { // 액션 여기서 수정
  deposit: 'DIPOSIT', // 입금
  withdraw: 'WITHDRAW', // 출금
}

const 잔고Reducer = (state, action) => { // state: 잔고Reducer가 불리는(호출되는) 시점의 '잔고' state가 담김
  if (action.type === ACTION_TYPES.deposit) {
    return parseInt(state) + parseInt(action.payload);
  }
  if (action.type === ACTION_TYPES.withdraw) {
    return parseInt(state) - parseInt(action.payload);
  }
  else {
    return state; // 기본
  }
}

function Bank() {
  const [number, setNumber] = useState(0);

  const [잔고, dispatch잔고] = useReducer(잔고Reducer, 0)

  const inputChangeHandler = e => {
    e.target.value && setNumber(e.target.value)
  }

  const inputFocusHandler = () => {
    setNumber('');
  };

  const 입금ClickHandler = (e) => {
    if (!number) {
      alert ('금액을 입력해 주세요.');
    } else {
      dispatch잔고({ type: ACTION_TYPES.deposit, payload: number }) // dispatch 호출 시, 위에서 선언한 reducer 호출됨
      setNumber(0);
    }
  }

  const 출금ClickHandler = e => {
    if (!number) {
      alert ('금액을 입력해 주세요.');
    } else {
      dispatch잔고({ type: ACTION_TYPES.withdraw, payload: number })
      setNumber(0);
    }
  }

  return (
    <div className="App">
      <h1>useReducer 은행에 오신 것을 환영합니다!</h1>
      <p>잔고: {잔고}원</p>
      <input type='number' value={number} onChange={inputChangeHandler} onFocus={inputFocusHandler} step='100' />
      <button type='button' onClick={입금ClickHandler}>입금</button>
      <button type='button' onClick={출금ClickHandler}>출금</button>
    </div>
  );
}

export default Bank;
