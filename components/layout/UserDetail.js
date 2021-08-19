const UserDetail = ({ user, classProp }) => {
  const { name, email } = user;
  if (!user) <div>Who are you?</div>;
  return (
    <article className={classProp}>
      <h2>Account info:</h2>
      <p>
        Hi {name}, the email we have on file for you is {email}!
      </p>
    </article>
  );
};

export default UserDetail;
