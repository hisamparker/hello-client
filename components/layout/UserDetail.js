/* eslint-disable react/prop-types */
const UserDetail = ({ user }) => {
  const { name, email } = user;
  if (!user) <div>Who are you?</div>;
  return (
    <div>
      Hi {name}, the email we have on file for you is {email}!
    </div>
  );
};

export default UserDetail;
