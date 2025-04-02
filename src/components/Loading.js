import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Heart = styled.div`
  width: 50px;
  height: 50px;
  background: url('/heart.png') no-repeat center center;
  background-size: contain;
  margin-bottom: 20px;
  animation: ${bounce} 1s infinite;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 5px;
  color: white;
  font-size: 18px;
`;

const Letter = styled.span`
  animation: ${bounce} 0.5s ease-in-out;
  animation-delay: ${props => props.$delay}s;
  font-family: ${props => props.$isEmoji ? '"Noto Color Emoji", -apple-system' : 'Gabia Gosran, serif'};
`;

function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);  // 3초 후 로딩 화면 사라짐
    }, 2000);

    // 터치 이벤트 핸들러 추가
    const handleTouch = () => {
      setIsVisible(false);
    };

    // 모바일 디바이스인 경우에만 터치 이벤트 리스너 추가
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      document.addEventListener('touchstart', handleTouch, { once: true });
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  if (!isVisible) return null;  // 로딩 화면이 사라지면 null 반환

  return (
    <LoadingWrapper>
      <Heart />
      <TextWrapper>
        <Letter $delay={0 * 0.1}>철</Letter>
        <Letter $delay={1 * 0.1}>수</Letter>
        <p><Letter $delay={2 * 0.1}>&#128156;</Letter></p>
        <Letter $delay={3 * 0.1}>영</Letter>
        <Letter $delay={4 * 0.1}>희</Letter>
        <Letter $delay={5 * 0.1}> </Letter>
        <Letter $delay={6 * 0.1}>결</Letter>
        <Letter $delay={7 * 0.1}>혼</Letter>
        <Letter $delay={8 * 0.1}>합</Letter>
        <Letter $delay={9 * 0.1}>니</Letter>
        <Letter $delay={10 * 0.1}>다</Letter>
      </TextWrapper>
    </LoadingWrapper>
  );
}

export default Loading; 