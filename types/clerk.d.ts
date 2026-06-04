declare module '@clerk/nextjs' {
  export function useUser(): {
    user: {
      id: string;
      fullName: string | null;
      firstName: string | null;
      lastName: string | null;
      primaryEmailAddress?: { emailAddress: string } | null;
      emailAddresses: { emailAddress: string }[];
      imageUrl: string;
      username: string | null;
    } | null | undefined;
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
  };

  export function useClerk(): {
    signOut: (opts?: { redirectUrl?: string }) => Promise<void>;
  };

  export function useAuth(): {
    userId: string | null | undefined;
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: "convex" | undefined; skipCache?: boolean | undefined; }) => Promise<string | null>;
    orgId: string | null | undefined;
    orgRole: string | null | undefined;
    orgSlug: string | null | undefined;
  };

  export const SignInButton: React.FC<{
    mode?: 'modal' | 'redirect';
    forceRedirectUrl?: string;
    signUpForceRedirectUrl?: string;
    children?: React.ReactNode;
  }>;

  export const SignUpButton: React.FC<{
    mode?: 'modal' | 'redirect';
    forceRedirectUrl?: string;
    signUpForceRedirectUrl?: string;
    children?: React.ReactNode;
  }>;

  export const UserButton: React.FC<{
    afterSignOutUrl?: string;
  }>;

  export const SignedOut: React.FC<{ children?: React.ReactNode }>;
  export const SignedIn: React.FC<{ children?: React.ReactNode }>;
  export const SignOutButton: React.FC<{
    children?: React.ReactNode;
    signOutOptions?: { redirectUrl?: string };
  }>;

  export const OrganizationSwitcher: React.FC<{
    afterCreateOrganizationUrl?: string;
    afterLeaveOrganizationUrl?: string;
    afterSwitchOrganizationUrl?: string;
    appearance?: Record<string, unknown>;
  }>;
  export const OrganizationProfile: React.FC<{
    afterSwitchOrganizationUrl?: string;
    appearance?: Record<string, unknown>;
  }>;

  export function ClerkProvider(props: {
    children: React.ReactNode;
    signInFallbackRedirectUrl?: string;
    signUpFallbackRedirectUrl?: string;
  }): JSX.Element;
}

declare module '@clerk/nextjs/server' {
  export function createRouteMatcher(routes: string[]): (req: Request) => boolean;
  export function clerkMiddleware(handler: (auth: { protect: () => Promise<void> }, req: Request) => Promise<void>): (req: Request) => Response;
}
