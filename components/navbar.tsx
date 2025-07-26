"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "thirdweb/react"
import { client } from "@/lib/client"
import { sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, somniaTestnet } from "thirdweb/chains"
import { Wallet, GamepadIcon, Coins, Moon, Sun, Menu, X, Sparkles, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const supportedChains = [somniaTestnet]

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-pink-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <Sparkles className="w-6 h-6 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                    Somnia Gaming
                                </span>
                                <span className="text-xs text-pink-400 font-medium">Hackathon 2025</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Button
                            variant="ghost"
                            className="relative px-4 py-2 text-pink-300 hover:text-white hover:bg-pink-500/10 transition-all duration-200"
                            onClick={() => router.push("/")}
                        >
                            <Zap className="w-4 h-4 mr-2" />
                            Home
                        </Button>
                        <Button
                            variant="ghost"
                            className="relative px-4 py-2 text-pink-300 hover:text-white hover:bg-pink-500/10 transition-all duration-200"
                            onClick={() => router.push("/game")}
                        >
                            <GamepadIcon className="w-4 h-4 mr-2" />
                            Play Game
                        </Button>
                        <Button
                            variant="ghost"
                            className="relative px-4 py-2 text-pink-300 hover:text-white hover:bg-pink-500/10 transition-all duration-200"
                            onClick={() => router.push("/claim")}
                        >
                            <Coins className="w-4 h-4 mr-2" />
                            Claim Tokens
                        </Button>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="w-9 h-9 p-0 text-pink-300 hover:text-white hover:bg-pink-500/10"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Wallet Connect */}
                        <ConnectButton
                            client={client}
                            chains={supportedChains}
                            connectButton={{
                                label: "Connect",
                                style: {
                                    height: "36px",
                                    fontSize: "14px",
                                    padding: "0 16px",
                                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "white",
                                    fontWeight: "600",
                                },
                            }}
                            switchButton={{
                                label: "Switch",
                                style: {
                                    height: "36px",
                                    fontSize: "14px",
                                    padding: "0 16px",
                                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "white",
                                    fontWeight: "600",
                                },
                            }}
                        />

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden w-9 h-9 p-0 text-pink-300 hover:text-white hover:bg-pink-500/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Menu className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <Card className="md:hidden mt-4 p-4 border-pink-500/20 bg-black/95 backdrop-blur">
                        <div className="space-y-2">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-pink-300 hover:text-white hover:bg-pink-500/10"
                                onClick={() => {
                                    router.push("/")
                                    setIsMobileMenuOpen(false)
                                }}
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                Home
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-pink-300 hover:text-white hover:bg-pink-500/10"
                                onClick={() => {
                                    router.push("/game")
                                    setIsMobileMenuOpen(false)
                                }}
                            >
                                <GamepadIcon className="w-4 h-4 mr-2" />
                                Play Game
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-pink-300 hover:text-white hover:bg-pink-500/10"
                                onClick={() => {
                                    router.push("/claim")
                                    setIsMobileMenuOpen(false)
                                }}
                            >
                                <Coins className="w-4 h-4 mr-2" />
                                Claim Tokens
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </nav>
    )
} 