const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
                <a href="/" className="text-blue-600 underline mt-4 inline-block">
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;
