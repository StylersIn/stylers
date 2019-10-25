import * as userActions from './UserActions';
import * as loginActions from './LoginActions';
import * as registerActions from './RegisterActions';
import * as serviceActions from './ServiceActions';
import * as stylerActions from './StylerActions';

export const doLogin = loginActions.doLogin;
export const doRegister = registerActions.doRegister;
export const getCurrentUser = userActions.loggedInUser;
export const fetchUsers = userActions.fetchUsers;
export const logout = userActions.logout;
export const InitializeApp = userActions.InitializeApp;
export const addService = serviceActions.addService;
export const listService = serviceActions.listService;
export const addStyler = stylerActions.addStyler;
export const listStylers = stylerActions.listStylers;
export const getServiceStylers = stylerActions.getServiceStylers;