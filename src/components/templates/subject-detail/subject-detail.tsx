import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GetSubject, GetSubjectCharacters, GetSubjectEpisodes } from '@/api/subject';
import ImageWithFallback from '@/components/atoms/image-with-fallback';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import RatingStars from '@/components/atoms/rating-stars';
import { SUBJECT_TYPES } from '@/types/bangumi';
import { convertToTraditional } from '@/utils/opencc';

const getSubjectTypeName = (type: number): string => {
    const typeMap = {
        [SUBJECT_TYPES.BOOK]: '書籍',
        [SUBJECT_TYPES.ANIME]: '動畫',
        [SUBJECT_TYPES.MUSIC]: '音樂',
        [SUBJECT_TYPES.GAME]: '遊戲',
        [SUBJECT_TYPES.REAL]: '真人',
    };
    return typeMap[type as keyof typeof typeMap] || '未知';
};

const SubjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const subjectId = Number(id);

    const {
        data: subject,
        isLoading: subjectLoading,
        error: subjectError,
    } = useQuery({
        queryKey: ['subject', subjectId],
        queryFn: () => GetSubject(subjectId),
        enabled: !!subjectId,
    });

    const { data: characters, isLoading: charactersLoading } = useQuery({
        queryKey: ['subject-characters', subjectId],
        queryFn: () => GetSubjectCharacters(subjectId),
        enabled: !!subjectId,
    });

    const { data: episodes, isLoading: episodesLoading } = useQuery({
        queryKey: ['subject-episodes', subjectId],
        queryFn: () => GetSubjectEpisodes(subjectId, 0, 20, 0),
        enabled: !!subjectId,
    });

    if (subjectLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (subjectError || !subject) {
        return (
            <div className="py-8 text-center">
                <p className="text-red-600">載入失敗：條目不存在或網路錯誤</p>
            </div>
        );
    }

    const displayName = convertToTraditional(subject.name_cn || subject.name);
    const displaySummary = convertToTraditional(subject.summary || '');

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            {/* 基本信息 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex-shrink-0">
                        <ImageWithFallback
                            src={subject.images?.large || subject.images?.common || ''}
                            alt={displayName}
                            className="h-64 w-48 rounded-lg shadow-md"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-gray-900">{displayName}</h1>
                            {subject.name !== (subject.name_cn || subject.name) && (
                                <p className="text-lg text-gray-600">{subject.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                                {getSubjectTypeName(subject.type)}
                            </span>
                            {subject.air_date && <span>首播：{subject.air_date}</span>}
                        </div>

                        {subject.rating?.score > 0 && (
                            <div>
                                <RatingStars rating={subject.rating.score} size="lg" />
                                <p className="mt-1 text-sm text-gray-600">共 {subject.rating.total} 人評分</p>
                            </div>
                        )}

                        {subject.collection && (
                            <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-5">
                                <div className="rounded bg-gray-50 p-2 text-center">
                                    <div className="font-semibold text-gray-900">{subject.collection.wish}</div>
                                    <div className="text-gray-600">想看</div>
                                </div>
                                <div className="rounded bg-gray-50 p-2 text-center">
                                    <div className="font-semibold text-gray-900">{subject.collection.doing}</div>
                                    <div className="text-gray-600">在看</div>
                                </div>
                                <div className="rounded bg-gray-50 p-2 text-center">
                                    <div className="font-semibold text-gray-900">{subject.collection.collect}</div>
                                    <div className="text-gray-600">看過</div>
                                </div>
                                <div className="rounded bg-gray-50 p-2 text-center">
                                    <div className="font-semibold text-gray-900">{subject.collection.on_hold}</div>
                                    <div className="text-gray-600">擱置</div>
                                </div>
                                <div className="rounded bg-gray-50 p-2 text-center">
                                    <div className="font-semibold text-gray-900">{subject.collection.dropped}</div>
                                    <div className="text-gray-600">拋棄</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {displaySummary && (
                    <div className="mt-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-800">簡介</h2>
                        <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{displaySummary}</p>
                    </div>
                )}

                {subject.tags && subject.tags.length > 0 && (
                    <div className="mt-6">
                        <h2 className="mb-3 text-xl font-semibold text-gray-800">標籤</h2>
                        <div className="flex flex-wrap gap-2">
                            {subject.tags.map((tag, index) => (
                                <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                                    {convertToTraditional(tag.name)} ({tag.count})
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 角色列表 */}
            {charactersLoading ? (
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">角色</h2>
                    <div className="flex justify-center py-4">
                        <LoadingSpinner />
                    </div>
                </div>
            ) : (
                characters &&
                characters.length > 0 && (
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">角色</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {characters.slice(0, 12).map((character) => (
                                <div key={character.id} className="text-center">
                                    <ImageWithFallback
                                        src={character.images?.medium || ''}
                                        alt={convertToTraditional(character.name)}
                                        className="mx-auto mb-2 h-28 w-20 rounded-lg"
                                    />
                                    <p className="line-clamp-2 text-sm font-medium text-gray-900">
                                        {convertToTraditional(character.name)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {characters.length > 12 && (
                            <p className="mt-4 text-center text-gray-600">還有 {characters.length - 12} 個角色...</p>
                        )}
                    </div>
                )
            )}

            {/* 章節列表 */}
            {episodesLoading ? (
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">章節</h2>
                    <div className="flex justify-center py-4">
                        <LoadingSpinner />
                    </div>
                </div>
            ) : (
                episodes &&
                episodes.data.length > 0 && (
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">章節 ({episodes.total})</h2>
                        <div className="space-y-2">
                            {episodes.data.map((episode) => (
                                <div
                                    key={episode.id}
                                    className="flex items-center rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                                >
                                    <div className="w-16 flex-shrink-0 text-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            {episode.sort || episode.ep}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {convertToTraditional(episode.name_cn || episode.name)}
                                        </p>
                                        {episode.airdate && <p className="text-xs text-gray-500">{episode.airdate}</p>}
                                    </div>
                                    {episode.duration && (
                                        <div className="flex-shrink-0 text-xs text-gray-500">{episode.duration}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {episodes.total > episodes.data.length && (
                            <p className="mt-4 text-center text-gray-600">
                                顯示 {episodes.data.length} / {episodes.total} 章節
                            </p>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default SubjectDetail;
