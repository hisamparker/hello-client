import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import useUser from '../auth/User';

const Footer = () => {
  const user = useUser();
  return (
    <StyledFooter>
      <StyledFooterContent>
        {!user ? (
          <StyledLinkSection>
            <Link href="/log-in">
              <StyledFooterLink>log in</StyledFooterLink>
            </Link>
            <Link href="/sign-up">
              <StyledFooterLink>sign up</StyledFooterLink>
            </Link>
          </StyledLinkSection>
        ) : (
          <StyledLinkSection>
            <Link href="/my-tutorials">
              <StyledFooterLink>My Tutorials</StyledFooterLink>
            </Link>
            <Link href="/account">
              <StyledFooterLink>Account</StyledFooterLink>
            </Link>
          </StyledLinkSection>
        )}
        <StyledSocialSection>
          <StyledSocialLink href="https://www.tiktok.com/@alexdwong/video/6973695927152348421?lang=en&is_copy_url=1&is_from_webapp=v1">
            <Image src="/tik-tok.png" alt="tiktok" height="30" width="30" />
          </StyledSocialLink>
          <StyledSocialLink href="https://learn-the-web.algonquindesign.ca/topics/html-semantics-cheat-sheet/">
            <Image src="/instagram.png" alt="tiktok" height="30" width="30" />
          </StyledSocialLink>
        </StyledSocialSection>
        <h1>Hello Tutorials is for People</h1>
        <sub>Thanks to Martin, Zsoka, Dervis, Leif, Cookie, AJ Roos</sub>
      </StyledFooterContent>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100vw;
  background-color: var(--Primary);
  margin-top: 10rem;
  padding: 3rem;
`;

const StyledFooterContent = styled.section`
  max-width: var(--MaxWidth);
  margin: 0 auto;
  display: grid;
  color: var(--OnMidground);
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'links social'
    'title title'
    'credits....';
  h1 {
    justify-self: center;
    font-size: 3.5em;
    /* em because it's related to footer this avoids media queries*/
    margin-top: 1em;
    grid-area: title;
    /* em because it's related to footer this avoids media queries*/
    line-height: 1.25em;
  }
  sub {
    font-size: 1.5rem;
    grid-area: credits;
  }
  @media (max-width: 675px) {
    grid-template-areas:
      'links links'
      'social social'
      'title title'
      'credits....';
  } ;
`;

const StyledLinkSection = styled.section`
  display: flex;
  justify-content: flex-start;
  grid-area: links;
`;

const StyledSocialSection = styled.section`
  display: flex;
  justify-content: flex-end;
  grid-area: social;
  img {
    filter: invert(1);
  }
  @media (max-width: 675px) {
    justify-self: start;
    padding-top: 1.5rem;
  }
`;

const StyledSocialLink = styled.a`
  margin-left: 2rem;
`;

const StyledFooterLink = styled.a`
  text-transform: uppercase;
  color: var(--OnMidground);
  border-bottom: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-size: 2rem;
  background: none;
  margin-right: 2rem;
  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }
  &:hover::after,
  &:focus::after {
    content: '';
    border-bottom: 2px solid var(--OnMidground);
    position: absolute;
    width: 60%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  @media (max-width: 750px) {
    padding: 0 1rem;
    letter-spacing: 0.1rem;
    text-align: left;
    margin-right: 1rem;
  }
`;

export default Footer;
