import GoogleLogin from 'react-google-login';
import { useState } from 'react';

// import { getGoogleApiRoute } from './utils/routes';
import './App.css';

const App = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : {}
  );
  const [tokenData, setTokenData] = useState(
    localStorage.getItem('access-token') ? JSON.parse(localStorage.getItem('access-token')) : {}
  );
  const [refreshData, setRefreshData] = useState(
    localStorage.getItem('refresh-token') ? JSON.parse(localStorage.getItem('refresh-token')) : {}
  );

  const handleFailure = (response) => {
    console.log('failure: ', response);
  };

  const handleLogout = async () => {
    const data = await fetch(`${process.env.REACT_APP_API_SERVER}/auths/logout`, {
      method: 'POST',
      xsrfCookieName: 'session',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
        'X-Requested-With': 'XMLHttpRequest',
        authorization: !process.env.IS_COOKIE_HTTPONLY_BASED ? `Bearer ${refreshData?.token}` : undefined,
      },
      body: JSON.stringify({
        deletePreviousTokens: false,
        option: 'logout',
      }),
    })
      .then((res) => res.json())
      .catch((err) => err);

    if (data?.statusCode === undefined) {
      localStorage.removeItem('user-data');
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      setLoginData({});
    }
  };

  const handleLogin = async (googleData) => {
    console.log('googleData: ', googleData);
    const data = await fetch(`${process.env.REACT_APP_API_SERVER}/users/google-login`, {
      method: 'POST',
      xsrfCookieName: 'session',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        ...googleData.profileObj,
        token: googleData.tokenId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('Error on login: ');
        console.log(err);
      });

    if (data !== undefined && data?.statusCode === undefined) {
      setLoginData(data.user);
      setTokenData(data.access);
      setRefreshData(data.refresh);
      localStorage.setItem('user-data', JSON.stringify(data.user));
      localStorage.setItem('access-token', JSON.stringify(data.access));
      localStorage.setItem('refresh-token', JSON.stringify(data?.refresh));
    }
  };

  let content = '';
  const isLoginData = Object.keys(loginData).length !== 0;
  content = !isLoginData ? (
    <>
      <div>
        <form>
          <label>
            username
            <input type="text" placeholder="username" value="abhi" />
          </label>
          <label>
            password
            <input type="text" placeholder="username" value="12345" />
          </label>
          <button type="button" onClick={handleLogin}>
            Login normally
          </button>
        </form>
      </div>
      &nbsp;
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </>
  ) : (
    <>
      <div>
        <h3>You are logged as {loginData?.email}</h3>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>React google login apps</h1>
        <div />
        {content}
      </header>
    </div>
  );
};

export default App;
