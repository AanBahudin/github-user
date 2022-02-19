import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {

  const { isAuthenticated, logout, loginWithRedirect,user, isLoading } = useAuth0()

  return (
    <Wrapper>
      <img src={ user && user.picture} />
      <h4>Hello, <strong> {user && user.name.toUpperCase()} </strong> </h4>
      <button onClick={ isAuthenticated ? (() => logout({returnTo: window.location.origin})) : loginWithRedirect}>{isAuthenticated ? 'logout' : 'login'}</button>
    </Wrapper>
  )
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
