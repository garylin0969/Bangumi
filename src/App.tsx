import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/templates/layout/layout';
import CalendarView from '@/components/organisms/calendar-view';
import SearchResults from '@/components/organisms/search-results';
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          歡迎來到Bangumi
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          您的繁體中文動漫資訊平台
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/calendar"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看新番表
          </a>
          <a
            href="/search"
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            搜尋動漫
          </a>
        </div>
      </div>

      {/* 顯示本週新番預覽 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">本週新番</h2>
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
