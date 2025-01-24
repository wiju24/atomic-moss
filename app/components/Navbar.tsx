import Link from "next/link";

export default function Navbar() {
return (
    <header className="mb-8 border-b">
        <div className="flex items-center justify-between mx-auto max-w-2xl sm:px6 lg:max-w-7xl">
            <Link href="/">
                <h1 className="text-4xl font-bold">
                    Next<span className="text-primary">Commerce</span>
                </h1>
            </Link>
        </div>
    </header>
    );
}