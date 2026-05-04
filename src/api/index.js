import { Configuration } from '../api-client/configuration'
import {
  AdminControllerApi,
  AppUserControllerApi,
  BlogControllerApi,
  InitialContractControllerApi,
  LawyerControllerApi,
  LoginControllerApi,
  NotificationControllerApi,
  PropertyControllerApi,
  RecommendationControllerApi,
  RegistrationControllerApi,
  ResetPasswordControllerApi,
  SevedPropertyControllerApi,
  ChangeInfoControllerApi,
  ConfirmationTokenControllerApi,
  ForgotPasswordControllerApi,
  KeepAliveApi,
} from '../api-client/api'
import { http } from './http'

const basePath = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080'
// 'https://real-estate-platform-gp.onrender.com'

const secureApiConfig = new Configuration({
  basePath,
  accessToken: () => localStorage.getItem('token') || undefined,
})

const publicApiConfig = new Configuration({
  basePath,
})

export const apis = {
  admin: new AdminControllerApi(secureApiConfig, basePath, http),
  users: new AppUserControllerApi(secureApiConfig, basePath, http),
  blogs: new BlogControllerApi(secureApiConfig, basePath, http),
  contracts: new InitialContractControllerApi(secureApiConfig, basePath, http),
  lawyer: new LawyerControllerApi(secureApiConfig, basePath, http),
  login: new LoginControllerApi(publicApiConfig, basePath, http),
  notifications: new NotificationControllerApi(secureApiConfig, basePath, http),
  properties: new PropertyControllerApi(secureApiConfig, basePath, http),
  recommendations: new RecommendationControllerApi(secureApiConfig, basePath, http),
  registration: new RegistrationControllerApi(publicApiConfig, basePath, http),
  resetPassword: new ResetPasswordControllerApi(publicApiConfig, basePath, http),
  savedProperties: new SevedPropertyControllerApi(secureApiConfig, basePath, http),
  changeInfo: new ChangeInfoControllerApi(secureApiConfig, basePath, http),
  tokens: new ConfirmationTokenControllerApi(publicApiConfig, basePath, http),
  forgotPassword: new ForgotPasswordControllerApi(publicApiConfig, basePath, http),
  keepAlive: new KeepAliveApi(secureApiConfig, basePath, http),
}

