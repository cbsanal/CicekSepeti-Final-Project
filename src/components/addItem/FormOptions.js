import { dropDown, dropUp } from "../../assets";
import { useState } from "react";

const FormOptions = (props) => {
  const { type, options, setShowOptions, setOptionValue } = props;
  const { showOptions, value } = props;
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
      <label htmlFor="category">{type}</label>
      <div className="selected-option" onClick={toggle}>
        <span className={makeFontBlack ? "black" : null}>{value.title}</span>
        <img src={dropDown} alt="dropdown" />
      </div>
      {showOptions && (
        <div className="option-list-container">
          <ul>
            <li>
              <span>{type} seç</span>
              <img src={dropUp} alt="dropup" />
            </li>
            <div>
              {options.map((option) => (
                <li
                  onClick={() => handleChange(option.title, option.id)}
                  key={option.id}
                >
                  {option.title}
                </li>
              ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormOptions;
