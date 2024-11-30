import * as React from "react";
import styled from "styled-components";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "radio" | "checkbox";
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  haveColor?: boolean;
}

const StyledLabel = styled.label<{ haveColor?: boolean }>`
  font-size: 15px; /* text-xs */
  font-family: "Mont", sans-serif; /* font-Mont */
  font-weight: 600; /* font-medium */
  user-select: none;
  color: ${(props) =>
    props.haveColor ? "inherit" : "var(--talent-beige-1)]]]"};
`;

const StyledInput = styled.input`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: #f5f5f5; /* Màu nền */
  border: none;
  border-radius: 3px; /* Bo góc cho checkbox */
  appearance: none;
  cursor: pointer;
  outline: none;

  &:checked {
    background-color: #222222; /* Màu nền khi được chọn */
    position: relative;
  }

  &:checked::after {
    content: "";
    position: absolute;
    width: 7px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    // top: 2px;
    left: 4px;
  }

  &:focus {
    outline: 2px solid #007bff; /* Hiệu ứng viền khi focus */
    outline-offset: 2px;
  }
`;

const Label = ({ className, haveColor, ...props }: LabelProps) => {
  return <StyledLabel haveColor={haveColor} className={className} {...props} />;
};

const InputByType = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "radio", onChange, checked, ...props }, ref) => {
    return (
      <StyledInput
        type={type}
        checked={checked}
        onChange={onChange}
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
InputByType.displayName = "InputByType";

export { InputByType, Label };
