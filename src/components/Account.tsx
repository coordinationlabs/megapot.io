"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function Account() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  if (!ready) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authenticated) {
    return <button onClick={login}>Login</button>;
  }

  // Show user info and logout button if authenticated
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-600">
        {wallets.length > 0 && (
          <div>
            <div className="font-medium">
              {wallets[0].address.slice(0, 6)}...{wallets[0].address.slice(-4)}
            </div>
            <div className="text-xs text-gray-500">
              {wallets[0].walletClientType}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
      >
        Logout
      </button>
    </div>
  );
}
