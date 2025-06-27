import { Home, Search, Calendar, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { cn } from '@/utils/shadcn';

interface LayoutProps {
    children: ReactNode;
}

const navItems = [
    { path: '/', label: '首頁', icon: Home },
    { path: '/calendar', label: '新番表', icon: Calendar },
    { path: '/search', label: '搜尋', icon: Search },
];

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 頂部導航 */}
            <nav className="border-b bg-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="text-2xl font-bold text-blue-600">Bangumi</div>
                        </Link>

                        <div className="hidden space-x-8 md:flex">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            'flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-700 transition-colors hover:text-blue-600">
                                <User className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 移動端底部導航 */}
            <div className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white md:hidden">
                <div className="grid grid-cols-3 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'flex flex-col items-center justify-center p-2 text-xs transition-colors',
                                    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                )}
                            >
                                <Icon className="mb-1 h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* 主要內容 */}
            <main className="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 md:pb-8 lg:px-8">{children}</main>
        </div>
    );
};

export default Layout;
