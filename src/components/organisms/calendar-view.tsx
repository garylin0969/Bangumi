import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/atoms/loading-spinner';
import { SubjectCard } from '@/components/molecules/subject-card';
import { bangumiApi, CalendarItem } from '@/lib/api';
import { convertToTraditional } from '@/utils/opencc';

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

export const CalendarView = () => {
  const { data: calendar, isLoading, error } = useQuery({
    queryKey: ['calendar'],
    queryFn: bangumiApi.getCalendar,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">載入失敗：{(error as Error).message}</p>
      </div>
    );
  }

  if (!calendar || calendar.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">暫無資料</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">每日新番</h1>

      {calendar.map((day: CalendarItem) => (
        <div key={day.weekday.id} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            星期{WEEKDAYS[day.weekday.id - 1]} ({convertToTraditional(day.weekday.cn)})
          </h2>

          {day.items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">今日無新番</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {day.items.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  showRating={true}
                  showSummary={false}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};