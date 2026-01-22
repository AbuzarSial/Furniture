'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/contexts/auth-context';
import { ArrowLeft, Lock, UserPlus, ShoppingBag, Mail, Lock as LockIcon, User } from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'guest';

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/checkout';
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup, continueAsGuest, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect if already authenticated (unless continuing as guest)
  useEffect(() => {
    if (!authLoading && isAuthenticated && mode !== 'guest') {
      router.push(returnUrl);
    }
  }, [isAuthenticated, authLoading, returnUrl, router, mode]);

  // Don't render if already authenticated (unless in guest mode)
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && mode !== 'guest') {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(loginData.email, loginData.password);
      router.push(returnUrl);
    } catch {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signupData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!signupData.email.trim()) {
      setError('Email is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await signup(signupData.name, signupData.email);
      router.push(returnUrl);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    continueAsGuest();
    router.push(returnUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Complete Your Checkout
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Login required to complete checkout. Create an account or continue as a guest.
          </p>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Button
            variant={mode === 'login' ? 'default' : 'outline'}
            onClick={() => setMode('login')}
            className="flex-1 rounded-full"
          >
            <LockIcon className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button
            variant={mode === 'signup' ? 'default' : 'outline'}
            onClick={() => setMode('signup')}
            className="flex-1 rounded-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
          <Button
            variant={mode === 'guest' ? 'default' : 'outline'}
            onClick={() => setMode('guest')}
            className="flex-1 rounded-full"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Guest Checkout
          </Button>
        </motion.div>

        {/* Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Login Form */}
          {mode === 'login' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key="login"
            >
              <Card className="rounded-2xl depth-shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <Lock className="h-6 w-6" />
                    <span>Login to Your Account</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your credentials to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="name@example.com"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                          }
                          className="pl-10 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          className="pl-10 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key="signup"
            >
              <Card className="rounded-2xl depth-shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <UserPlus className="h-6 w-6" />
                    <span>Create an Account</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your information to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({ ...signupData, name: e.target.value })
                          }
                          className="pl-10 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({ ...signupData, email: e.target.value })
                          }
                          className="pl-10 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Guest Checkout */}
          {mode === 'guest' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key="guest"
            >
              <Card className="rounded-2xl depth-shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <ShoppingBag className="h-6 w-6" />
                    <span>Continue as Guest</span>
                  </CardTitle>
                  <CardDescription>
                    Complete your purchase without creating an account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Quick Checkout</p>
                        <p className="text-sm text-muted-foreground">
                          No account creation required
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Order Tracking</p>
                        <p className="text-sm text-muted-foreground">
                          Track your order via email confirmation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Create Account Later</p>
                        <p className="text-sm text-muted-foreground">
                          You can always create an account after checkout
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Button
                      onClick={handleContinueAsGuest}
                      className="w-full rounded-full"
                      size="lg"
                    >
                      Continue as Guest
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <Card className="rounded-2xl depth-shadow-lg border-0 bg-gradient-to-br from-primary/5 to-primary/10 h-full">
              <CardContent className="p-8 flex flex-col justify-center h-full space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Why Create an Account?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Secure Order History</p>
                        <p className="text-sm text-muted-foreground">
                          Access all your orders in one place
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Faster Checkout</p>
                        <p className="text-sm text-muted-foreground">
                          Save your shipping and payment details
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Personalized Experience</p>
                        <p className="text-sm text-muted-foreground">
                          Get recommendations based on your preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}
