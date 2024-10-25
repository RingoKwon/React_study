import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
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
  };
  return (
    <div>
      <div>
        <input placeholder="이름" value={name} onChange={onChange} />
        <input placeholder="전화번호" value={nickname} onChange={onChange} />
        <button onClick={onReset}>초기화</button>

      </div>
      <div>
        <b>값: </b>
        이름(닉네임)
      </div>
    </div>
  );
}

export default InputSample;
