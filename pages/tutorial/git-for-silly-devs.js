/* eslint-disable no-irregular-whitespace */
import styled from 'styled-components';
import Code from '../../components/elements/Code';

const gitTutorial = () => {
  const code = `let text = "";
  let i = 0;
  while (i < 5) {
    // eslint-disable-next-line no-irregular-whitespace
    text += "<br>The number is " + i;
    i++;
    if (i === 3) {
      break;
    }
  }`;

  const code2 = `var text = "";
var i;
for (i = 0; i < 5; i++) {
  if (i % 3 ===0) {
      continue;
    }
  text += "The number is " + i + "<br>";
}`;
  return (
    <StyledGridContainer>
      <StyledAside>
        <ul>
          <h3>Useful Links</h3>
          <li>stuff and things</li>
          <li>stuff and things</li>
          <li>stuff and things</li>
        </ul>
        <ul>
          <h3>Cute Tutorials</h3>
          <li>stuff and things</li>
          <li>stuff and things</li>
          <li>stuff and things</li>
        </ul>
      </StyledAside>
      <h1>Looping && Iterating</h1>
      <StyledContent className="item3">
        <h2>Learning goals:</h2>
        <ul>
          <li>describe and use loops</li>
          <li>describe and use different types of loops</li>
          <li>break down exactly how a loop iterates</li>
        </ul>
        <blockquote>JavaScript doesn't care — W3schools</blockquote>
        <h2>Loops</h2>
        <StyledP>
          A loop is a sequence of instructions that is repeated until a specific
          condition is met. Use loops to run the same code over and over again,
          each time with a different value. There are lots of different loops,
          but they all do a version of the same thing. They repeat an action for
          a (usually specified) number of times. Multiple loops are great
          because they give us different ways to determine the start and end
          points of the loop. Different situations call for different loops.
        </StyledP>
        <h2>Loopy loop loops 🍃</h2>

        <StyledP>These are the loops I know...</StyledP>

        <h2>For loops!</h2>

        <h3>
          Use a for loop when you know how many times the loop should run.
        </h3>
        <ul>
          <li>Use a for loop when you supply the input</li>
          <li>Use a for loop when the increment value is standard</li>
        </ul>

        <h3>Example</h3>

        <StyledP>
          If we want to check the grade of every student in the class, we loop
          from 1 to the number of students in the class.
        </StyledP>

        <h2>While loops!</h2>
        <h3>
          A "While" Loop is used to repeat a specific block of code an unknown
          number of times, until a condition is met.
        </h3>
        <ul>
          <li>Use a while loop when asking for user input.</li>
          <li>Use a while loop when the increment value is nonstandard.</li>
        </ul>

        <h3>Example</h3>
        <StyledP>
          If we want to ask a user for a number between 1 and 10, we don't know
          how many times the user may enter a larger number, so we keep asking
          "while the number is not between 1 and 10".
        </StyledP>

        <h2>For loop vs while loop</h2>
        <StyledP>
          The while loop has a looser syntax and the for loop has a more rigid
          syntax. A while loop expects some sort of modification to the variable
          in the body, whereas the for loop’s definition should contain
          everything.
        </StyledP>
        <h2>Quick tips</h2>
        <ul>
          <li>Use a for loop to iterate over an array.</li>
          <li>
            Use a for loop when you know the loop should execute *n* times.
          </li>
          <li>Use a while loop for reading a file into a variable.</li>
          <li>Use a while loop when asking for user input.</li>
          <li>Use a while loop when the increment value is nonstandard.</li>
        </ul>
        <h2>Nested loops</h2>
        <StyledP>
          Nested loops are loops inside of loops! You can create a loop inside
          any statement, so it follows that you can create loops inside of
          loops. Avoid nest loops as much as possible, they slow down code
          execution (bad code efficiency). And, they make your code harder to
          read 😞
        </StyledP>
        <h2>Manipulating loops</h2>
        <StyledP>
          You can end a loop early, or skip iterations by using the **break**
          and **continue** statements respectively.
        </StyledP>
        <h2>Break</h2>
        <StyledP>
          The break statement exits a switch statement or a loop (for, for ...
          in, while, do ... while). When the break statement is used in a loop,
          it breaks the loop and continues executing the code after the loop (if
          any).
        </StyledP>
        <h3>Syntax:</h3>
        <Code language="markup" code="break;" />
        <h3>Example:</h3>
        <Code language="js" code={code} />
        <StyledP>The loop will stop when the variable i is equal to 3.</StyledP>
        <h2>Continue</h2>
        <StyledP>
          The continue statement skips an iteration and continues on to the
          next. Use continue combined with a condition.
        </StyledP>
        <h3>Example:</h3>
        <Code language="js" code={code2} />
        <StyledP>
          Loops through a block of code, but skips multiple of 3.
        </StyledP>
      </StyledContent>
    </StyledGridContainer>
  );
};

export default gitTutorial;

const StyledContent = styled.article`
  max-width: 850px;
  color: var(--PrimaryDark);
  background-color: white;
  padding: 2rem 5rem;
  border-radius: 5rem;
  @media (max-width: 414px) {
    border: none;
    padding: 2rem 0;
  }
`;

const StyledGridContainer = styled.section`
  margin: 0 auto;
  max-width: 90vw;
  padding: 0 1rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    '........title'
    'sidebar content';
  aside {
    grid-area: sidebar;
  }
  h1 {
    grid-area: title;
    color: var(--Primary);
    font-size: 7rem;
    margin: 1.5rem 0;
    line-height: 1.5em;
  }
  ${StyledContent} {
    grid-area: content;
  }
  h2,
  h3 {
    margin: 0;
  }
  @media (max-width: 1150px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'title'
      'content'
      'sidebar';
  }
`;

const StyledAside = styled.aside`
  color: var(--Primary);
  h3 {
    margin-top: 1.5rem;
    margin-bottom: 0;
    text-transform: uppercase;
  }
  ul {
    margin-top: 1rem;
    margin-bottom: 3rem;
    padding: 0;
  }
  li {
    list-style-type: none;
    line-height: 3rem;
  }
  @media (max-width: 1150px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 575px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
`;

const StyledP = styled.p`
  max-width: 750px;
  line-height: 1.5em;
  margin-top: 0;
`;
