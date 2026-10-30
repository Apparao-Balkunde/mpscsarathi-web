import React, { useState, useMemo } from 'react';
import { INITIAL_MCQ_QUESTIONS, McqSubject } from './data/mcqData';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<McqSubject | 'All'>('All');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  const filteredQuestions = useMemo(() => {
    if (selectedSubject === 'All') return INITIAL_MCQ_QUESTIONS;
    return INITIAL_MCQ_QUESTIONS.filter((q) => q.subject === selectedSubject);
  }, [selectedSubject]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Simple Top Header */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setSelectedSubject('All');
          }}
          className="font-editorial text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          practice.mpscsarathi.online
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {(
            [
              { key: 'All', label: 'सर्व प्रश्न' },
              { key: 'Polity', label: 'राज्यघटना' },
              { key: 'History', label: 'इतिहास' },
              { key: 'Geography', label: 'भूगोल' },
              { key: 'Economy', label: 'अर्थव्यवस्था व सांख्यिकी' },
              { key: 'Science', label: 'सामान्य विज्ञान' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSubject(item.key)}
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

        <div className="text-xs font-mono-tabular text-stone-600 shrink-0">
          एकूण {filteredQuestions.length} प्रश्न
        </div>
      </header>

      {/* Main Static MCQ Questions List */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Mobile Subject Tabs */}
        <div className="md:hidden flex flex-wrap items-center gap-1.5 pb-2">
          {(
            [
              { key: 'All', label: 'सर्व प्रश्न' },
              { key: 'Polity', label: 'राज्यघटना' },
              { key: 'History', label: 'इतिहास' },
              { key: 'Geography', label: 'भूगोल' },
              { key: 'Economy', label: 'अर्थव्यवस्था व सांख्यिकी' },
              { key: 'Science', label: 'विज्ञान' },
            ] as const
          ).map((subj) => (
            <button
              key={subj.key}
              onClick={() => setSelectedSubject(subj.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded border cursor-pointer whitespace-nowrap ${
                selectedSubject === subj.key
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-stone-700 border-stone-300'
              }`}
            >
              {subj.label}
            </button>
          ))}
        </div>

        {/* All Static MCQ Cards */}
        <div className="space-y-6">
          {filteredQuestions.map((q, index) => {
            const selectedOpt = userAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;

            return (
              <article
                key={q.id}
                className="bg-white border border-stone-200 rounded-lg p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                  <span className="text-[#9A3412] font-semibold font-mono-tabular">
                    प्रश्न {index + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans text-stone-700 font-medium">{q.subjectMr}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans">{q.examTag}</span>
                </div>

                <h2 className="font-editorial text-base sm:text-lg font-semibold text-stone-900 leading-relaxed">
                  {q.question}
                </h2>

                <div className="space-y-2.5">
                  {q.options.map((optText, idx) => {
                    const isThisSelected = selectedOpt === idx;
                    const isThisCorrect = idx === q.correctIndex;

                    let optionStyle =
                      'bg-[#FBF9F5] border-stone-300 text-stone-800 hover:border-stone-500';
                    if (isAnswered) {
                      if (isThisCorrect) {
                        optionStyle =
                          'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold';
                      } else if (isThisSelected && !isThisCorrect) {
                        optionStyle = 'bg-red-50 border-red-500 text-red-950';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, idx)}
                        className={`w-full text-left px-4 py-3 rounded border text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <span>
                          <strong className="font-mono mr-2">({idx + 1})</strong>
                          {optText}
                        </span>

                        {isAnswered && isThisCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>बरोबर</span>
                          </span>
                        )}
                        {isAnswered && isThisSelected && !isThisCorrect && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-red-700 shrink-0">
                            <XCircle className="w-4 h-4" />
                            <span>चूक</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Answer & Explanation shown after clicking an option */}
                {isAnswered && (
                  <div className="pt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <p className="font-semibold text-stone-900">
                      उत्तर: पर्याय ({q.correctIndex + 1}) — {q.options[q.correctIndex]}
                    </p>
                    <p className="mt-1 text-stone-600">स्पष्टीकरण: {q.explanation}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
