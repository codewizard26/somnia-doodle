"use client"

import React, { useState, useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectButton } from "thirdweb/react"
import { client } from "@/lib/client"
import { sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, somniaTestnet } from "thirdweb/chains"
import { Wallet, GamepadIcon, Coins, ArrowRight, Trophy, Zap, Users, Star, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

const supportedChains = [sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, somniaTestnet]

export default function LandingPage() {
  const account = useActiveAccount()
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (account) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [account])

  const features = [
    {
      icon: GamepadIcon,
      title: "Play Doodle Jump",
      description: "Classic platformer game with Somnia blockchain rewards"
    },
    {
      icon: Coins,
      title: "Earn SOM Coins",
      description: "Get SOM coins based on your score - the higher you go, the more you earn"
    },
    {
      icon: Trophy,
      title: "Swap on Dex",
      description: "Swap your SOM coins for Real STT tokens on Euclid Protocol"
    },
    {
      icon: Zap,
      title: "Easy Faucet",
      description: "The easiest way to get tokens and test the Somnia ecosystem"
    }
  ]

  const stats = [
    { label: "SOM Coins Earned", value: "45,678", icon: Coins },
    { label: "Games Played", value: "8,901", icon: GamepadIcon },
    { label: "STT Tokens Swapped", value: "12,345", icon: Trophy },
    { label: "Active Players", value: "1,234", icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950">
      <Navbar />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`purple-${i}`}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 15 + 15}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mr-6 relative overflow-hidden">
              <Sparkles className="w-10 h-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-left">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Somnia Gaming
              </h1>
              <p className="text-2xl text-pink-300 font-medium">Hackathon 2025</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Experience the future of gaming with Somnia blockchain rewards. Play Doodle Jump,
            earn SOM coins, and swap them for Real STT tokens on Dexes - the easiest way to get tokens!
          </p>

          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 font-semibold">Somnia Hackathon 2025</span>
          </div>
        </div>

        {/* Connection Section */}
        <div className="max-w-md mx-auto mb-16 animate-fade-in-up">
          <Card className="bg-black/40 backdrop-blur-lg border-pink-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">
                {isConnected ? "Wallet Connected! 🎉" : "Connect Your Wallet"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {isConnected
                  ? "Ready to earn SOM coins!"
                  : "Connect your wallet to start playing and earning SOM coins"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <ConnectButton
                  client={client}
                  chains={supportedChains}
                  connectButton={{
                    label: "Connect Wallet",
                    style: {
                      width: "100%",
                      height: "48px",
                      fontSize: "16px",
                      background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: "600",
                    },
                  }}
                />
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-green-400 font-medium mb-4">
                    {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
                  </p>
                  <Button
                    onClick={() => router.push("/game")}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    <GamepadIcon className="w-4 h-4 mr-2" />
                    Start Playing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Somnia & Euclid Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in-up">
          <Card className="bg-black/40 backdrop-blur-lg border-pink-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-pink-400" />
                Somnia Network
              </CardTitle>
              <CardDescription className="text-gray-300">
                The gaming-focused blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Somnia is a high-performance blockchain designed specifically for gaming applications.
                Earn SOM coins by playing games and participate in the ecosystem.
              </p>
              <div className="flex items-center gap-2 text-pink-400">
                <span className="font-semibold">SOM Coins</span>
                <span className="text-sm">• Native token of Somnia</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <span className="font-semibold">Fast & Scalable</span>
                <span className="text-sm">• Built for gaming</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-lg border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trophy className="w-5 h-5 text-purple-400" />
                Somnia Dexes
              </CardTitle>
              <CardDescription className="text-gray-300">
                Swap SOM for Real STT tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Euclid Protocol is the premier DEX on Somnia. Swap your earned SOM coins for
                Real STT tokens and participate in the broader ecosystem.
              </p>
              <div className="flex items-center gap-2 text-purple-400">
                <span className="font-semibold">Real STT Tokens</span>
                <span className="text-sm">• Utility tokens</span>
              </div>
              <div className="flex items-center gap-2 text-pink-400">
                <span className="font-semibold">Easy Swapping</span>
                <span className="text-sm">• Seamless experience</span>
              </div>
              <a
                href="https://testnet.euclidswap.io/swap"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Convert SOM to STT
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-pink-500/10 hover:border-pink-500/30 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-pink-500/10 text-center">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <Card className="bg-black/40 backdrop-blur-lg border-pink-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">How It Works</CardTitle>
              <CardDescription className="text-gray-300">
                Simple 4-step process to earn and swap tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center animate-fade-in-left">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Connect Wallet</h3>
                  <p className="text-gray-300">Connect your Web3 wallet to get started</p>
                </div>

                <div className="text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Play Game</h3>
                  <p className="text-gray-300">Play Doodle Jump and achieve high scores</p>
                </div>

                <div className="text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Earn SOM</h3>
                  <p className="text-gray-300">Earn SOM coins based on your score</p>
                </div>

                <div className="text-center animate-fade-in-right">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Swap on Dexes</h3>
                  <p className="text-gray-300">Swap SOM for Real STT tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
