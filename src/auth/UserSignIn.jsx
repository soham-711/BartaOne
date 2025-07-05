import { SignIn } from '@clerk/clerk-react';

export default function UserSignIn() {
  return (
    <div className="min-h-screen bg-[#0A1733] flex items-center justify-center">
      <SignIn
     forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
          },
        }}
      />
    </div>
  );
}
