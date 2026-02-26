import * as dto from "@open-source-economy/api-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authBackendAPI } from "src/services";

const AUTH_QUERY_KEY = ["auth"] as const;

export const authHooks = {
  useUserStatusQuery() {
    return useQuery<dto.GetStatusResponse>({
      queryKey: [...AUTH_QUERY_KEY, "status"],
      queryFn: () => authBackendAPI.checkUserStatus(),
      retry: false,
    });
  },

  useLoginMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.LoginResponse, Error, { body: dto.LoginBody; query: dto.LoginQuery }>({
      mutationFn: ({ body, query }) => authBackendAPI.login(body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    });
  },

  useRegisterMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.RegisterResponse, Error, { body: dto.RegisterBody; query: dto.RegisterQuery }>({
      mutationFn: ({ body, query }) => authBackendAPI.register(body, query),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    });
  },

  useLogoutMutation() {
    const queryClient = useQueryClient();
    return useMutation<dto.LogoutResponse, Error>({
      mutationFn: () => authBackendAPI.deleteSession(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      },
    });
  },

  useCompanyUserInviteInfoQuery(query: dto.GetCompanyUserInviteInfoQuery, enabled = true) {
    return useQuery<dto.GetCompanyUserInviteInfoResponse>({
      queryKey: [...AUTH_QUERY_KEY, "companyUserInviteInfo", query],
      queryFn: () => authBackendAPI.getCompanyUserInviteInfo(query),
      enabled,
    });
  },

  useRepositoryUserInviteInfoQuery(query: dto.GetRepositoryUserInviteInfoQuery, enabled = true) {
    return useQuery<dto.GetRepositoryUserInviteInfoResponse>({
      queryKey: [...AUTH_QUERY_KEY, "repositoryUserInviteInfo", query],
      queryFn: () => authBackendAPI.getRepositoryUserInviteInfo(query),
      enabled,
    });
  },

  useCheckEmailMutation() {
    return useMutation<dto.CheckEmailResponse, Error, { params: dto.CheckEmailParams; query: dto.CheckEmailQuery }>({
      mutationFn: ({ params, query }) => authBackendAPI.checkEmail(params, query),
    });
  },

  useForgotPasswordMutation() {
    return useMutation<dto.ForgotPasswordResponse, Error, { body: dto.ForgotPasswordBody }>({
      mutationFn: ({ body }) => authBackendAPI.forgotPassword(body, {}, {}),
    });
  },

  useResetPasswordMutation() {
    return useMutation<
      dto.ResetPasswordResponse,
      Error,
      { body: dto.ResetPasswordBody; query: dto.ResetPasswordQuery }
    >({
      mutationFn: ({ body, query }) => authBackendAPI.resetPassword(body, query, {}),
    });
  },
};
