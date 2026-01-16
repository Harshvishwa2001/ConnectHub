import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SearchInput from './SearchInput'
import NavItem from './NavItem'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo + Search */}
                    <div className="flex items-center gap-4 sm:gap-10">
                        <Image src="/Logo.png" width={180} height={80} alt="Logo" />
                        <div className="hidden sm:block">
                            <SearchInput />
                        </div>
                    </div>

                    {/* Nav Items - hidden on small screens */}
                    <div className="hidden md:flex gap-6">
                        <NavItem />
                    </div>

                    {/* Right Side - Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="rounded-full cursor-pointer bg-blue-700 text-white hover:bg-blue-500 px-4 py-1">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>

                {/* Mobile Search - visible only on small screens */}
                {/* <div className="block sm:hidden mb-2">
                    <SearchInput />
                </div> */}
            </div>
        </div>

    )
}

export default Navbar