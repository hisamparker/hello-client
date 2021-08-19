import styled, { keyframes } from 'styled-components';

const Loader = () => <StyledLoader />;

// this loader is based on work by https://codepen.io/t_afif
// TODO: add thank you in readme.md
const loading = keyframes`
    0% {background-position: 
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3)}
    16.67% {background-position: 
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3)}
    33.33% {background-position: 
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3),
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3)}
    50% {background-position: 
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3),
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3),
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3)}
    66.67% {background-position: 
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3),
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3)}
    83.33% {background-position: 
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(0*100%/3) calc(0*100%/3), calc(3*100%/3) calc(0*100%/3), calc(0*100%/3) calc(3*100%/3), calc(3*100%/3) calc(3*100%/3)}
    100% {background-position: 
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3),
          calc(1*100%/3) calc(1*100%/3), calc(2*100%/3) calc(1*100%/3), calc(1*100%/3) calc(2*100%/3), calc(2*100%/3) calc(2*100%/3)
`;

const StyledLoader = styled.div`
  width: 64px;
  height: 64px;
  background: radial-gradient(
      farthest-side at bottom right,
      var(--PrimaryDark) 90%,
      #0000
    ),
    radial-gradient(farthest-side at bottom left, var(--PrimaryDark) 90%, #0000),
    radial-gradient(farthest-side at top right, var(--PrimaryDark) 90%, #0000),
    radial-gradient(farthest-side at top left, var(--PrimaryDark) 90%, #0000),
    radial-gradient(
      farthest-side at bottom right,
      var(--PrimaryLight) 90%,
      #0000
    ),
    radial-gradient(
      farthest-side at bottom left,
      var(--PrimaryLight) 90%,
      #0000
    ),
    radial-gradient(farthest-side at top right, var(--PrimaryLight) 90%, #0000),
    radial-gradient(farthest-side at top left, var(--PrimaryLight) 90%, #0000),
    radial-gradient(farthest-side at bottom right, #e3aad6 90%, #0000),
    radial-gradient(farthest-side at bottom left, #e3aad6 90%, #0000),
    radial-gradient(farthest-side at top right, #e3aad6 90%, #0000),
    radial-gradient(farthest-side at top left, #e3aad6 90%, #0000);
  background-size: 25% 25%;
  background-repeat: no-repeat;
  animation: ${loading} 2s infinite;
`;

export default Loader;
