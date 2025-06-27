import { useQuery } from '@tanstack/react-query';
import { GetCalendar } from '@/api/api';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import SubjectCard from '@/components/molecules/subject-card';
import { CalendarItem } from '@/types';
import { convertToTraditional } from '@/utils/opencc';

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

const CalendarView = () => {
    const {
        data: calendar,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['calendar'],
        queryFn: GetCalendar,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <p className="text-red-600">載入失敗：{(error as Error).message}</p>
            </div>
        );
    }

    if (!calendar || calendar.length === 0) {
        return (
            <div className="py-8 text-center">
                <p className="text-gray-600">暫無資料</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">每日新番</h1>

            {calendar.map((day: CalendarItem) => (
                <div key={day.weekday.id} className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">
                        星期{WEEKDAYS[day.weekday.id - 1]} ({convertToTraditional(day.weekday.cn)})
                    </h2>

                    {day.items.length === 0 ? (
                        <p className="py-4 text-center text-gray-500">今日無新番</p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {day.items.map((subject) => (
                                <SubjectCard key={subject.id} subject={subject} showRating={true} showSummary={false} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CalendarView;
