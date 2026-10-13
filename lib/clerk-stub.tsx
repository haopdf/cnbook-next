'use client';

// Stub Clerk components/hooks for when Clerk is not configured
// Allows the app to work without valid Clerk keys

import React from 'react';

// Mock User type to match Clerk's shape
interface MockUser {
  id: string;
  fullName: string | null;
  primaryEmailAddress: { emailAddress: string } | null;
}

// Mock auth state - always "loaded" and "not signed in"
export function useUser(): { user: MockUser | null; isLoaded: boolean } {
  return { user: null, isLoaded: true };
}

export function useAuth() {
  return { isSignedIn: false, userId: null };
}

// Stub components that render children
export function SignInButton({ children, mode }: { children: React.ReactNode; mode?: string }) {
  return <>{children}</>;
}

export function SignUpButton({ children, mode }: { children: React.ReactNode; mode?: string }) {
  return <>{children}</>;
}

export function UserButton() {
  return <div className="w-8 h-8 rounded-full bg-duoligo-green/10" />;
}

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignIn() {
  return <div>Sign in not configured</div>;
}

export function SignUp() {
  return <div>Sign up not configured</div>;
}
