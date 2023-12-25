import styled, { keyframes } from 'styled-components';

const changeBorderColor = keyframes`
  0% {
    border-color: #e74c3c;
  }
  25% {
    border-color: #f39c12;
  }
  50% {
    border-color: #2ecc71;
  }
  75% {
    border-color: #3498db;
  }
  100% {
    border-color: #e74c3c;
  }
`;

const CardWrapper = styled.div`
  background: white;
  padding: 20px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 4px solid #000;
  border-radius: 30px;
  overflow: hidden;
  transition: border-color 0.5s ease-in-out;
  position: relative;
  animation: ${changeBorderColor} 2s infinite alternate;
`;

export default CardWrapper;
