interface IUserInfo {
  email: string | undefined;
  nickName?: string | undefined;
  addr?: string | undefined;
}
interface ILocation {
  mainAddr: string;
}

interface IUserContext {
  isLoading: boolean | undefined;
  userInfo: IUserInfo | undefined;
  getUserInfo: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}
interface ILocationContext {
  isLoading: boolean | undefined;

  getAddr: () => any;
  setAddr: (addr: string) => void;
  addrInfo: string | undefined;
}

type NavigationParamList = {
  LocationTerm: undefined;
  LocationInput: undefined;
  LocationList: {
    message: string;
  };
  Main: undefined;
  LocationDetail: {
    mainAddr: string;
    roadAddr: string;
  };
};
