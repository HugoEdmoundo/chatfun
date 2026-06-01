declare module '@clerk/nextjs' {
  const content: any;
  export default content;
  export const ClerkProvider: any;
  export const SignedIn: any;
  export const SignedOut: any;
  export const SignInButton: any;
  export const SignUpButton: any;
  export const UserButton: any;
  export const useUser: any;
  export const useAuth: any;
}

declare module '@clerk/nextjs/server' {
  export const clerkMiddleware: any;
  export const createRouteMatcher: any;
}
