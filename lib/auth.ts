import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import Admin from "@/models/Admin";
import Receptionist from "@/models/Receptionist";

// Helper function to find user in specific role collection ONLY when role is specified
async function findUserByEmailAndRole(email: string, preferredRole?: string) {
  console.log("🔍 Searching for user:", { email, preferredRole });

  // If a preferred role is specified, search ONLY that collection
  if (preferredRole) {
    let user = null;

    switch (preferredRole) {
      case "receptionist":
        user = await Receptionist.findOne({ email });
        if (user) {
          console.log("✅ Found in Receptionist collection");
          return { ...user.toObject(), role: "receptionist" };
        }
        console.log("❌ Not found in Receptionist collection");
        return null;

      case "doctor":
        user = await Doctor.findOne({ email });
        if (user) {
          console.log("✅ Found in Doctor collection");
          return { ...user.toObject(), role: "doctor" };
        }
        console.log("❌ Not found in Doctor collection");
        return null;

      case "admin":
        user = await Admin.findOne({ email });
        if (user) {
          console.log("✅ Found in Admin collection");
          return { ...user.toObject(), role: "admin" };
        }
        console.log("❌ Not found in Admin collection");
        return null;

      case "user":
        user = await User.findOne({ email });
        if (user) {
          console.log("✅ Found in User collection");
          return { ...user.toObject(), role: "user" };
        }
        console.log("❌ Not found in User collection");
        return null;
    }
  }

  // Only search all collections if NO role preference is specified (fallback for regular login)
  console.log("🔍 No role specified, searching all collections...");

  // Try User collection first (most common)
  let user = await User.findOne({ email });
  if (user) {
    console.log("✅ Found in User collection (fallback)");
    return { ...user.toObject(), role: "user" };
  }

  // Try Doctor collection
  user = await Doctor.findOne({ email });
  if (user) {
    console.log("✅ Found in Doctor collection (fallback)");
    return { ...user.toObject(), role: "doctor" };
  }

  // Try Admin collection
  user = await Admin.findOne({ email });
  if (user) {
    console.log("✅ Found in Admin collection (fallback)");
    return { ...user.toObject(), role: "admin" };
  }

  // Try Receptionist collection
  user = await Receptionist.findOne({ email });
  if (user) {
    console.log("✅ Found in Receptionist collection (fallback)");
    return { ...user.toObject(), role: "receptionist" };
  }

  console.log("❌ User not found in any collection");
  return null;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        console.log("🔐 Login attempt:", {
          email: credentials?.email,
          role: credentials?.role,
          hasPassword: !!credentials?.password,
        });

        if (!credentials?.email || !credentials.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        await connectDB();

        // Find user with role preference
        const user = await findUserByEmailAndRole(
          credentials.email,
          credentials.role
        );
        console.log(
          "👤 User found:",
          user
            ? {
                email: user.email,
                role: user.role,
                hasPassword: !!user.password,
              }
            : "Not found"
        );

        if (!user) {
          console.log("❌ User not found in specified role collection");
          return null;
        }

        // Additional role validation: ensure the found user's role matches the requested role
        if (credentials.role && user.role !== credentials.role) {
          console.log(
            `❌ Role mismatch: found ${user.role}, expected ${credentials.role}`
          );
          return null;
        }

        // Verify password
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("🔒 Password match:", isMatch);

        if (!isMatch) {
          console.log("❌ Password mismatch");
          return null;
        }

        // For admin users, verify they are active
        if (user.role === "admin" && (user as any).isActive === false)
          return null;

        // For receptionists, verify they are active
        if (user.role === "receptionist" && (user as any).isActive === false)
          return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to login after logout
      if (url.startsWith("/api/auth/signout")) {
        return `${baseUrl}/login`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async signOut() {
      // Clear any cached data on signout
      console.log("User signed out");
    },
  },
};
