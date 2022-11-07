import styled from 'styled-components';
import { H3 } from '../Text';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  className?: string;
  label?: string;
}

export function Input(props: InputProps): JSX.Element {
  const { className, label } = props;

  return (
    <Main className={className}>
      {label && <H3>{label}</H3>}
      <input {...props} />
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  input {
    font-size: 20px;
    padding: 5px;
    border: solid 1px black;

    :focus,
    :focus-visible {
      border: solid 1px black !important;
    }
  }
`;
