import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, User } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    try {
      await login(username, password);
      onSuccess();
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wood-light to-wood-brown p-4">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="absolute inset-0 opacity-20"
      />
      
      <Card className="w-full max-w-md relative z-10 bg-white shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-wood-brown rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold warm-gray">Admin Login</CardTitle>
          <p className="text-gray-600">Access your business dashboard</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-wood-brown hover:bg-wood-light text-white"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="text-center text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p className="font-medium">Username: admin</p>
            <p className="font-medium">Password: srilakhmi123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}