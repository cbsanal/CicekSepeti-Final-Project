import { dropDown, dropUp } from "../../assets";
import { useState } from "react";

const FormOptions = (props) => {
  const { type, options, setOptionValue, setShowOptions, showOptions } = props;
  const [makeFontBlack, setMakeFontBlack] = useState(false);

  const toggle = () => {
    setShowOptions(!showOptions);
    setMakeFontBlack(true);
  };

  const handleChange = (option, id) => {
    setOptionValue({ title: option, id: id });
    setShowOptions(false);
  };

  return (
    <div>
      <label htmlFor="category">{type.name}</label>
      <div className="selected-option" onClick={toggle}>
        <span className={makeFontBlack ? "black" : null}>{type.title}</span>
        <img src={dropDown} alt="aşağı-ok" />
      </div>
      {showOptions && (
        <div className="options-container">
          <div>
            <span>{type.name} seç</span>
            <img src={dropUp} alt="yukarı-ok" />
          </div>
          <ul className="options-list">
            {options.map((option) => (
              <li
                onClick={() => handleChange(option.title, option.id)}
                key={option.id}
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormOptions;
