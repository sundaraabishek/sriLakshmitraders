import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

export function useAuth(): AuthState {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Get stored token
  const getToken = () => localStorage.getItem('auth_token');
  const setToken = (token: string) => localStorage.setItem('auth_token', token);
  const removeToken = () => localStorage.removeItem('auth_token');

  // Check if user is authenticated
  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const token = getToken();
      if (!token) throw new Error('No token');
      
      const response = await fetch('/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        removeToken();
        throw new Error('Authentication failed');
      }
      
      return response.json();
    },
    enabled: !!getToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/login', { username, password });
      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.setQueryData(['auth', 'user'], data.user);
      setError(null);
    },
    onError: (error: any) => {
      setError(error.message || 'Login failed');
      removeToken();
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = getToken();
      if (token) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    },
    onSuccess: () => {
      removeToken();
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.removeQueries({ queryKey: ['auth'] });
      setError(null);
    },
  });

  // Update API request client to include auth token
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Set default authorization header for all requests
      const originalFetch = window.fetch;
      window.fetch = function(input, init = {}) {
        const headers = new Headers(init.headers);
        if (!headers.has('Authorization')) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return originalFetch(input, { ...init, headers });
      };
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return {
    user: user || null,
    isLoading: isLoading || loginMutation.isPending,
    isAuthenticated: !!user && !isError,
    login,
    logout,
    error: error || (isError ? 'Authentication failed' : null),
  };
}