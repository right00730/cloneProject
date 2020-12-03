interface IUserInfo {
  email: string | undefined;
  nickName?: string | undefined;
  token?: string;
}
interface ILocation {
  mainAddr: string;
}

interface IUserContext {
  isLoading: boolean | undefined;
  userInfo: IUserInfo;
  getUserInfo: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setIsLoading: any;
}
interface ILocationContext {
  isLoading: boolean | undefined;
  getAddr: () => any;
  setAddr: (addr: string) => void;
  addrInfo: string | undefined;
  coords: object | undefined;
  setCoords: any;

  setIsLoading: any;
  setAddrInfo: any;
}

type NavigationParamList = {
  LocationTerm: undefined;
  LocationInput: undefined;
  LocationList: {
    message: string;
  };
  Main: undefined;
  Login: undefined;
  JoinTerm: undefined;
  JoinConfirm: undefined;
  JoinDataInput: {phoneNum: string};
  LinkTopandStack: undefined;
  StoreList: {kind: string};
  LocationDetail: {
    lat: number;
    lon: number;
  };
};
