/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-irregular-whitespace */
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import useUser from '../../components/auth/User';
import AddToCart from '../../components/cart/AddToCart';
import Code from '../../components/elements/Code';
import ErrorMessage from '../../components/elements/ErrorMessage';
import Loader from '../../components/elements/Loader';
import { USER_TUTORIALS_QUERY } from '../../lib/api';
import { isAlreadyPurchased } from '../../lib/isAlreadyPurchased';

const gitTutorial = () => {
  const user = useUser();
  const { data: tutorialData, error, loading } = useQuery(USER_TUTORIALS_QUERY);
  // TODO create a component!
  if (loading) return <Loader />;
  if (error) return <ErrorMessage>Error... {error}</ErrorMessage>;
  let matchCartCacheToItem;
  if (user && user.cart) {
    matchCartCacheToItem = (itemId) =>
      // if the array (cart) contains an object with a value that matches the itemId, return true, then pass ismatch to addtccart component and if true, add to cart is disabled for that item
      user.cart.some((item) => item.product.id === itemId);
  }
  const code = `let text = "";
  let i = 0;
  while (i < 5) {
    text += 
    "The number is " + i;
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
  if (!isAlreadyPurchased(user, tutorialData, '610be8cf39197ebea7c61420'))
    return (
      <>
        <Head>
          {/* now the tab will say exactly what's in the title instead of just something random */}
          <title>Hello Tutorials | Git for Silly Devs</title>
        </Head>
        <StyledPreviewContainer>
          <StyledPreviewTitle>Git for Silly Devs</StyledPreviewTitle>
          <StyledPreviewContent className="item3">
            <h2>Learning goals:</h2>
            <StyledUl>
              <li>Describe Git, what it is and why it exists</li>
              <li>Understand the commands git add, git commit, and git push</li>
              <li>Confidently add, commit, and push files to Git</li>
            </StyledUl>
            <StyledBlockQuote>
              JavaScript doesn't care <span>— W3schools</span>
            </StyledBlockQuote>
            <h2>Distributed Version Control System</h2>
            <StyledP>
              A<strong> version control </strong>system is a way to track code
              and manage changes to that code.
            </StyledP>
            <br />
            <StyledP>
              Version control software, like Git, tracks every modification to
              the source code, so if there's a mistake, developers can view, and
              or return to an earlier versions of the code to fix it.
            </StyledP>
            <br />
            <StyledP>
              Git is a <strong>distributed</strong> version control system.
            </StyledP>
            <br />
            <StyledP>
              Distributed because, instead of storing all the source code in one
              place, with Git every developper stores there own working copy of
              the code locally.
            </StyledP>
            <br />
            <StyledP>
              That's why Git is pretty great for working independently together!
            </StyledP>
          </StyledPreviewContent>
          <AddToCart
            isMatch={user && matchCartCacheToItem('610be8cf39197ebea7c61420')}
            id="610be8cf39197ebea7c61420"
          />
        </StyledPreviewContainer>
      </>
    );
  return (
    <>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>Hello Tutorials | Git for Silly Devs</title>
      </Head>
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
        <StyledTitle>Git for Silly Devs</StyledTitle>
        <StyledContent className="item3">
          <h2>Pre Requisits:</h2>
          <StyledUl>
            <li>Terminal</li>
            <li>
              A{' '}
              <a href="https://kinsta.com/blog/best-text-editors/">
                text editor
              </a>{' '}
              (no, not Word)
            </li>
            <li>
              <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">
                Git installed
              </a>
              and a <a href="https://docs.github.com/en/get-started">Github</a>{' '}
              account!
            </li>
          </StyledUl>
          <h2>Learning goals:</h2>
          <StyledUl>
            <li>Describe Git, what it is and why it exists</li>
            <li>Understand the commands git add, git commit, and git push</li>
            <li>Confidently add, commit, and push files to Git</li>
          </StyledUl>
          <StyledBlockQuote>
            JavaScript doesn't care <span>— W3schools</span>
          </StyledBlockQuote>
          <h2>Distributed Version Control System</h2>
          <StyledP>
            A<strong> version control </strong>system is a way to track code and
            manage changes to that code.
          </StyledP>
          <br />
          <StyledP>
            Version control software, like Git, tracks every modification to the
            source code, so if there's a mistake, developers can view, and or
            return to an earlier versions of the code to fix it.
          </StyledP>
          <br />
          <StyledP>
            Git is a <strong>distributed</strong> version control system.
          </StyledP>
          <br />
          <StyledP>
            Distributed because, instead of storing all the source code in one
            place, with Git every developper stores there own working copy of
            the code locally.
          </StyledP>
          <br />
          <StyledP>
            That's why Git is pretty great for working independently together!
          </StyledP>
          <h2>Distributed Version Control</h2>
          <StyledP>
            Before you start interacting with Git, it's nice to have a way to
            visualize how it lives on your machine.
          </StyledP>
          <figure>
            <Image
              src="/git-diagram-1.png"
              alt="distributed version control diagram"
              height="661"
              width="1387"
            />
            <StyledFigCaption>
              The diagram shows 4 'areas' where your code exists in relation to
              Git. These areas are divided between server and dev environment.
            </StyledFigCaption>
          </figure>
          <h2>Where Your Code Lives in Git:</h2>
          <StyledUl>
            <li>SERVER</li>
            <StyledUl>
              <li>Remote Repository</li>
            </StyledUl>
            <li>DEV ENVIRONMENT</li>
            <StyledUl>
              <li>Working Directory</li>
              <li>Staging Area</li>
              <li>Local Repository</li>
            </StyledUl>
          </StyledUl>
          <StyledP>
            We'll reference this diagram throught the tutorial and explain the
            areas as we go.
          </StyledP>
          <h2>Ok, let's do some actual developer stuff!</h2>
          <h3>
            Step 1: Create a <strong>Git repository</strong>
          </h3>
          <StyledP>
            To use Git for a new project on your local machine, you need to
            create a new local repository ('repo', for short).
          </StyledP>
          <br />
          <StyledP>
            To work with git, we need to work in terminal. If you're not comfy
            navigating your terminal, go over this{' '}
            <a href="https://ubuntu.com/tutorials/command-line-for-beginners#1-overview">
              {' '}
              quick terminal guide{' '}
            </a>
            before going any further.
          </StyledP>
          <br />
          <StyledP>
            Cool, ok open up a terminal and create a new project folder:
          </StyledP>
          <Code language="vim" code="$ mkdir myFirstGitRepo;" />
          <StyledP>
            This folder is where we initialize Git, also called the{' '}
            <strong>working directory!</strong>
          </StyledP>
          <figure>
            <Image
              src="/git-diagram-2-working-directory.png"
              alt="distributed version control diagram emphasis on working directory"
              height="393"
              width="1182"
            />
            <StyledFigCaption>
              The folder where we initialize Git is our working directory
            </StyledFigCaption>
          </figure>
          <StyledP>Now, navigate into your new project folder:</StyledP>
          <Code language="vim" code="$ cd myFirstGitRepo;" />
          <br />
          <StyledP>And, create a Git repo!</StyledP>
          <Code language="vim" code="$ git init" />
          <br />
          <StyledP>Ok, but nothing happened ¯_(ツ)_/¯</StyledP>
          <br />
          <StyledP>
            Let's look at allll our files, maybe we'll see something? The ls
            command will list the files in your directory (folder):
          </StyledP>
          <Code language="vim" code="$ ls" />
          <br />
          <StyledP>
            Hella nope. Git files are dot files, basically, the file name starts
            with a dot.
          </StyledP>
          <br />
          <StyledP>
            File and folder names that start with a dot are automatically
            hidden. So, you need to use the command ls -a to see them.
          </StyledP>
          <br />
          <StyledP>
            -a is an option flag that indicates you want to list all files, even
            the hidden ones. Give it a try:
          </StyledP>
          <Code language="vim" code="$ ls -a" />
          <br />
          <StyledP>
            Now, you should see a .git folder listed in your terminal. Git is
            initialized in this folder, the working directory, and is now aware
            of all the files it contains.
          </StyledP>
          <h3>Step 2: Add a new file to the repo</h3>
          <StyledP>
            We're working in terminal, so to add a new file, use the touch
            command:
          </StyledP>
          <Code language="vim" code="$touch git-is-fun.txt" />
          <br />
          <StyledP>
            Git will notice that you created a file, but won't add it to your
            local repo unless you explicitly tell it to! Computers are not great
            at hints ᕕ(⌐■_■)ᕗ
          </StyledP>
          <br />
          <StyledP>
            It's always a good idea to check what's up with Git regularly. The
            git status command shows you the files Git knows exist
          </StyledP>
          <br />
          <StyledP>Let's try it:</StyledP>
          <Code
            language="vim"
            code={`$ git status
            
On branch master

Initial commit

Untracked files:
(use "git add <file>..." to include in what will be committed)

git-is-fun.txt

nothing added to commit but untracked files present (use "git add" to track)

`}
          />
          <StyledP>
            Git noticed you added a file, but can't do anything with it until
            you use the git add command.
          </StyledP>
          <h3>Step 3: Staging with git add</h3>
          <StyledP>
            If you want Git to track a file, you need to add it to the{' '}
            <strong>staging environment</strong>.
          </StyledP>
          <br />
          <StyledP>Let's stage our file:</StyledP>
          <Code language="vim" code="$ git add git-is-fun.txt" />
          <figure>
            <Image
              src="/git-diagram-3-staging-area.png"
              alt="distributed version control diagram emphasis on working directory"
              height="393"
              width="1182"
            />
            <StyledFigCaption>
              Our file is now in the staging area.
            </StyledFigCaption>
          </figure>
          <StyledP>
            The staging step may seem like an annoying extra step, but because
            we often don't want Git to track every file in our project
            directory, explicitly stating which files we want Git to track is
            super useful, especially when we're working on multiple features at
            once.
          </StyledP>
          <StyledBlockQuote>
            <h3>3 Ways to Git Add:</h3>
            <ul>
              <li>
                <strong>$ git add -A : </strong>The -A option is short for all,
                this will stage all files in your repo
              </li>
              <strong>$ git add . : </strong> This command stages all files in
              your <i>current</i> directory, <i>not</i> the subdirectories like
              with -A!
              <li>
                <strong>$ git add [file name] : </strong> This command specifies
                that you only want to add the named file.
              </li>
            </ul>
          </StyledBlockQuote>
          Yay, now Git is tracking our file! But, it's not being saved
          anywhere...
          <h3>Step 4: Committing with git commit</h3>
          <StyledP>
            Now that Git is tracking our file, we can add it to our local Git
            repo. This is where the magic of Git actually happens.
          </StyledP>
          <br />
          <StyledP>
            Commit is similar to save, but a bit more nuanced. A traditional
            save overwrites the previous content. A commit saves a copy of the
            current state of your project to your local repository
          </StyledP>
          <br />
          <StyledP>
            This is particularly cool because if future you totally messes up
            the code and creates a life destroying bug, you can always go back
            to a working copy of your project.
          </StyledP>
          <br />
          <StyledP>
            So, commit often to make roll back easy breazy / less of a
            nightmare.
          </StyledP>
          <br />
          <StyledP>
            The difference between committing and saving is what makes Git a
            version control software.
          </StyledP>
          <br />
          <StyledP>Let's commit!</StyledP>
          <br />
          <StyledP>
            Run the git commit command followed by the -m flag and a comment
            explaining what you're committing:
          </StyledP>
          <Code language="vim" code='$ git commit -m "My first commit"' />
          <br />
          <StyledP>
            Adding a detailed comment will help you remember what you did for
            this commit in case you do need to roll back your code. And, if
            you're working on a team, your comments help everyone understand
            what the commit is about.
          </StyledP>
          <figure>
            <Image
              src="/git-diagram-4-local-repo.png"
              alt="distributed version control diagram emphasis on working directory"
              height="393"
              width="1182"
            />
            <StyledFigCaption>
              Our file is now in the staging area.
            </StyledFigCaption>
          </figure>
          <StyledP>This is the basic flow of </StyledP>
          <br />
          <ul>
            <li>Use a while loop when asking for user input.</li>
            <li>Use a while loop when the increment value is nonstandard.</li>
          </ul>
          <h3>Example:</h3>
          <StyledP>
            If we want to ask a user for a number between 1 and 10, we don't
            know how many times the user may enter a larger number, so we keep
            asking "while the number is not between 1 and 10".
          </StyledP>
          <h2>For loop vs while loop</h2>
          <StyledP>
            The while loop has a looser syntax and the for loop has a more rigid
            syntax. A while loop expects some sort of modification to the
            variable in the body, whereas the for loop’s definition should
            contain everything.
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
            in, while, do ... while). When the break statement is used in a
            loop, it breaks the loop and continues executing the code after the
            loop (if any).
          </StyledP>
          <h3>Syntax:</h3>
          <Code language="markup" code="break;" />
          <h3>Example:</h3>
          <Code language="js" code={code} />
          <StyledP>
            The loop will stop when the variable i is equal to 3.
          </StyledP>
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
    </>
  );
};

export default gitTutorial;

const StyledContent = styled.article`
  max-width: 850px;
  color: var(--PrimaryDark);
  background-color: white;
  margin: 2rem 0;
  padding: 4rem 5rem;
  border-radius: 5rem;
  @media (max-width: 414px) {
    border: none;
    padding: 2rem 0;
  }
`;

const StyledPreviewContent = styled(StyledContent)`
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  overflow-y: scroll;
  margin-top: 3rem;
  border-radius: 5rem 5rem 0 0;
`;

const StyledPreviewContainer = styled.section`
  margin: 0 auto 2rem;
  display: grid;
  button {
    width: 200px;
    justify-self: center;
  }
`;

const StyledGridContainer = styled.section`
  margin: 0 auto 2rem;
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
  ${StyledContent} {
    grid-area: content;
  }
  h2,
  h3 {
    margin: 2rem 0 0;
  }
  @media (max-width: 1150px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'title'
      'content'
      'sidebar';
  }
`;
const StyledPreviewTitle = styled.h1`
  color: var(--Primary);
  font-size: 7rem;
  margin: 1.5rem 0;
  line-height: 1.15em;
  margin: 1.5rem auto 0;
`;

const StyledTitle = styled(StyledPreviewTitle)`
  grid-area: title;
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
  margin: 0;
`;

const StyledBlockQuote = styled.blockquote`
  color: white;
  justify-self: center;
  max-width: 700px;
  background-color: var(--PrimaryLight);
  padding: 2rem 4rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 5px solid var(--Primary);
  span {
    font-size: 1.25rem;
  }
`;

const StyledFigCaption = styled.figcaption`
  font-size: 1.25rem;
  line-height: 1.5em;
`;

const StyledUl = styled.ul`
  margin-top: 0;
`;
