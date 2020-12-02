import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const defaultContext: ILocationContext = {
  isLoading: false,
  getAddr: () => {},
  setAddr: (addr: string) => {},
  addrInfo: undefined,
  coords: undefined,
  setIsLoading: undefined,
  setAddrInfo: undefined,
  setCoords: undefined,
};
interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const LocationContext = createContext<ILocationContext>(defaultContext);
const LocationContextProvider = ({children}: Props) => {
  const [addrInfo, setAddrInfo] = useState<undefined | string>();
  const [coords, setCoords] = useState<undefined | any>({
    lon: 0,
    lat: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const getAddr = (): void => {
    console.log('context getAddr run');
    AsyncStorage.getItem('tokenAddr')
      .then((data) => {
        console.log('getiTEM>>>>>>>', data);
        if (data) {
          let tempdata = JSON.parse(data);
          setAddrInfo(tempdata.addr);
          console.log('get addr************', tempdata.addr);
          console.log('get cord************', tempdata.lon);

          setCoords({lon: tempdata.lon, lat: tempdata.lat});
        } else {
          setAddrInfo('');
        }
        setIsLoading(false);
      })
      .catch(() => {
        setAddrInfo('');
        ``;
        setIsLoading(false);
      });
  };

  const setAddr = (addr: string): void => {
    console.log('context setAddr run');

    const setdata = {addr: addr, ...coords};
    console.log('setdata>>>>>>>', setdata);
    AsyncStorage.setItem('tokenAddr', JSON.stringify(setdata)).then(() => {
      setAddrInfo(setdata.addr);
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
        setCoords,
        setAddrInfo,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
export {LocationContext, LocationContextProvider};
