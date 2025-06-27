import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarView from '@/components/organisms/calendar-view';
import SearchResults from '@/components/organisms/search-results';
import Layout from '@/components/templates/layout/layout';
import SubjectDetail from '@/components/templates/subject-detail';

// 創建 QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 分鐘
            retry: 2,
        },
    },
});

// 首頁組件
const HomePage = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">歡迎來到Bangumi</h1>
                <p className="mb-8 text-xl text-gray-600">您的繁體中文動漫資訊平台</p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <a
                        href="/calendar"
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                    >
                        查看新番表
                    </a>
                    <a
                        href="/search"
                        className="rounded-lg bg-gray-100 px-6 py-3 text-gray-900 transition-colors hover:bg-gray-200"
                    >
                        搜尋動漫
                    </a>
                </div>
            </div>

            {/* 顯示本週新番預覽 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">本週新番</h2>
                <CalendarView />
            </div>
        </div>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/calendar" element={<CalendarView />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/subject/:id" element={<SubjectDetail />} />
                    </Routes>
                </Layout>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
