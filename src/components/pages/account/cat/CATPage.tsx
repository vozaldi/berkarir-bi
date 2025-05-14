'use client';

import Button from "@/components/basics/buttons/Button";
import Modal from "@/components/basics/Modal";
import ToastMessage from "@/components/basics/ToastMessage";
import LaporkanSoalForm from "@/components/forms/account/cat/LaporkanSoalForm";
import TimerCAT from "@/components/pages/account/cat/TimerCAT";
import httpService from "@/lib/utilities/httpService";
import { AnswerModel, AttemptModel, QuestionDiscussion, QuestionMainCategory, QuestionModel, QuizModel } from "@/types/models";
import clsx from "clsx";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CATAnswer from "./CATAnswer";
import CATQuestionList, { CATQuestionListRef } from "./CATQuestionList";
import CATFloatingAction from "./CATFloatingAction";
import QuestionWrittenExpression from "./QuestionWrittenExpression";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  quiz: QuizModel;
};

type TimeSpent = {
  start?: string | null;
  end?: string | null;
};

type QuestionTimer = {
  [key: number]: TimeSpent[];
};

export default function CATPage({
  quiz,
}: Props) {
  // Props
  const qs = quiz.questions || [];

  // Hooks
  const router = useRouter();
  const params = useSearchParams();

  const questionListRef = useRef<CATQuestionListRef>(null);

  // States
  const [{ active, timer }, setActive] = useState({
    active: 0,
    timer: {} as QuestionTimer,
  });
  const [discussion, setDiscussion] = useState({
    models: [] as QuestionDiscussion[],
    modelsLoaded: false,
    correctAnswers: {} as { [key: number]: number },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [date, setDate] = useState<string | null>(null);
  const [markedQs, setMarkedQs] = useState<number[]>([]);
  const [result, setResult] = useState({
    attempt: null as AttemptModel | null,
    total_score: 0,
    total_time: 0,
    total_questions: 0,
    answered_questions: 0,
    total_correct_answers: 0,
    isLoaded: false,
  });
  const [categories, setCategories] = useState<QuestionMainCategory[]>([]);
  const [options, setOptions] = useState({
    finishModalOpen: false,
    reportModalOpen: false,
  });

  // Effects
  useEffect(() => {
    const endDate = params.get('end');

    if (endDate) {
      const endAt = dayjs(endDate || null);
      
      setDate(endAt.format('YYYY-MM-DD HH:mm:ss'));
    }
  }, [params]);

  useEffect(() => {
    setIsEnded(false);
    setActive(state => ({
      ...state,
      active: 0,
      timer: {
        0: [{ start: dayjs().format('YYYY-MM-DD HH:mm:ss') }],
      },
    }));
  }, [date]);

  useEffect(() => {
    if (quiz.questions?.length) {
      const categories = quiz.questions.reduce<QuestionMainCategory[]>((a, b) => {
        const category = b.main_category;

        if (category && !a.find(({ id }) => id === category.id)) {
          return [...a, category];
        }

        return a;
      }, []);

      setCategories(categories);
    }
  }, [quiz.id]);

  useEffect(() => {
    if (markedQs.length) {
      const answersKeys = Object.keys(answers).map(Number);
      const markQs = markedQs.filter((item) => {
        return !answersKeys.includes(item);
      });

      setMarkedQs(markQs);
    }
  }, [answers]);

  // Comms
  const handleAnswer = async (question: QuestionModel, answer: AnswerModel) => {
    answer.id && setAnswers(state => ({
      ...state,
      [active]: answer.id!,
    }));
  };

  const handleMarkQuestion = async (qIndex: number) => {
    const question = qs[qIndex];

    setMarkedQs(state => {
      const isMarked = state.includes(qIndex);

      return isMarked ? state.filter(i => i !== qIndex) : [...state, qIndex];
    });

    httpService(`/v1/quizzes/${quiz.id}/questions/${question.id}/mark-difficult`, {
      method: 'POST',
    });
  };

  const handleStartDiscussion = async (attempt_id: number) => {
    setDiscussion(state => ({ ...state, modelsLoaded: false, models: [] }));

    return httpService(`/v1/quizzes/attempts/${attempt_id}/discussion`).then((data) => {
      if (data?.data) {
        const models: QuestionDiscussion[] = data.data?.questions;
        const answers: { [key: number]: number } = {};
        const correctAnswers: { [key: number]: number } = {};
        
        models.forEach(({ user_answer, correct_answer }, index) => {
          if (user_answer?.id) {
            answers[index] = user_answer.id;
          }

          correctAnswers[index] = correct_answer?.id || 0;
        });

        setAnswers(answers);
        setActive(state => ({ ...state, active: 0 }));

        return setDiscussion(state => ({
          ...state,
          modelsLoaded: true,
          models,
          correctAnswers,
        }));
      }

      throw data;
    }).catch((err) => {
      const message = err?.message || err?.data?.message || `Unexpected error.`;

      return ToastMessage.toast(message, { type: 'error' });
    });
  };

  // Handlers
  const handleNavigateQuestion = (index: number | 'next' | 'prev', forceUpdate = false) => {
    const next = index === 'next' ? (active + 1) : (
      index === 'prev' ? (active - 1) : index
    );
    const nextActive = next <= 0 ? 0 : (next > (qs.length - 1) ? (qs.length - 1) : next);
    const nextTimer = { ...timer };

    if (!nextTimer[nextActive]) {
      nextTimer[nextActive] = [];
    }

    if (nextActive !== active) {
      nextTimer[nextActive].push({
        start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    }

    if ((nextTimer[active] && nextActive !== active) || forceUpdate) {
      const emptyEnd = timer[active].findIndex(item => !item.end);

      if (emptyEnd >= 0) {
        timer[active][emptyEnd].end = dayjs().format('YYYY-MM-DD HH:mm:ss');

        const time_spent = timer[active].reduce((a, b ) => {
          const start = dayjs(b.start);
          const end = !b.end ? dayjs() : dayjs(b.end);

          return a + Math.abs(end.diff(start, 'second'));
        }, 0);
        const question = qs[active];
        const answer = answers[active];

        if (!answer) {
          !isEnded && httpService(`/v1/quizzes/${quiz.id}/questions/${question.id}/track-time`, {
            method: "POST",
            data: {
              time_spent,
            },
          });
        } else {
          !isEnded && httpService(`/v1/quizzes/${quiz.id}/questions/${question.id}/answer`, {
            method: 'POST',
            data: {
              selected_answer_id: answer,
              time_spent,
            },
          }).catch(() => null);
        }
      }
    }

    setActive(state => ({ ...state, active: nextActive, timer: nextTimer }));
    questionListRef.current?.goToPage(nextActive);
  };

  const handleEndSesion = (force = false) => {
    if (!force) {
      return setOptions(state => ({ ...state, finishModalOpen: true }));
    } else if (isEnded) {
      return void(0);
    }

    const answer = answers[active];

    if (answer) {
      handleNavigateQuestion(active, true);
    }

    setIsSaving(true);
    setIsEnded(true);
    setResult(state => ({ ...state, isLoaded: false }));

    return httpService(`/v1/quizzes/${quiz.id}/finish`, {
      method: "POST",
    }).then((data) => {
      setResult(state => ({ ...state, isLoaded: true, ...data.data }));

      setOptions(state => ({ ...state, finishModalOpen: false }));
    }).catch((err) => {
      const message = err?.message || err?.data?.message || `Unexpected error.`;

      ToastMessage.toast(message, { type: 'error' });
    }).finally(() => {
      setIsSaving(false);
    });
  };

  // Vars
  const isDiscussion = !!discussion.modelsLoaded && isEnded;
  const answeredCount = Object.keys(answers).length;

  const qText = qs[active]?.question_text;
  const questionMarks = qText?.match(/\?/g) || [];
  const questionCount = questionMarks.length;

  return (
    <>
      <div className="flex flex-1 lg:flex-row flex-col-reverse gap-6">
        <div className="lg:flex-1 flex flex-col">
          <div className="bg-card rounded-xl shadow-md p-4">
            <div className="flex lg:flex-row flex-col gap-x-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-dark-700">
                  {quiz.name}
                </h3>

                <p className="text-xs text-dark-600">
                  {`Berisi total ${qs.length} soal`}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {[active].map((item) => {
                    const category = qs[active]?.main_category;
                    const subCategory = qs[active]?.sub_category;

                    return (
                      <span key={item} className={clsx([
                        'px-2 py-0.5 rounded-md text-white text-xs',
                        [
                          'bg-yellow-700', 'bg-blue-500', 'bg-green-500',
                          'bg-pink-700', 'bg-cyan-500', 'bg-purple-500',
                          'bg-orange-700', 'bg-lime-500', 'bg-amber-500',
                        ][(category?.id || 0) % 3],
                      ])}>
                        {category?.name?.split(' ').map((item) => item[0]).join('')}: {subCategory?.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="text-right self-end">
                <p className="text-xs text-dark-400">
                  {`Dimulai pada`}
                  <br /><strong className="text-dark-700 font-medium">
                    {dayjs(date).subtract(90, 'minute').format('DD MMMM YYYY - HH:mm')}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-card rounded-xl shadow-md p-4 mt-4 xl:mt-6">
            {(isEnded && !isDiscussion) && (
              <div className="pt-3 min-h-64 flex flex-col items-center justify-center">
                <h3 className="text-center text-lg font-bold text-primary">
                  {`Sesi Telah Diakhiri`}
                </h3>

                <p className="text-center">
                  {`Hasil tryout kamu adalah sebagai berikut`}:
                </p>

                {!result.isLoaded && (
                  <p className="my-4 text-center">
                    {`Memuat skor Anda...`}
                  </p>
                )}

                {result.isLoaded && (
                  <div className="mt-4 -mb-2 text-center">
                    <h3 className="text-3xl font-bold">
                      {`Skor Kamu: ${result.total_score}`}
                    </h3>
                  </div>
                )}

                {(result.isLoaded && (result.total_score >= quiz.passing_score!)) && (
                  <p className="my-4 text-center text-green-500">
                    <strong>{`Selamat! Kamu lulus dalam tes ini.`}</strong>
                  </p>
                )}

                {(result.isLoaded && (result.total_score < quiz.passing_score!)) && (
                  <p className="my-4 text-center text-red-500">
                    <strong>{`Maaf, kamu belum lulus dalam tes ini.`}</strong>
                  </p>
                )}

                <div className="flex justify-between pt-2 pb-3 gap-2">
                  <Button
                    type="link"
                    href={'/dashboard'}
                    className="!rounded-full"
                    color="primary"
                    size="sm"
                  >
                    {`Ke Beranda`}
                  </Button>

                  <Button
                    className="!rounded-full"
                    color="success"
                    size="sm"
                    onClick={() => result.attempt?.id && handleStartDiscussion(result.attempt.id)}
                  >
                    {`Lihat Pembahasan Soal`}
                  </Button>

                  <Button
                    className="!rounded-full"
                    color="secondary"
                    size="sm"
                    onClick={() => {
                      setAnswers({});

                      router.push(`/paket/${quiz.id}/cat?end=${dayjs().add(90, 'minute').format('YYYY-MM-DD HH:mm:ss')}`);
                    }}
                  >
                    {`Ulangi Tes`}
                  </Button>
                </div>
              </div>
            )}

            {(!isEnded || isDiscussion) && (
              <>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">
                      {`Soal Nomor ${active + 1}`}
                    </h3>
                  </div>
                </div>

                <hr className="mt-4 border-dark-300" />

                <div className="mt-4 text-lg">
                  {questionCount >= 4 ? (
                    <QuestionWrittenExpression question={qs[active]} />
                  ) : (
                    <p>{qs[active]?.question_text}</p>
                  )}

                  <CATAnswer
                    className={clsx(["mt-4", isEnded && "pointer-events-none"])}
                    question={qs[active]}
                    value={answers[active]}
                    isCorrectCallback={(answer) => {
                      return discussion.correctAnswers[active] === answer.id;
                    }}
                    onChange={(answer) => handleAnswer(qs[active], answer)}
                  />
                </div>

                {isDiscussion && ((model: QuestionDiscussion) => {
                  const correctId = discussion.correctAnswers[active];
                  const answerIndex = qs[active].answers?.findIndex(a => a.id == correctId);
                  const letter = ['A', 'B', 'C', 'D', 'E'][Number(answerIndex)];

                  return model && (
                    <div className="border border-dark-300 rounded-lg p-4 mt-4">
                      <h3 className="text-lg font-bold">
                        {`Pembahasan Soal`}
                      </h3>

                      <p className="mt-2">{model.explanation}</p>

                      {(!!letter && 'number' === typeof answerIndex) && (
                        <p className="mt-2">
                          {`Jawaban yang benar:`}<br />

                          <strong>{letter}. {qs[active].answers?.[answerIndex]?.answer_text}</strong>
                        </p>
                      )}

                      {!!model.user_answer && (
                        <p className="mt-2">
                          {`Jawaban kamu`}{' '}
                          {model.is_user_answer_correct ? (
                            <strong className="text-green-500">{`benar`}</strong>
                          ) : (
                            <strong className="text-red-500">{`salah`}</strong>
                          )}.
                        </p>
                      )}

                      {!model.user_answer && (
                        <p className="mt-2 text-red-500">
                          <strong>{`Kamu tidak menjawab soal ini.`}</strong>
                        </p>
                      )}
                    </div>
                  );
                })(discussion.models[active])}
              </>
            )}
          </div>
        </div>

        <div className="xl:w-3/12 lg:w-4/12 lg:flex flex-col gap-4 xl:gap-6 hidden">
          {quiz.quiz_type?.key === 'tryout' && (
            <div className="bg-card rounded-xl shadow-md p-4">
              <TimerCAT
                className="mt-1"
                onTimerEnd={() => handleEndSesion(true)}
                onDateChange={(date) => setDate(date)}
                isEnded={isEnded}
              />
            </div>
          )}

          <CATQuestionList
            ref={questionListRef}
            className={clsx([
              (isEnded && !isDiscussion) && "opacity-50 pointer-events-none",
            ])}
            questions={qs}
            answers={answers}
            correctAnswers={discussion.correctAnswers}
            markedQuestionIds={markedQs}
            isDiscussion={isDiscussion}
            onPageChange={(page) => handleNavigateQuestion(page)}
          />
        </div>
      </div>

      {/* Floating actions */}
      <CATFloatingAction
        className="!sticky -mx-4 bottom-4 inset-x-0 z-[300]"
        questions={qs}
        activeIndex={active}
        isMarked={markedQs.includes(active)}
        isEnded={isEnded}
        onNavigateClick={(nav) => handleNavigateQuestion(nav, true)}
        onLaporkanClick={() => setOptions(state => ({ ...state, reportModalOpen: true }))}
        onTandaiClick={() => handleMarkQuestion(active)}
        onFinishClick={() => setOptions(state => ({ ...state, finishModalOpen: true }))}
      />

      {/* Finish Confirm Modal */}
      <Modal
        isVisible={options.finishModalOpen}
        onHide={() => setOptions(state => ({ ...state, finishModalOpen: false }))}
      >
        <Modal.ModalCard
          className="w-[400px] text-center"
        >
          <h3 className="text-xl font-bold">
            {`Akhiri Ujian`}
          </h3>

          <div className="flex justify-center mt-4">
            <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 border-primary p-4">
              <h5 className="text-xl font-bold text-center -mx-4">
                {`${answeredCount} / ${qs.length}`}
              </h5>
              <p className="text-sm opacity-75">{`Dijawab`}</p>
            </div>
          </div>

          <p className="mt-2">{`Apakah kamu yakin ingin mengakhiri ujian?`}</p>

          <div className="mt-6 flex justify-center gap-x-4">
            <Button
              outline="primary"
              onClick={() => setOptions(state => ({ ...state, finishModalOpen: false }))}
            >
              {`Batal`}
            </Button>

            <Button
              color="danger"
              loading={isSaving}
              onClick={() => handleEndSesion(true)}
            >
              {`Ya, Akhiri`}
            </Button>
          </div>
        </Modal.ModalCard>
      </Modal>

      {/* Report Modal */}
      <Modal
        isVisible={options.reportModalOpen}
        onHide={() => setOptions(state => ({ ...state, reportModalOpen: false }))}
      >
        <Modal.ModalCard
          className="w-[480px] text-center"
        >
          {!!qs[active] && (
            <LaporkanSoalForm
              quiz={quiz}
              question={qs[active]}
              onCancel={() => setOptions(state => ({ ...state, reportModalOpen: false }))}
              onSubmitted={() => setOptions(state => ({ ...state, reportModalOpen: false }))}
            />
          )}
        </Modal.ModalCard>
      </Modal>
    </>
  );
};
