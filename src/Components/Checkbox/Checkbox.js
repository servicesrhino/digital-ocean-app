import { useState } from 'react';
import './Checkbox.css';

const Checkbox = ({ label, checked, name, func }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          // checked={isChecked}
          //checked={checked}
          name={name}
          onChange={func}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
