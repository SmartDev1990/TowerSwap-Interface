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

export const CardWrapper = styled.div`
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

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 10px;
`

export const CapsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px; /* Add padding for better spacing */
`

export const CountdownTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
  box-shadow: 10px;
`

export const LaunchpadLink = styled.div`
  display: block;
  text-decoration: none;
  color: inherit;
  margin-top: 20px;
  border-radius: 20px;
`

export const View = styled.div`
  display: block;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 20px;
`

const snakeProgressAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`

export const SnakeProgressDiv = styled.div`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #2196f3, transparent);
    animation: ${snakeProgressAnimation} 2s linear infinite;
  }
`
