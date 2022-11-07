import { ReactNode } from 'react';
import styled from 'styled-components';

interface TextProps {
  children?: ReactNode;
  className?: string;
}

export function H1(props: TextProps): JSX.Element {
  const { children, className } = props;
  return <H1Styled className={className}>{children}</H1Styled>;
}
const H1Styled = styled.h1`
  font-family: 'Poppins', sans-serif;
  margin-top: 0;
`;

export function H2(props: TextProps): JSX.Element {
  const { children, className } = props;
  return <H2Styled className={className}>{children}</H2Styled>;
}
const H2Styled = styled.h2`
  font-family: 'Poppins', sans-serif;
`;

export function H3(props: TextProps): JSX.Element {
  const { children, className } = props;
  return <H3Styled className={className}>{children}</H3Styled>;
}
const H3Styled = styled.h3`
  margin: 0;
`;

export function P1(props: TextProps): JSX.Element {
  const { children, className } = props;
  return <P1Styled className={className}>{children}</P1Styled>;
}
const P1Styled = styled.p`
  margin: 0;
`;

export function P2(props: TextProps): JSX.Element {
  const { children, className } = props;
  return <P2Styled className={className}>{children}</P2Styled>;
}
const P2Styled = styled.p`
  margin: 0;
`;

export function ErrorMessage(props: TextProps): JSX.Element {
  const { children, className } = props;
  return (
    <ErrorMessageStyled className={className}>{children}</ErrorMessageStyled>
  );
}
const ErrorMessageStyled = styled(P1)`
  color: brown;
  margin-top: 10px;
`;

export function ValideMessage(props: TextProps): JSX.Element {
  const { children, className } = props;
  return (
    <ValideMessageStyled className={className}>{children}</ValideMessageStyled>
  );
}
const ValideMessageStyled = styled(P1)`
  color: green;
  margin-top: 10px;
`;
