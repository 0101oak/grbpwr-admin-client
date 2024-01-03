import React, { FC, useState } from 'react';

interface InputFieldProps {
  label: string;
  productInfo: string | number | undefined;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text';
  updateFunction: () => void;
}

export const UpdateInputField: FC<InputFieldProps> = ({
  label,
  productInfo,
  name,
  value,
  onChange,
  type = 'text',
  updateFunction,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleUpdate = async () => {
    await updateFunction();
    setIsEditing(false);
  };
  return (
    <div>
      <label htmlFor={name}>
        {label}: {productInfo}
      </label>
      {isEditing && (
        <>
          <input type={type} name={name} value={value} onChange={onChange} />
          <button onClick={handleUpdate}>UPDATE</button>
        </>
      )}
      {!isEditing && <button onClick={() => setIsEditing(true)}>+</button>}
    </div>
  );
};
