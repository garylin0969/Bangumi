import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { cn } from '@/utils/shadcn';

interface SearchFormData {
    keyword: string;
    type?: number;
}

interface SearchFormProps {
    onSearch: (data: SearchFormData) => void;
    className?: string;
    placeholder?: string;
    showTypeFilter?: boolean;
}

const SUBJECT_TYPE_OPTIONS = [
    { value: undefined, label: '全部' },
    { value: 1, label: '書籍' },
    { value: 2, label: '動畫' },
    { value: 3, label: '音樂' },
    { value: 4, label: '遊戲' },
    { value: 6, label: '真人' },
];

const SearchForm = ({ onSearch, className, placeholder = '搜尋條目...', showTypeFilter = true }: SearchFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormData>();

    const onSubmit = (data: SearchFormData) => {
        if (data.keyword.trim()) {
            onSearch(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-2 sm:flex-row', className)}>
            <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <input
                    {...register('keyword', { required: true })}
                    type="text"
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={isSubmitting}
                />
            </div>

            {showTypeFilter && (
                <select
                    {...register('type', { valueAsNumber: true })}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={isSubmitting}
                >
                    {SUBJECT_TYPE_OPTIONS.map((option) => (
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isSubmitting ? '搜尋中...' : '搜尋'}
            </button>
        </form>
    );
};

export default SearchForm;
