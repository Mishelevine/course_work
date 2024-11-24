const AuthLayout = ( { children }: { children: React.ReactNode } ) => {
    return (
        <div className="flex min-h-screen items-center justify-center
        bg-auth bg-cover bg-zinc-500 bg-blend-multiply">
            {children}
        </div>
    );
}

export default AuthLayout;
