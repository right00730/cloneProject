import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const defaultContext: ILocationContext = {
  isLoading: false,
  getAddr: () => {},
  setAddr: (addr: string) => {},
  addrInfo: undefined,
  coords: [0, 0],
  setIsLoading: undefined,
  setAddrInfo: undefined,
};
interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const LocationContext = createContext<ILocationContext>(defaultContext);
const LocationContextProvider = ({children}: Props) => {
  const [addrInfo, setAddrInfo] = useState<undefined | string>();
  const coords = [0, 0];
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const getAddr = (): void => {
    AsyncStorage.getItem('tokenAddr')
      .then((value) => {
        console.log(value);
        if (value) {
          setAddrInfo(value);
        } else {
          setAddrInfo('');
        }
        setIsLoading(false);
      })
      .catch(() => {
        setAddrInfo('');
        setIsLoading(false);
      });
  };

  const setAddr = (addr: string): void => {
    AsyncStorage.setItem('tokenAddr', addr).then(() => {
      setAddrInfo(addr);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getAddr();
  }, []);
  return (
    <LocationContext.Provider
      value={{
        getAddr,
        setIsLoading,
        setAddr,
        addrInfo,
        isLoading,
        coords,
        setAddrInfo,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
export {LocationContext, LocationContextProvider};
