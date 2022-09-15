import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function AdminPage({ user }) {
    console.log(user)
    return <div>Hello {user.name}</div>;
  });