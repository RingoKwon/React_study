import React, { useState, useRef } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value, // name[name, nickname] 키를 가진 값을 value로 설정 overwrite
    });

  };
  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };
  return (
    <div>
      <div>
        <input
          name="name"
          placeholder="이름"
          value={name}
          onChange={onChange}
          ref={nameInput}
        />
        <input
          name="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={onChange}

        />
        <button onClick={onReset}>초기화</button>
      </div>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
