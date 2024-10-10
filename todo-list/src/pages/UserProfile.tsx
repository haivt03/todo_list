function UserProfile() {
    const userId = localStorage.getItem('userId');
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">User Profile</h1>
          {userId ? (
            <p className="text-lg text-gray-700">User ID: {userId}</p>
          ) : (
            <p className="text-lg text-red-500">No user logged in</p>
          )}
        </div>
      </div>
    );
  }
  
  export default UserProfile;
  