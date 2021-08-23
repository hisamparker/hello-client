import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import styled from 'styled-components';

const Code = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <article style={{ maxWidth: '80vw' }} className="Code">
      <StyledCodeBlock className="line-numbers">
        <code className={`language-${language}`}>{code}</code>
      </StyledCodeBlock>
    </article>
  );
};

const StyledCodeBlock = styled.pre`
  border-radius: 1rem;
`;
export default Code;
