import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {pow} from 'react-native-reanimated';

const defaultContext: IUserContext = {
  isLoading: false,
  userInfo: {email: '', nickName: ''},
  getUserInfo: () => {},
  login: () => {},
  logout: () => {},
  setIsLoading: undefined,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
const UserContext = createContext<IUserContext>(defaultContext);

const UserContextProvider = ({children}: Props) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: undefined,
    nickName: undefined,
    token: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = async (emaild: string, passwordd: string) => {
    console.log(emaild, passwordd);

    const url = 'http://192.168.0.250:8080/api/member/login';
    await axios
      .post(url, {
        email: emaild,
        password: passwordd,
      })
      .then((json) => json.data)
      .then((data) => {
        console.log(data.tokens.accessToken);
        AsyncStorage.setItem(
          'loginToken',
          JSON.stringify({
            token: data.tokens.accessToken,
            email: data.email,
            nickName: data.name,
          }),
        ).then(() => {
          setUserInfo({
            token: data.tokens.accessToken,
            email: data.email,
            nickName: data.name,
          });
          console.log('here context >>>', data.email);
          console.log(data.name);

          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log('fail!!! >>', error);

        setIsLoading(false);
      });
  };
  const getUserInfo = () => {
    AsyncStorage.getItem('loginToken')
      .then((data) => {
        console.log('getUserInfo>>>>>>>>>>', data);
        let Info = data ? JSON.parse(data) : undefined;
        if (data && Info.token) {
          setUserInfo({
            token: Info.token,
            email: Info.email,
            nickName: Info.nickName,
          });
        }
        setIsLoading(false);
      })
      .catch(() => console.log('data none'));
  };
  const logout = () => {
    AsyncStorage.removeItem('loginToken')
      .then(() => setUserInfo({email: '', nickName: '', token: ''}))
      .catch((error) => {
        console.log('logout fail');
        setUserInfo({email: '', nickName: '', token: ''});
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userInfo,
        login,
        logout,
        getUserInfo,
      }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContext, UserContextProvider};
