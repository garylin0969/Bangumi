import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import { SubjectCard } from '@/components/molecules/subject-card';
import { SearchForm } from '@/components/molecules/search-form';
import { bangumiApi, SearchResult } from '@/lib/api';

interface SearchFormData {
  keyword: string;
  type?: number;
}

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['search', searchParams],
    queryFn: () =>
      searchParams
        ? bangumiApi.searchSubjects(searchParams.keyword, searchParams.type, 'large', 0, 25)
        : Promise.resolve(null),
    enabled: !!searchParams,
  });

  const handleSearch = (data: SearchFormData) => {
    setSearchParams(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">搜尋條目</h1>
        <SearchForm onSearch={handleSearch} />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {error && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600 text-center">
            搜尋失敗：{(error as Error).message}
          </p>
        </div>
      )}

      {searchResults && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              搜尋結果
            </h2>
            <span className="text-sm text-gray-600">
              共找到 {searchResults.results} 個結果
            </span>
          </div>

          {searchResults.list.length === 0 ? (
            <p className="text-gray-500 text-center py-8">未找到相關結果</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.list.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  showRating={true}
                  showSummary={true}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {!searchParams && !isLoading && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">請輸入關鍵字開始搜尋</p>
        </div>
      )}
    </div>
  );
};