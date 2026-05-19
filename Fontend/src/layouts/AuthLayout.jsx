export default function AuthLayout({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-purple-100 to-white">
            {children}
        </div>
    );
}