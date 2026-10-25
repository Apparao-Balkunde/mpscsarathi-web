import React, { useState, useMemo } from 'react';
import { INITIAL_MCQ_QUESTIONS, McqQuestion, McqSubject } from './data/mcqData';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Search,
  ListChecks,
  Layers,
} from 'lucide-react';

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<McqSubject | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'single' | 'list'>('single');
  const [currentIndex, setCurrentIndex] = useState(0);

  // User Answers Map: questionId -> selected option index (0..3)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Revealed Explanations Map
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    return INITIAL_MCQ_QUESTIONS.filter((q) => {
      const matchesSubject = selectedSubject === 'All' || q.subject === selectedSubject;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        q.question.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query) ||
        q.examTag.toLowerCase().includes(query) ||
        q.options.some((o) => o.toLowerCase().includes(query));
      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, searchQuery]);

  const safeIndex = Math.min(currentIndex, Math.max(0, filteredQuestions.length - 1));
  const activeQuestion = filteredQuestions[safeIndex] || null;

  // Score Statistics
  const stats = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;

    filteredQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        attempted++;
        if (ans === q.correctIndex) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return {
      total: filteredQuestions.length,
      attempted,
      correct,
      incorrect,
      accuracy,
    };
  }, [filteredQuestions, userAnswers]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setRevealedExplanations({});
    setCurrentIndex(0);
  };

  const handleSubjectChange = (subj: McqSubject | 'All') => {
    setSelectedSubject(subj);
    setCurrentIndex(0);
  };

  const renderMcqCard = (q: McqQuestion, indexNumber: number) => {
    const selectedOpt = userAnswers[q.id];
    const isAnswered = selectedOpt !== undefined;
    const isExplanationShown = isAnswered || Boolean(revealedExplanations[q.id]);

    return (
      <article
        key={q.id}
        className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-2xs"
      >
        {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100 text-xs font-mono text-stone-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#9A3412] font-semibold font-mono-tabular">
              प्रश्न क्र. {String(indexNumber + 1).padStart(2, '0')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-800 font-sans font-medium">{q.subjectMr}</span>
            <span aria-hidden="true">·</span>
            <span className="font-sans">{q.examTag}</span>
          </div>

          {isAnswered && (
            <span
              className={`font-sans font-semibold ${
                selectedOpt === q.correctIndex ? 'text-emerald-700' : 'text-red-700'
              }`}
            >
              {selectedOpt === q.correctIndex ? '✓ अचूक उत्तर (+२ गुण)' : '✕ चुकीचे उत्तर'}
            </span>
          )}
        </div>

        {/* Question Stem */}
        <h2 className="font-editorial text-lg sm:text-xl font-semibold text-stone-900 leading-relaxed">
          {q.question}
        </h2>

        {/* 4 Interactive Options */}
        <div className="space-y-3">
          {q.options.map((optText, idx) => {
            const isThisSelected = selectedOpt === idx;
            const isThisCorrect = idx === q.correctIndex;

            let optionStyle =
              'bg-[#FBF9F5] border-stone-300 text-stone-800 hover:border-stone-500 hover:bg-stone-100/70';
            if (isAnswered) {
              if (isThisCorrect) {
                optionStyle = 'bg-emerald-50/90 border-emerald-600 text-emerald-950 font-semibold';
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'bg-red-50/90 border-red-500 text-red-950';
              } else {
                optionStyle = 'bg-stone-50/60 border-stone-200 text-stone-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(q.id, idx)}
                className={`w-full text-left px-4 py-3.5 rounded-md border text-sm sm:text-base transition-colors flex items-center justify-between gap-4 cursor-pointer ${optionStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono-tabular text-xs font-semibold mt-0.5 shrink-0 opacity-75">
                    ({idx + 1})
                  </span>
                  <span className="leading-snug">{optText}</span>
                </div>

                {isAnswered && isThisCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>अचूक पर्याय</span>
                  </span>
                )}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-red-700 shrink-0">
                    <XCircle className="w-4 h-4" />
                    <span>तुमचे उत्तर</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Toggle or Auto-Show Official Explanation */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setRevealedExplanations((prev) => ({
                ...prev,
                [q.id]: !prev[q.id],
              }))
            }
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A3412] hover:underline cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {isExplanationShown
                ? 'स्पष्टीकरण लपवा (Hide Explanation)'
                : 'उत्तर न निवडता स्पष्टीकरण पहा (Show Explanation)'}
            </span>
          </button>

          {isAnswered && (
            <button
              type="button"
              onClick={() => {
                setUserAnswers((prev) => {
                  const next = { ...prev };
                  delete next[q.id];
                  return next;
                });
              }}
              className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              हा प्रश्न पुन्हा सोडवा (Retry Question)
            </button>
          )}
        </div>

        {isExplanationShown && (
          <div className="p-4 bg-[#F4F0EA] border border-stone-300/80 rounded-md text-sm text-stone-800 leading-relaxed space-y-1">
            <p className="font-semibold text-stone-900">
              अचूक उत्तर: पर्याय ({q.correctIndex + 1}) — {q.options[q.correctIndex]}
            </p>
            <p className="text-stone-700">{q.explanation}</p>
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleSubjectChange('All');
          }}
          className="font-editorial text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          mpscsarathi.online
        </a>

        {/* Zone 2: 5 concise single-line subject navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {(
            [
              { key: 'All', label: 'सर्व विषय (All)' },
              { key: 'Polity', label: 'राज्यघटना (Polity)' },
              { key: 'History', label: 'इतिहास (History)' },
              { key: 'Geography', label: 'भूगोल (Geography)' },
              { key: 'Economy', label: 'अर्थशास्त्र (Economy)' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => handleSubjectChange(item.key)}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedSubject === item.key
                  ? 'text-[#9A3412] underline underline-offset-8 font-semibold'
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (Reset Practice) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#1C1917] hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>सराव रीसेट करा</span>
          </button>
        </div>
      </header>

      {/* Main Two-Zone MCQ Practice Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Top Filter & Mode Control Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#9A3412]">
              MPSC STATIC MCQ QUESTION BANK · सराव प्रश्नसंच
            </p>
            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              राज्यसेवा व कम्बाईन वस्तुनिष्ठ बहुपर्यायी प्रश्न (MCQ Practice)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                placeholder="प्रश्न किंवा विषय शोधा..."
                className="pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412] w-56 sm:w-64"
              />
            </div>

            {/* Mode Switcher: Step-by-Step vs All List */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'single'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>एक-एक प्रश्न (Quiz)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'list'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>सर्व प्रश्न (List)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subject Filter Strip */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {(
            [
              { key: 'All', label: 'सर्व विषय (20)' },
              { key: 'Polity', label: 'भारतीय राज्यघटना' },
              { key: 'History', label: 'आधुनिक इतिहास' },
              { key: 'Geography', label: 'महाराष्ट्राचा भूगोल' },
              { key: 'Economy', label: 'अर्थव्यवस्था व सांख्यिकी' },
              { key: 'Science', label: 'सामान्य विज्ञान' },
            ] as const
          ).map((subj) => (
            <button
              key={subj.key}
              onClick={() => handleSubjectChange(subj.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                selectedSubject === subj.key
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {subj.label}
            </button>
          ))}
        </div>

        {/* Two-Column Educational Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Interactive MCQ Stage */}
          <div className="lg:col-span-8 space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-lg p-12 text-center space-y-3">
                <p className="font-editorial text-lg text-stone-800">
                  या विषयासाठी किंवा शोधासाठी कोणताही MCQ प्रश्न आढळला नाही.
                </p>
                <button
                  onClick={() => {
                    setSelectedSubject('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#1C1917] text-white text-xs font-medium rounded-md cursor-pointer"
                >
                  सर्व प्रश्न दाखवा (Reset Filter)
                </button>
              </div>
            ) : viewMode === 'single' && activeQuestion ? (
              <div className="space-y-4">
                {renderMcqCard(activeQuestion, safeIndex)}

                {/* Previous / Next Navigation Bar */}
                <div className="flex items-center justify-between gap-4 bg-white border border-stone-200 rounded-lg p-4">
                  <button
                    type="button"
                    disabled={safeIndex === 0}
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md border border-stone-300 text-stone-800 hover:bg-stone-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>मागील प्रश्न (Previous)</span>
                  </button>

                  <span className="font-mono-tabular text-xs font-semibold text-stone-600">
                    {safeIndex + 1} / {filteredQuestions.length}
                  </span>

                  <button
                    type="button"
                    disabled={safeIndex >= filteredQuestions.length - 1}
                    onClick={() =>
                      setCurrentIndex((i) => Math.min(filteredQuestions.length - 1, i + 1))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md bg-[#1C1917] hover:bg-stone-800 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>पुढील प्रश्न (Next)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* List Mode: All Filtered MCQs */
              <div className="space-y-6">
                {filteredQuestions.map((q, idx) => renderMcqCard(q, idx))}
              </div>
            )}
          </div>

          {/* Right 4 Cols: Scoreboard & Question Palette */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Live Scoreboard Card */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-editorial text-lg font-semibold text-stone-900">
                  तुमचा निकाल (Live Scoreboard)
                </h3>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#9A3412] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रीसेट करा</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono-tabular">
                <div className="p-3 bg-[#FBF9F5] border border-stone-200 rounded">
                  <span className="text-[11px] text-stone-500 block font-sans">एकूण प्रश्न (Total)</span>
                  <span className="text-xl font-bold text-stone-900">{stats.total}</span>
                </div>
                <div className="p-3 bg-[#FBF9F5] border border-stone-200 rounded">
                  <span className="text-[11px] text-stone-500 block font-sans">सोडवलेले (Attempted)</span>
                  <span className="text-xl font-bold text-stone-900">{stats.attempted}</span>
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded">
                  <span className="text-[11px] text-emerald-800 block font-sans">बरोबर (Correct)</span>
                  <span className="text-xl font-bold text-emerald-800">{stats.correct}</span>
                </div>
                <div className="p-3 bg-red-50/70 border border-red-200 rounded">
                  <span className="text-[11px] text-red-800 block font-sans">चुकीचे (Wrong)</span>
                  <span className="text-xl font-bold text-red-800">{stats.incorrect}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-mono-tabular">
                <span className="text-stone-600 font-sans">अचूकता प्रमाण (Accuracy):</span>
                <span className="text-base font-bold text-[#9A3412]">{stats.accuracy}%</span>
              </div>
            </div>

            {/* Question Palette Grid */}
            <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-base font-semibold text-stone-900">
                  प्रश्न क्रमांक तक्ता (Question Palette)
                </h3>
                <span className="text-xs font-mono text-stone-500">{filteredQuestions.length} MCQs</span>
              </div>

              <div className="grid grid-cols-5 gap-2 font-mono-tabular">
                {filteredQuestions.map((q, idx) => {
                  const ans = userAnswers[q.id];
                  const isCurrent = viewMode === 'single' && idx === safeIndex;

                  let btnClass = 'bg-[#FBF9F5] text-stone-700 border-stone-300 hover:border-stone-500';
                  if (ans !== undefined) {
                    if (ans === q.correctIndex) {
                      btnClass = 'bg-emerald-600 text-white border-emerald-700 font-semibold';
                    } else {
                      btnClass = 'bg-red-600 text-white border-red-700 font-semibold';
                    }
                  }
                  if (isCurrent) {
                    btnClass += ' ring-2 ring-[#9A3412] ring-offset-1';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setViewMode('single');
                        setCurrentIndex(idx);
                      }}
                      className={`h-9 rounded border text-xs transition-all cursor-pointer ${btnClass}`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                <span>हिरवा = बरोबर उत्तर</span>
                <span>·</span>
                <span>लाल = चुकीचे उत्तर</span>
                <span>·</span>
                <span>पांढरा = न सोडवलेला</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-stone-200 bg-[#F4F0EA] py-6 px-4 sm:px-8 text-center text-xs text-stone-600 mt-12">
        <p>© 2026 mpscsarathi.online · MPSC राज्यसेवा व कम्बाईन वस्तुनिष्ठ प्रश्नसंच (Static MCQ Portal)</p>
      </footer>
    </div>
  );
}
