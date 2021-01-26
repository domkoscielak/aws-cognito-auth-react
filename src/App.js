import AuthenticateUser from './components/auth/authenticateUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="header">Simple AWS Cognito Authentication</h1>
      <AuthenticateUser>
        <main>
          <h2>You've successfully authenticated!</h2>
        </main>
      </AuthenticateUser>
    </div>
  );
}

export default App;
