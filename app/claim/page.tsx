"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useActiveAccount, useActiveWallet, useSwitchActiveWalletChain, TransactionButton, useReadContract } from "thirdweb/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Wallet, Network, Copy, ExternalLink, AlertCircle, ArrowLeft, CheckCircle, TrendingUp, Zap, Trophy } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { getContract, toEther } from "thirdweb"
import { claimTo } from "thirdweb/extensions/erc20"
import { client } from "@/lib/client"
import { sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, somniaTestnet } from "thirdweb/chains"

const supportedChains = [sepolia, polygonAmoy, baseSepolia, arbitrumSepolia, somniaTestnet]


const TOKEN_CONTRACT_ADDRESS = "0xBBA810e84d2049aC7604618447b78BE2Ab146330"

function ClaimPageContent() {
    const account = useActiveAccount()
    const wallet = useActiveWallet()
    const switchChain = useSwitchActiveWalletChain()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [copying, setCopying] = useState(false)
    const [claimSuccess, setClaimSuccess] = useState(false)
    const [hasClaimed, setHasClaimed] = useState(false)

    // Get earned tokens from URL params
    const earnedTokens = parseInt(searchParams.get('tokens') || '0')
    const gameScore = parseInt(searchParams.get('score') || '0')

    // Get the contract instance
    const contract = getContract({
        client,
        chain: somniaTestnet,
        address: TOKEN_CONTRACT_ADDRESS,
    })

    // Read contract metadata
    const { data: contractName } = useReadContract({
        contract,
        method: "function name() view returns (string)",
        params: [],
    })

    const { data: contractSymbol } = useReadContract({
        contract,
        method: "function symbol() view returns (string)",
        params: [],
    })

    const { data: totalSupply } = useReadContract({
        contract,
        method: "function totalSupply() view returns (uint256)",
        params: [],
    })

    const { data: userBalance } = useReadContract({
        contract,
        method: "function balanceOf(address) view returns (uint256)",
        params: [account?.address || "0x0000000000000000000000000000000000000000"],
    })

    useEffect(() => {
        // Redirect to landing if no wallet connected
        if (!account) {
            router.push("/")
        }
    }, [account, router])

    const copyAddress = async () => {
        if (account?.address) {
            await navigator.clipboard.writeText(account.address)
            setCopying(true)
            setTimeout(() => setCopying(false), 2000)
        }
    }

    const handleSwitchChain = async (chainId: number) => {
        if (wallet) {
            try {
                await switchChain(supportedChains.find((chain) => chain.id === chainId)!)
            } catch (error) {
                console.error("Failed to switch chain:", error)
            }
        }
    }

    const formattedTotalSupply = useMemo(() => {
        if (totalSupply) {
            return toEther(totalSupply).slice(0, 10)
        }
        return "0"
    }, [totalSupply])

    const formattedUserBalance = useMemo(() => {
        if (userBalance) {
            return toEther(userBalance).slice(0, 10)
        }
        return "0"
    }, [userBalance])

    if (!account) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
                    <p className="mb-4">Please connect your wallet to claim tokens</p>
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
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                            <Coins className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Claim Tokens
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Claim your earned tokens and manage your rewards
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Token Claiming */}
                    <div className="space-y-6">
                        {/* Game Rewards Claim */}
                        {earnedTokens > 0 ? (
                            <Card className="bg-white/10 backdrop-blur-lg border-white/20 border-2 border-green-500/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <Trophy className="w-5 h-5 text-yellow-400" />
                                        Game Rewards
                                    </CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Tokens earned from your latest game
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                            <div className="text-2xl font-bold text-blue-400">{gameScore}</div>
                                            <div className="text-sm text-gray-300">Game Score</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                                            <div className="text-2xl font-bold text-green-400">{earnedTokens}</div>
                                            <div className="text-sm text-gray-300">Tokens Earned</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="earned-tokens" className="text-white">Tokens to Claim</Label>
                                        <Input
                                            id="earned-tokens"
                                            type="number"
                                            value={earnedTokens}
                                            readOnly
                                            className="bg-white/10 border-white/20 text-white font-bold text-center text-lg"
                                        />
                                    </div>

                                    <TransactionButton
                                        transaction={() =>
                                            claimTo({
                                                contract,
                                                to: account.address,
                                                quantity: earnedTokens.toString(),
                                            })
                                        }
                                        onTransactionSent={(result) => {
                                            console.log("Transaction submitted", result.transactionHash)
                                        }}
                                        onTransactionConfirmed={(receipt) => {
                                            console.log("Transaction confirmed", receipt.transactionHash)
                                            setClaimSuccess(true)
                                            setHasClaimed(true)
                                            setTimeout(() => setClaimSuccess(false), 3000)
                                        }}
                                        onError={(error) => {
                                            console.error("Transaction failed", error)
                                            alert("Failed to claim tokens: " + error.message)
                                        }}
                                        disabled={hasClaimed}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            fontSize: "16px",
                                            background: hasClaimed
                                                ? "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
                                                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "white",
                                            fontWeight: "600",
                                            cursor: hasClaimed ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        {hasClaimed ? "Already Claimed" : `Claim ${earnedTokens} ${contractSymbol || "Tokens"}`}
                                    </TransactionButton>

                                    {claimSuccess && (
                                        <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="text-green-400 font-medium">Tokens claimed successfully!</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-white">
                                        <Coins className="w-5 h-5" />
                                        No Tokens to Claim
                                    </CardTitle>
                                    <CardDescription className="text-gray-300">
                                        Play the game to earn tokens first
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-8">
                                    <div className="text-gray-400 mb-4">
                                        <Coins className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No tokens earned yet</p>
                                    </div>
                                    <Button
                                        onClick={() => router.push("/game")}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    >
                                        Play Game to Earn Tokens
                                    </Button>
                                </CardContent>
                            </Card>
                        )}



                        {/* Quick Actions */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">Quick Actions</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Navigate between different sections
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Landing
                                </Button>
                                <Button
                                    onClick={() => router.push("/game")}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                >
                                    Play Game Again
                                </Button>
                                <a
                                    href="https://testnet.euclidswap.io/swap"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    <Button
                                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    >
                                        Swap SOM to STT
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Token Information & Wallet */}
                    <div className="space-y-6">
                        {/* Token Information */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white">Token Information</CardTitle>
                                <CardDescription className="text-gray-300">
                                    Details about the {contractName || "Token"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Token Name:</span>
                                        <span className="font-medium text-white">{contractName || "Loading..."}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Token Symbol:</span>
                                        <span className="font-medium text-white">{contractSymbol || "Loading..."}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Your Balance:</span>
                                        <span className="font-medium text-green-400">
                                            {formattedUserBalance} {contractSymbol}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Total Supply:</span>
                                        <span className="font-medium text-white">
                                            {formattedTotalSupply} {contractSymbol}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Contract Address:</span>
                                        <span className="font-mono text-xs text-blue-400">
                                            {`${TOKEN_CONTRACT_ADDRESS.slice(0, 6)}...${TOKEN_CONTRACT_ADDRESS.slice(-4)}`}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Wallet Information */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Wallet className="w-5 h-5" />
                                    Wallet Information
                                </CardTitle>
                                <CardDescription className="text-gray-300">
                                    Your connected wallet details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-300">Connected Address</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="flex-1 px-3 py-2 bg-white/10 rounded text-sm font-mono text-white">
                                            {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
                                        </code>
                                        <Button variant="outline" size="sm" onClick={copyAddress} disabled={copying} className="border-white/20 text-white hover:bg-white/10">
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {wallet && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-300">Wallet Type</label>
                                        <Badge variant="secondary" className="mt-1 bg-white/10 text-white border-white/20">
                                            {wallet.id}
                                        </Badge>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Network Information */}
                        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Network className="w-5 h-5" />
                                    Current Network
                                </CardTitle>
                                <CardDescription className="text-gray-300">
                                    {wallet?.getChain()?.name || "Unknown Network"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {supportedChains.map((chain) => (
                                        <div
                                            key={chain.id}
                                            className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div>
                                                <div className="font-medium text-white">{chain.name}</div>
                                                <div className="text-sm text-gray-300">Chain ID: {chain.id}</div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleSwitchChain(chain.id)}
                                                className="border-white/20 text-white hover:bg-white/10"
                                            >
                                                Switch
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ClaimPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClaimPageContent />
        </Suspense>
    )
} 