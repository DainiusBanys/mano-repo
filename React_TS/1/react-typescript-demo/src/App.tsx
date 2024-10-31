import axios from 'axios';
import { FC, useEffect, useState } from 'react';

interface AppProps {
  title: string;
}

interface Users {
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  email: string;
}

const App: FC<AppProps> = ({ title }) => {
  const [users, setUsers] = useState<Users[]>([]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          'https://randomuser.me/api/?results=10'
        );
        console.log(data);
        setUsers(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {users.map(({ login, name, email }) => {
          return (
            <li key={login.uuid}>
              <div>
                Name: {name.first} {name.last}
              </div>
              <div>Email: {email}</div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;