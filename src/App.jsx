import React from 'react';

// Define an Authentication Higher Order Component (HOC)
const withAuthentication = (WrappedComponent) => {
  const checkIfUserIsAuthenticated = () => {
    return true;
  };

  // Return a new component

  return (props) => {
    const isAuthenticated = checkIfUserIsAuthenticated();
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      console.log('not authenticated');
      return null;
    }
  };
};

const withAutho = (WrappedComponent, roles) => {
  return (props) => {
    const allowedUserRole = ['admin', 'ex', 'sup', 'agent'];
    const hasPermision = allowedUserRole.includes(roles);
    if (hasPermision) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

// Define a component that requires authentication
const ProtectedComponent = () => {
  return <div>Protected content</div>;
};

// Enhance the ProtectedComponent with authentication using the HOC
const AuthProtectedComponent = withAuthentication(ProtectedComponent);
const AuthProtectedComponent2 = withAutho(
  withAuthentication(ProtectedComponent),
  'admin'
);

// Usage example
const App = () => {
  return (
    <div>
      <AuthProtectedComponent />
      <AuthProtectedComponent2 />
    </div>
  );
};

export default App;
