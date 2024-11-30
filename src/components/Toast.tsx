import React from "react";
import styled from "styled-components";

type ToastProps = {
  type: "success" | "error" | "warning"; // Define the toast types
  message: string;
  onClose: () => void;
};

const SuccessIcon = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
  </svg>
);

const WarningIcon = () => (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
  </svg>
);

const ToastContainer = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 20rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  color: #6b7280;
  background-color: ${({ bgColor }) => bgColor};
  &.dark {
    background-color: #1f2937;
    color: #d1d5db;
  }
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
`;

const ToastMessage = styled.div`
  margin-left: 0.75rem;
  font-size: 0.875rem;
  font-weight: normal;
`;

const CloseButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #111827;
  }

  &.dark {
    color: #d1d5db;

    &:hover {
      color: #ffffff;
    }
  }
`;

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const icon =
    type === "success" ? (
      <SuccessIcon />
    ) : type === "error" ? (
      <ErrorIcon />
    ) : (
      <WarningIcon />
    );

  const bgColor =
    type === "success" ? "#d1fadf" : type === "error" ? "#fce8e8" : "#fbe3a6";

  return (
    <ToastContainer bgColor={bgColor} role="alert">
      <ToastContent>{icon}</ToastContent>
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={onClose} aria-label="Close">
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;
