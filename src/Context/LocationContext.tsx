import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const defaultContext: ILocationContext = {
  isLoading: false,
  getAddr: () => {},
  setAddr: (addr: string) => {},
  addrInfo: undefined,
};
interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const LocationContext = createContext<ILocationContext>(defaultContext);
const LocationContextProvider = ({children}: Props) => {
  const [addrInfo, setAddrInfo] = useState<undefined | string>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const getAddr = (): void => {
    AsyncStorage.getItem('token2')
      .then((value) => {
        if (value) {
          setAddrInfo(value);
        }
        setIsLoading(true);
      })
      .catch(() => {
        setAddrInfo(undefined);
        setIsLoading(true);
      });
  };

  const setAddr = (addr: string): void => {
    console.log('register');
    AsyncStorage.setItem('token2', addr).then(() => {
      setAddrInfo(addr);
    });
    setIsLoading(true);
  };

  useEffect(() => {
    getAddr();
  }, []);
  return (
    <LocationContext.Provider
      value={{
        getAddr,
        setAddr,
        addrInfo,
        isLoading,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
export {LocationContext, LocationContextProvider};
