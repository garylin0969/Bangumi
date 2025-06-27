import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchSubjects } from '@/api/subject';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import SearchForm from '@/components/molecules/search-form';
import SubjectCard from '@/components/molecules/subject-card';

interface SearchFormData {
    keyword: string;
    type?: number;
}

const SearchResults = () => {
    const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);

    const {
        data: searchResults,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['search', searchParams],
        queryFn: () =>
            searchParams
                ? SearchSubjects(searchParams.keyword, searchParams.type, 'large', 0, 25)
                : Promise.resolve(null),
        enabled: !!searchParams,
    });

    const handleSearch = (data: SearchFormData) => {
        setSearchParams(data);
    };

    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900">搜尋條目</h1>
                <SearchForm onSearch={handleSearch} />
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="lg" />
                </div>
            )}

            {error && (
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <p className="text-center text-red-600">搜尋失敗：{(error as Error).message}</p>
                </div>
            )}

            {searchResults && (
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">搜尋結果</h2>
                        <span className="text-sm text-gray-600">共找到 {searchResults.results} 個結果</span>
                    </div>

                    {searchResults.list.length === 0 ? (
                        <p className="py-8 text-center text-gray-500">未找到相關結果</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {searchResults.list.map((subject) => (
                                <SubjectCard key={subject.id} subject={subject} showRating={true} showSummary={true} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {!searchParams && !isLoading && (
                <div className="rounded-lg bg-white p-8 text-center shadow-md">
                    <p className="text-gray-600">請輸入關鍵字開始搜尋</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
