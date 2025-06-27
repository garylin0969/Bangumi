import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
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

 const SearchForm = ({
  onSearch,
  className,
  placeholder = '搜尋條目...',
  showTypeFilter = true
}: SearchFormProps) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormData>();

  const onSubmit = (data: SearchFormData) => {
    if (data.keyword.trim()) {
      onSearch(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col sm:flex-row gap-2', className)}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          {...register('keyword', { required: true })}
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting}
        />
      </div>

      {showTypeFilter && (
        <select
          {...register('type', { valueAsNumber: true })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? '搜尋中...' : '搜尋'}
      </button>
    </form>
  );
};

export default SearchForm;