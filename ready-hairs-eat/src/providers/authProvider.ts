import type { AuthProvider } from '@refinedev/core';
import { axiosInstance } from '@refinedev/simple-rest';
import type { AxiosInstance } from 'axios';
export const TOKEN_KEY = 'refine-auth';
export const REFRESH_TOKEN_KEY = 'refine-refresh-token';
export const USER_KEY = 'refine-user';

// export const authProvider: AuthProvider = {
//   login: async ({ username, email, password }) => {
//     if ((username || email) && password) {
//       localStorage.setItem(TOKEN_KEY, username);
//       return {
//         success: true,
//         redirectTo: "/",
//       };
//     }

//     return {
//       success: false,
//       error: {
//         name: "LoginError",
//         message: "Invalid username or password",
//       },
//     };
//   },
//   logout: async () => {
//     localStorage.removeItem(TOKEN_KEY);
//     return {
//       success: true,
//       redirectTo: "/login",
//     };
//   },
//   check: async () => {
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       return {
//         authenticated: true,
//       };
//     }

//     return {
//       authenticated: false,
//       redirectTo: "/login",
//     };
//   },
//   getPermissions: async () => null,
//   getIdentity: async () => {
//     const token = localStorage.getItem(TOKEN_KEY);
//     if (token) {
//       return {
//         id: 1,
//         name: "John Doe",
//         avatar: "https://i.pravatar.cc/300",
//       };
//     }
//     return null;
//   },
//   onError: async (error) => {
//     console.error(error);
//     return { error };
//   },
// };

export const authProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<Required<AuthProvider>, 'getPermissions'> => ({
  login: async ({ username, password }) => {
    const response = await httpClient.post(`${apiUrl}/login`, {
      username,
      password,
      type: 'string',
    });

    if (
      response?.data?.accessToken &&
      response?.data?.refreshToken &&
      response?.data?.user
    ) {
      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: response?.data?.message,
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  onError: async (error) => {
    console.error(error);
    if (error.response?.status === 401) {
      try {
        const response = await httpClient.get(`${apiUrl}/refresh`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(REFRESH_TOKEN_KEY)}`,
          },
        });

        if (response?.data?.accessToken) {
          // Update tokens only if we get valid response
          localStorage.setItem(TOKEN_KEY, response.data.accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

          // Return success without redirect to retry the failed request
          return { success: true };
        }
      } catch (refreshError) {
        // If refresh token is also invalid, logout user
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return {
          success: false,
          error: {
            message: 'Session expired. Please login again.',
            name: 'Auth Error',
          },
          redirectTo: '/login',
        };
      }
    }
    return { error };
  },
  register: async () => {
    return {
      success: true,
    };
  },
  forgotPassword: async () => {
    return {
      success: true,
    };
  },
  updatePassword: async () => {
    return {
      success: true,
    };
  },
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    if (token && user) {
      const userData = JSON.parse(user);
      return {
        id: userData.sub,
        name: userData ? userData.email : 'unknown',
        avatar: 'https://i.pravatar.cc/300',
      };
    }
    return null;
  },
});
