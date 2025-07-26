"use client"

import React, { useState, useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GamepadIcon, Trophy, Target, TrendingUp, ArrowRight } from "lucide-react"
import DoodleJumpGame from "@/components/doodle-jump-game"
import { Navbar } from "@/components/navbar"

export default function GamePage() {
    const account = useActiveAccount()
    const router = useRouter()
    const [gameScore, setGameScore] = useState(0)
    const [claimableTokens, setClaimableTokens] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    useEffect(() => {
        // Redirect to landing if no wallet connected
        if (!account) {
            router.push("/")
        }
    }, [account, router])

    const handleGameOver = (score: number) => {
        setGameScore(score)
        const claimable = Math.floor(score / 10)
        setClaimableTokens(claimable)

        // Update best score
        if (score > bestScore) {
            setBestScore(score)
        }
    }

    const handleClaimTokens = () => {
        router.push(`/claim?tokens=${claimableTokens}&score=${gameScore}`)
    }

    if (!account) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
                    <p className="mb-4">Please connect your wallet to play the game</p>
                    <Button onClick={() => router.push("/")}>
                        Go to Landing Page
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                            <GamepadIcon className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Doodle Jump
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Jump on platforms, avoid falling, and earn SOM coins based on your score!
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Game Canvas - Takes most of the space */}
                    <div className="lg:col-span-3">
                        <Card className="bg-black/40 backdrop-blur-lg border-pink-500/20 h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <GamepadIcon className="w-5 h-5" />
                                    Game Arena
                                </CardTitle>
                                <CardDescription className="text-gray-300">
                                    Use arrow keys or A/D to move, Space to start/restart. Score points to earn tokens!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center min-h-[600px] p-4">
                                <DoodleJumpGame onGameOver={handleGameOver} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Game Stats & Actions */}
                    <div className="space-y-6">
                        {/* Current Game Stats */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">Current Game</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Your latest performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                        <div className="text-2xl font-bold text-blue-400">{gameScore}</div>
                                        <div className="text-sm text-gray-300">Current Score</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                                        <div className="text-2xl font-bold text-green-400">{claimableTokens}</div>
                                        <div className="text-sm text-gray-300">Tokens Earned</div>
                                    </div>
                                </div>

                                {claimableTokens > 0 && (
                                    <Button
                                        onClick={handleClaimTokens}
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                                    >
                                        <Trophy className="w-4 h-4 mr-2" />
                                        Claim {claimableTokens} Tokens
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Best Score */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">Best Performance</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Your highest achievements
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                                    <div className="text-3xl font-bold text-purple-400 mb-1">{bestScore}</div>
                                    <div className="text-sm text-gray-300">Best Score</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Game Tips */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">Game Tips</CardTitle>
                                <CardDescription className="text-gray-300">
                                    How to maximize your score
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="text-white font-medium">Aim for High Platforms</div>
                                        <div className="text-gray-300 text-sm">Higher jumps = more points</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="text-white font-medium">Chain Combos</div>
                                        <div className="text-gray-300 text-sm">Consecutive jumps give bonus points</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Trophy className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="text-white font-medium">Token Rewards</div>
                                        <div className="text-gray-300 text-sm">Earn 1 token per 10 points scored</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">Navigation</CardTitle>
                                <CardDescription className="text-gray-300">
                                    What would you like to do next?
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                >
                                    Back to Landing
                                </Button>
                                <Button
                                    onClick={() => router.push("/claim")}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                >
                                    Go to Claim Page
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 