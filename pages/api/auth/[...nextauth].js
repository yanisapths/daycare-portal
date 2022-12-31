import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorizationUrl: "https://www.facebook.com/v13.0/dialog/oauth",
    }),
    LineProvider({
      clientId: process.env.LINE_ID,
      clientSecret: process.env.LINE_SECRET,
      scope: "profile openid email",
      openId: true,
      accessTokenUrl: "https://api.line.me/oauth2/v2.1/token",
      authorizationUrl:
        "https://access.line.me/oauth2/v2.1/authorize?response_type=code",
      profileUrl: "https://api.line.me/v2/profile",
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile?.name,
          email: profile?.email,
          image: profile.picture,
        };
      },
    }),
    // ...add more providers here
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
});
