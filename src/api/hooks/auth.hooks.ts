import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthBackendAPI } from "src/services";

const AUTH_QUERY_KEY = ["auth"] as const;

const authAPI = getAuthBackendAPI();

export const authHooks = {
  useUserStatusQuery() {
    return useQuery<dto.StatusResponse>({
      queryKey: [...AUTH_QUERY_KEY, "status"],
      queryFn: () => authAPI.checkUserStatus(),
      retry: false,
    });
  },

  useLoginMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.LoginResponse, Error, { body: dto.LoginBody; query: dto.LoginQuery }>({
      mutationFn: ({ body, query }) => authAPI.login(body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    });
  },

  useRegisterMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.RegisterResponse, Error, { body: dto.RegisterBody; query: dto.RegisterQuery }>({
      mutationFn: ({ body, query }) => authAPI.register(body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    });
  },

  useLogoutMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.LogoutResponse, Error>({
      mutationFn: () => authAPI.deleteSession(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    });
  },

  useCompanyUserInviteInfoQuery(query: dto.GetCompanyUserInviteInfoQuery, enabled = true) {
    return useQuery<dto.GetCompanyUserInviteInfoResponse>({
      queryKey: [...AUTH_QUERY_KEY, "companyUserInviteInfo", query],
      queryFn: () => authAPI.getCompanyUserInviteInfo(query),
      enabled,
    });
  },

  useRepositoryUserInviteInfoQuery(query: dto.GetRepositoryUserInviteInfoQuery, enabled = true) {
    return useQuery<dto.GetRepositoryUserInviteInfoResponse>({
      queryKey: [...AUTH_QUERY_KEY, "repositoryUserInviteInfo", query],
      queryFn: () => authAPI.getRepositoryUserInviteInfo(query),
      enabled,
    });
  },

  useCheckEmailMutation() {
    return useMutation<
      dto.CheckEmailResponse,
      Error,
      { params: dto.CheckEmailParams; body: dto.CheckEmailBody; query: dto.CheckEmailQuery }
    >({
      mutationFn: ({ params, body, query }) => authAPI.checkEmail(params, body, query),
    });
  },

  useForgotPasswordMutation() {
    return useMutation<dto.ResponseBody<dto.ForgotPasswordResponse>, Error, { body: dto.ForgotPasswordBody }>({
      mutationFn: ({ body }) => authAPI.forgotPassword(body, {}, {}),
    });
  },

  useResetPasswordMutation() {
    return useMutation<
      dto.ResponseBody<dto.ResetPasswordResponse>,
      Error,
      { body: dto.ResetPasswordBody; query: dto.ResetPasswordQuery }
    >({
      mutationFn: ({ body, query }) => authAPI.resetPassword(body, query, {}),
    });
  },
};
