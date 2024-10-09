
function UserProfile() {
  const userId = localStorage.getItem('userId');

  return (
    <div >
      <h1 >User Profile</h1>
      {userId ? <p>User ID: {userId}</p> : <p>No user logged in</p>}
    </div>
  );
};

export default UserProfile;
