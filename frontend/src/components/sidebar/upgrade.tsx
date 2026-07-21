/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { Crown, Sparkles } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

const Upgrade = () => {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "2661dbb5-ee8e-4b65-b513-26261666dbc4",
        "610e40b4-752f-42b7-9202-ba28f956e56b",
        "26746c00-dadd-4287-9afc-8e1ecef40b01",
      ],
    });
  };
  return (
     <Button
      variant="outline"
      size="sm"
      className="group relative ml-2 overflow-hidden border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
      onClick={upgrade}
    >
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Upgrade</span>
        <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  )
};

export default Upgrade;
