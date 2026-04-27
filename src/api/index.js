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

const basePath = import.meta?.env?.VITE_API_BASE_URL || 'https://real-estate-platform-gp.onrender.com'

export const apiConfig = new Configuration({
  basePath,
  accessToken: () => localStorage.getItem('token') || undefined,
})

export const apis = {
  admin: new AdminControllerApi(apiConfig, basePath, http),
  users: new AppUserControllerApi(apiConfig, basePath, http),
  blogs: new BlogControllerApi(apiConfig, basePath, http),
  contracts: new InitialContractControllerApi(apiConfig, basePath, http),
  lawyer: new LawyerControllerApi(apiConfig, basePath, http),
  login: new LoginControllerApi(apiConfig, basePath, http),
  notifications: new NotificationControllerApi(apiConfig, basePath, http),
  properties: new PropertyControllerApi(apiConfig, basePath, http),
  recommendations: new RecommendationControllerApi(apiConfig, basePath, http),
  registration: new RegistrationControllerApi(apiConfig, basePath, http),
  resetPassword: new ResetPasswordControllerApi(apiConfig, basePath, http),
  savedProperties: new SevedPropertyControllerApi(apiConfig, basePath, http),
  changeInfo: new ChangeInfoControllerApi(apiConfig, basePath, http),
  tokens: new ConfirmationTokenControllerApi(apiConfig, basePath, http),
  forgotPassword: new ForgotPasswordControllerApi(apiConfig, basePath, http),
  keepAlive: new KeepAliveApi(apiConfig, basePath, http),
}

