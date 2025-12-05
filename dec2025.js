import React, { useState, useEffect, useRef } from 'react';

// --- 1. ZERO-DEPENDENCY SAFE ICONS ---
const Icons = {
  Play: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
  Pause: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>,
  ArrowLeft: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>,
  ArrowRight: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>,
  Star: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Heart: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  Globe: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  Zap: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  User: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  X: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Close: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Book: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  BookOpen: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Check: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>,
  ChevronUp: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"></polyline></svg>,
  ChevronDown: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>,
  LogOut: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Bot: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  Wand: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>,
  Brain: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  Volume2: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>,
  Home: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
};

// --- DATA: INITIAL BOOKS ---
const INITIAL_BOOKS = [
  {
    id: 1,
    title: "The Dino Who Brushed His Teeth",
    author: "Sarah Writes",
    created: "2023-10-15",
    reads: 1205,
    level: "Level 1",
    description: "T-Rex loves candy but hates brushing his teeth! Join him on a sticky adventure where he learns why sugar bugs are bad and how a shiny smile makes him the coolest dino in the jungle.",
    coverColor: "bg-[#e8f5e9]", 
    coverEmoji: "🦖",
    quiz: {
      question: "What did T-Rex love to eat every day?",
      options: ["Broccoli", "Sweets & Candy", "Pizza", "Leaves"],
      correctAnswer: 1
    },
    pages: [
      { 
        text: {
          English: "T-Rex loved to eat sweets every single day. He would munch on chocolate bars, sticky gummies, and bright red lollipops until his tummy felt full. But he never, ever wanted to brush his teeth because he thought it was boring.",
          Spanish: "A T-Rex le encantaba comer dulces todos los días. Masticaba barras de chocolate, gomitas pegajosas y piruletas de color rojo brillante hasta que su barriga se sentía llena. Pero nunca, nunca quería cepillarse los dientes porque pensaba que era aburrido.",
        },
        emoji: "🦖"
      },
      { 
        text: {
          English: "He would sneak into the kitchen to find sticky candies.",
          Spanish: "Se escabullía en la cocina para encontrar dulces pegajosos.",
        },
        emoji: "🍬"
      },
      { 
        text: {
          English: "But his mom warned him that sugar bugs love dirty teeth.",
          Spanish: "Pero su mamá le advirtió que a los bichos del azúcar les encantan los dientes sucios.",
        },
        emoji: "🦠"
      }
    ]
  },
  {
    id: 2,
    title: "Space Explorer",
    author: "Mike Johnson",
    illustrator: "CosmoArt",
    rating: 4.5,
    reviews: 89,
    age: "5-7 Years",
    duration: "8 mins",
    level: "Level 2",
    description: "Blast off into space! Learn about planets, stars, and aliens in this fun adventure.",
    coverColor: "bg-indigo-100",
    coverEmoji: "🚀",
    quiz: {
      question: "What do astronauts travel in?",
      options: ["Submarine", "Rocket Ship", "Bus", "Hot Air Balloon"],
      correctAnswer: 1
    },
    pages: [
        { text: { English: "Captain Mittens prepared her ship for takeoff." }, emoji: "🚀" },
        { text: { English: "3... 2... 1... Blast off to the Milky Way!" }, emoji: "✨" },
        { text: { English: "She met a friendly alien who loved yarn." }, emoji: "👽" }
    ] 
  },
  {
    id: 3,
    title: "The Magic Forest",
    author: "Emily Chen",
    illustrator: "NatureDraws",
    rating: 4.9,
    reviews: 210,
    age: "3-5 Years",
    duration: "4 mins",
    level: "Level 1",
    description: "A magical journey through a forest where the trees whisper and the animals talk.",
    coverColor: "bg-purple-100",
    coverEmoji: "🦄",
    quiz: {
      question: "Who talks in the magic forest?",
      options: ["Rocks", "Animals", "Cars", "Clouds"],
      correctAnswer: 1
    },
    pages: [
        { text: { English: "The trees whispered secrets to the wind." }, emoji: "🌳" },
        { text: { English: "A unicorn appeared from behind a bush." }, emoji: "🦄" }
    ] 
  }
];

const LANGUAGES = ["English", "Spanish", "French", "German", "Russian", "Japanese", "Arabic"];

// --- MOCK TRANSLATION LOGIC ---
const mockGenerateStory = async (title) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const pages = Array(10).fill(null).map((_, i) => ({
        text: {
          English: `[Page ${i+1}] Once upon a time, in a land far away, ${title} happened. This is a placeholder for the generated story content.`,
          Spanish: `[Página ${i+1}] Érase una vez, en una tierra muy lejana...`,
        },
        emoji: "📖"
      }));
      resolve(pages);
    }, 1500); 
  });
};

// --- COMPONENT: QUIZ MODAL ---
const QuizModal = ({ book, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === book.quiz.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden scale-100 animate-in zoom-in-95 duration-300">
        <div className="bg-[#6366F1] p-6 text-center relative">
          <div className="absolute top-4 left-4 text-white/20"><Icons.Brain className="w-12 h-12" /></div>
          <div className="absolute bottom-4 right-4 text-white/20"><Icons.Brain className="w-12 h-12" /></div>
          <h2 className="text-2xl font-black text-white mb-1">Pop Quiz!</h2>
          <p className="text-indigo-200 font-medium text-sm">Test your knowledge</p>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8">
          <p className="text-xl font-bold text-gray-800 text-center mb-8 leading-relaxed">
            {book.quiz.question}
          </p>
          <div className="space-y-3">
            {book.quiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isCorrect === true}
                className={`w-full p-4 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between ${selectedOption === idx ? (isCorrect ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'bg-white border-gray-100 hover:border-indigo-200 hover:bg-gray-50 text-gray-700'}`}
              >
                <span>{option}</span>
                {selectedOption === idx && (isCorrect ? <span className="text-green-500"><Icons.Check className="w-6 h-6" /></span> : <span className="text-red-500"><Icons.X className="w-6 h-6" /></span>)}
              </button>
            ))}
          </div>
          {isCorrect === true && (
            <div className="mt-6 text-center animate-in slide-in-from-bottom-2">
              <p className="text-green-600 font-black text-lg mb-4">🎉 Awesome Job!</p>
              <button onClick={onClose} className="bg-[#6366F1] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5558E3] transition-colors shadow-lg shadow-indigo-200">Continue Reading</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: BOOK READER ---
// Restored component to fix white screen
const BookReader = ({ book, initialLanguage = "English", onBack }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentLang, setCurrentLang] = useState(initialLanguage);

  const currentPage = book.pages[pageIndex];
  const isLastPage = pageIndex === book.pages.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      setShowQuiz(true);
    } else {
      setPageIndex(p => p + 1);
      setIsSpeaking(false);
      window.speechSynthesis.cancel();
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setPageIndex(p => p - 1);
      setIsSpeaking(false);
      window.speechSynthesis.cancel();
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = currentPage.text[currentLang] || currentPage.text['English'];
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  if (showQuiz) {
    return <QuizModal book={book} onClose={onBack} />;
  }

  const currentText = currentPage.text[currentLang] || currentPage.text['English'];

  return (
    <div className={`min-h-screen ${book.coverColor} flex flex-col items-center justify-center p-4 font-sans relative`}>
      {/* Controls Top */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="bg-white/80 backdrop-blur-sm p-3 rounded-full text-slate-700 hover:bg-white transition-all shadow-sm">
          <Icons.Home className="w-6 h-6" />
        </button>
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-slate-700 shadow-sm">
           {book.title}
        </div>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      {/* Book View */}
      <div className="bg-white w-full max-w-5xl aspect-[16/9] rounded-[3rem] shadow-2xl border-8 border-white/50 flex overflow-hidden relative">
        
        {/* Left: Visual */}
        <div className="w-1/2 bg-slate-50 flex items-center justify-center border-r border-slate-100 p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="text-[10rem] transform transition-transform hover:scale-110 drop-shadow-2xl filter">
              {currentPage.emoji}
            </div>
        </div>

        {/* Right: Text */}
        <div className="w-1/2 p-12 flex flex-col justify-center items-center text-center relative">
          <p className="text-3xl font-medium text-slate-800 leading-relaxed font-sans mb-8">
            {currentText}
          </p>

          <button 
            onClick={toggleSpeech}
            className={`p-5 rounded-full ${isSpeaking ? 'bg-red-400 animate-pulse' : 'bg-indigo-500 hover:bg-indigo-600'} text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all`}
          >
            {isSpeaking ? <Icons.Pause className="w-8 h-8" /> : <Icons.Volume2 className="w-8 h-8" />}
          </button>
          
          <div className="mt-8 flex gap-2">
             {LANGUAGES.slice(0, 3).map(lang => (
               <button 
                 key={lang}
                 onClick={() => setCurrentLang(lang)}
                 className={`text-xs font-bold px-3 py-1 rounded-full border ${currentLang === lang ? 'bg-slate-800 text-white' : 'bg-white text-slate-400 border-slate-200'}`}
               >
                 {lang.slice(0, 2).toUpperCase()}
               </button>
             ))}
          </div>

          <div className="absolute bottom-6 text-slate-300 text-sm font-bold tracking-widest uppercase">
            Page {pageIndex + 1} of {book.pages.length}
          </div>
        </div>

        {/* Navigation Arrows */}
        {pageIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-indigo-600 p-4 rounded-full shadow-lg hover:scale-110 transition-all z-20"
          >
            <Icons.ArrowLeft className="w-8 h-8" />
          </button>
        )}
        
        <button 
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 hover:bg-indigo-700 transition-all z-20 flex items-center gap-2"
        >
          {isLastPage ? <Icons.Star className="w-8 h-8" /> : <Icons.ArrowRight className="w-8 h-8" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 flex gap-2">
        {book.pages.map((_, idx) => (
          <div 
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${idx === pageIndex ? 'w-8 bg-white' : 'w-2 bg-black/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT: LIBRARY SCREEN ---
// Restored component to fix white screen
const LibraryScreen = ({ books, onSelectBook, onBack }) => (
  <div className="min-h-screen bg-sky-50 p-8 font-sans">
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-400 hover:text-indigo-600">
            <Icons.ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Library</h1>
            <p className="text-slate-500 font-medium">Choose a story to start your adventure!</p>
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-sky-100 flex items-center gap-2 text-sky-600 font-bold">
           <Icons.Star className="w-5 h-5 fill-current" />
           <span>1,240 pts</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div 
            key={book.id}
            onClick={() => onSelectBook(book)}
            className="group bg-white rounded-[2rem] p-4 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-indigo-100"
          >
            <div className={`h-56 ${book.coverColor} rounded-[1.5rem] mb-5 flex items-center justify-center text-7xl shadow-inner relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="group-hover:scale-125 transition-transform duration-500">{book.coverEmoji}</span>
            </div>
            <div className="px-2 pb-2">
                <h3 className="text-2xl font-bold text-slate-800 mb-1 leading-tight">{book.title}</h3>
                <p className="text-slate-500 font-medium mb-4">by {book.author}</p>
                <div className="flex items-center justify-between">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{book.level}</span>
                    <button className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:bg-indigo-700 transition-colors">
                        <Icons.Play className="w-5 h-5 ml-1" />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- COMPONENT: STORY DETAILS SCREEN ---
// Restored component to fix white screen
const StoryDetailsScreen = ({ book, onPlay, onBack }) => (
  <div className="min-h-screen bg-white flex items-center justify-center p-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className={`aspect-square ${book.coverColor} rounded-[3rem] flex items-center justify-center text-[12rem] shadow-2xl relative`}>
             <button onClick={onBack} className="absolute top-8 left-8 bg-white/20 hover:bg-white text-slate-700 p-4 rounded-full backdrop-blur-md transition-all">
                 <Icons.ArrowLeft className="w-6 h-6" />
             </button>
             {book.coverEmoji}
          </div>

          <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
              <div>
                  <div className="flex gap-2 mb-4">
                      <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">{book.level}</span>
                      <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-1"><Icons.Globe className="w-4 h-4" /> Multi-Lang</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">{book.title}</h1>
                  <p className="text-xl text-slate-500 font-medium">by {book.author}</p>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  {book.description}
              </p>

              <div className="flex flex-wrap gap-4">
                  <div className="bg-slate-50 px-6 py-4 rounded-2xl">
                      <div className="text-slate-400 text-xs font-bold uppercase mb-1">Duration</div>
                      <div className="text-slate-800 font-bold">~5 Mins</div>
                  </div>
                  <div className="bg-slate-50 px-6 py-4 rounded-2xl">
                      <div className="text-slate-400 text-xs font-bold uppercase mb-1">Quiz</div>
                      <div className="text-slate-800 font-bold">Included</div>
                  </div>
                  <div className="bg-slate-50 px-6 py-4 rounded-2xl">
                      <div className="text-slate-400 text-xs font-bold uppercase mb-1">Rating</div>
                      <div className="text-slate-800 font-bold flex items-center gap-1">4.8 <Icons.Star className="w-4 h-4 text-orange-400 fill-current" /></div>
                  </div>
              </div>

              <div className="pt-4 flex gap-4">
                  <button onClick={onPlay} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-6 rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                      <Icons.Play className="w-8 h-8 fill-current" /> Start Reading
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-6 rounded-2xl transition-colors">
                      <Icons.Heart className="w-8 h-8" />
                  </button>
              </div>
          </div>
      </div>
  </div>
);

// --- COMPONENT: BOOK CREATOR (ADMIN) ---
const BookCreator = ({ onBack, onPublish, editBook = null }) => {
  const [step, setStep] = useState(1); 
  const [title, setTitle] = useState(editBook ? editBook.title : '');
  
  // Safe page initialization handling both legacy string text and new object text
  const [pages, setPages] = useState(() => {
    if (editBook && editBook.pages) {
      return editBook.pages.map(p => ({
        ...p,
        text: typeof p.text === 'string' ? { English: p.text } : { ...p.text }
      }));
    }
    return [];
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState('English');
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleGenerate = async () => {
    if (!title) return;
    setIsGenerating(true);
    const newPages = await mockGenerateStory(title);
    setPages(newPages);
    setIsGenerating(false);
    setStep(2);
  };

  const updatePageText = (pageIdx, lang, newText) => {
    const updated = [...pages];
    if (!updated[pageIdx].text) updated[pageIdx].text = {};
    updated[pageIdx].text[lang] = newText;
    setPages(updated);
  };

  const regenerateText = (pageIdx, lang) => {
    const updated = [...pages];
    const current = updated[pageIdx].text[lang] || "";
    updated[pageIdx].text[lang] = `(New) ${current}`;
    setPages(updated);
  };

  const regenerateAudio = (pageIdx, lang) => {
    alert(`Regenerating audio for Page ${pageIdx + 1} (${lang})... Done!`);
  };

  const regenerateImage = (pageIdx) => {
    const updated = [...pages];
    updated[pageIdx].emoji = ["🎨", "🖌️", "🖼️", "🎭"][Math.floor(Math.random()*4)];
    setPages(updated);
  };

  const handleFinish = () => {
    const newBook = {
      id: editBook ? editBook.id : Date.now(),
      title: title,
      author: "Admin",
      created: new Date().toISOString().split('T')[0],
      reads: 0,
      level: "Level 1",
      description: `A story about ${title}.`,
      coverColor: "bg-purple-100",
      coverEmoji: pages[0]?.emoji || "📘",
      quiz: { question: "Did you like it?", options: ["Yes", "No"], correctAnswer: 0 },
      pages: pages
    };
    onPublish(newBook);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><Icons.ArrowLeft className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold text-gray-800">{editBook ? 'Edit Book' : 'New Book Studio'}</h1>
        </div>
        <div className="flex items-center gap-2">
          {['Concept', 'Translate', 'Narrate', 'Illustrate', 'Review'].map((label, idx) => (
            <div key={label} className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${step === idx + 1 ? 'bg-indigo-100 text-indigo-700' : 'text-gray-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step === idx + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{idx + 1}</div>
              <span className="hidden md:inline">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full p-8 flex-1 pb-24">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full pt-20 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6"><Icons.Bot className="w-10 h-10" /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Story Concept</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">Enter a title. AI will generate 10 balanced pages with morals.</p>
            <input type="text" placeholder="e.g. The Brave Little Toaster" className="w-full max-w-md px-6 py-4 rounded-2xl border-2 border-gray-200 text-lg focus:border-indigo-500 focus:outline-none mb-6 shadow-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleGenerate} disabled={isGenerating || !title} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-xl shadow-indigo-200 transition-all">{isGenerating ? <><Icons.Zap className="w-5 h-5 animate-pulse" /> Generating...</> : <><Icons.Wand className="w-5 h-5" /> Generate Story</>}</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Review Translations</h2>
              <div className="flex gap-2 flex-wrap">
                {LANGUAGES.map(lang => (
                  <button key={lang} onClick={() => setActiveLangTab(lang)} className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${activeLangTab === lang ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>{lang}</button>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {pages.map((page, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500 text-sm">{idx + 1}</div>
                  <div className="pl-12">
                    <textarea className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none text-gray-800 leading-relaxed resize-none transition-all focus:bg-white" rows={3} value={page.text[activeLangTab] || ''} onChange={(e) => updatePageText(idx, activeLangTab, e.target.value)} />
                    <div className="flex justify-end mt-2">
                      <button onClick={() => regenerateText(idx, activeLangTab)} className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors"><Icons.Zap className="w-3 h-3" /> Regenerate Text</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Narration Studio</h2>
              <div className="flex gap-2 flex-wrap">
                {LANGUAGES.map(lang => (
                  <button key={lang} onClick={() => setActiveLangTab(lang)} className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${activeLangTab === lang ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>{lang}</button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {pages.map((page, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">{idx + 1}</div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Audio Track ({activeLangTab})</p>
                      <p className="text-xs text-gray-400 truncate max-w-md">{page.text[activeLangTab]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-3 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 rounded-full transition-colors"><Icons.Play className="w-5 h-5" /></button>
                    <button onClick={() => regenerateAudio(idx, activeLangTab)} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"><Icons.Zap className="w-4 h-4" /> Replace</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Illustration Studio</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pages.map((page, idx) => (
                <div key={idx} className="relative group">
                  <div onClick={() => setEnlargedImage({ img: page.emoji, idx })} className="aspect-square bg-white rounded-2xl border-2 border-gray-100 flex items-center justify-center text-6xl cursor-zoom-in hover:border-indigo-500 hover:shadow-lg transition-all">{page.emoji}</div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">Page {idx + 1}</div>
                  <button onClick={(e) => { e.stopPropagation(); regenerateImage(idx); }} className="absolute bottom-2 right-2 bg-white text-indigo-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-50"><Icons.Zap className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            {enlargedImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8" onClick={() => setEnlargedImage(null)}>
                <div className="bg-white p-8 rounded-3xl max-w-2xl w-full text-center relative animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setEnlargedImage(null)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"><Icons.X className="w-6 h-6" /></button>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Page {enlargedImage.idx + 1}</h3>
                  <div className="text-[12rem] mb-6">{enlargedImage.img}</div>
                  <div className="flex justify-center gap-4"><button onClick={() => regenerateImage(enlargedImage.idx)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2"><Icons.Zap className="w-5 h-5" /> Regenerate</button></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {step > 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button onClick={() => setStep(s => Math.max(1, s - 1))} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100">Back</button>
            <div className="flex gap-4">
              {step < 4 ? (
                <button onClick={() => setStep(s => s + 1)} className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800">Next Step</button>
              ) : (
                <button onClick={handleFinish} className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200">Publish Book</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: ADMIN DASHBOARD (Table View) ---
const AdminDashboard = ({ books, onCreateNew, onEditBook, onDeleteBook, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full text-gray-600"><Icons.ArrowLeft className="w-6 h-6" /></button>
            <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
          </div>
          <button onClick={onCreateNew} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-200">
            <Icons.BookOpen className="w-5 h-5" /> Create New Book
          </button>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">Title</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">Date</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">Reads</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs">Langs</th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${book.coverColor} rounded-lg flex items-center justify-center text-xl`}>{book.coverEmoji}</div>
                      <span className="font-bold text-gray-900">{book.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{book.created || '2023-10-25'}</td>
                  <td className="px-6 py-4"><div className="flex items-center gap-1 text-gray-700 font-bold"><Icons.User className="w-4 h-4 text-gray-400" />{book.reads || 0}</div></td>
                  <td className="px-6 py-4 text-gray-500 text-sm"><div className="flex gap-1">{['EN', 'ES'].map(l => <span key={l} className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">{l}</span>)}</div></td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => onEditBook(book)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold text-sm">Edit</button><button onClick={() => onDeleteBook(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Icons.X className="w-5 h-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {books.length === 0 && <div className="p-12 text-center text-gray-400">No books created yet. Start writing!</div>}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: LANDING SCREEN ---
const LandingScreen = ({ onSelectRole, onOpenAdmin }) => (
  <div className="h-full flex flex-col items-center justify-center bg-[#2E2B5F] p-4 font-sans text-center">
    <div className="mb-12">
      <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">WonderBooks</h1>
      <p className="text-indigo-200 text-lg">Who is using this device?</p>
    </div>
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
      <button onClick={() => onSelectRole('kid')} className="flex-1 bg-white rounded-3xl p-8 transition-transform duration-300 hover:scale-105 shadow-xl flex flex-col items-center gap-4 group">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl mb-2 group-hover:rotate-12 transition-transform">🦁</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kid</h2>
          <p className="text-gray-500 text-sm font-medium">Read & Play</p>
        </div>
      </button>
      <button onClick={() => onSelectRole('parent')} className="flex-1 bg-[#1F2937] rounded-3xl p-8 transition-transform duration-300 hover:scale-105 shadow-xl flex flex-col items-center gap-4 group border border-gray-700">
         <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-gray-400"><Icons.User className="w-10 h-10" /></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Parent</h2>
          <p className="text-gray-400 text-sm font-medium">Dashboard & Settings</p>
        </div>
      </button>
      <button onClick={onOpenAdmin} className="flex-1 bg-indigo-600 rounded-3xl p-8 transition-transform duration-300 hover:scale-105 shadow-xl flex flex-col items-center gap-4 group border border-indigo-500">
         <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-white"><Icons.Zap className="w-10 h-10" /></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Admin</h2>
          <p className="text-indigo-200 text-sm font-medium">Create & Generate</p>
        </div>
      </button>
    </div>
  </div>
);

// --- MAIN APP SHELL ---
const App = () => {
  const [view, setView] = useState('landing'); 
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [bookToEdit, setBookToEdit] = useState(null);

  const handlePublishBook = (newBook) => {
    if (bookToEdit) {
      setBooks(prev => prev.map(b => b.id === newBook.id ? newBook : b));
    } else {
      setBooks(prev => [...prev, newBook]);
    }
    setBookToEdit(null);
    setView('admin_dashboard');
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setView('admin_creator');
  };

  return (
    <div className="h-screen bg-white font-sans text-gray-800 overflow-hidden">
      {view === 'landing' && <LandingScreen onSelectRole={(role) => setView(role === 'kid' ? 'library' : 'parent')} onOpenAdmin={() => setView('admin_dashboard')} />}
      {view === 'library' && <LibraryScreen books={books} onSelectBook={(b) => { setSelectedBook(b); setView('details'); }} onBack={() => setView('landing')} />}
      {view === 'details' && selectedBook && <StoryDetailsScreen book={selectedBook} onPlay={() => setView('reader')} onBack={() => setView('library')} />}
      {view === 'reader' && selectedBook && <BookReader book={selectedBook} initialLanguage="English" onBack={() => setView('details')} />}
      {view === 'parent' && <div className="h-full flex items-center justify-center bg-slate-50"><div className="text-center"><h2 className="text-2xl font-bold text-gray-700 mb-4">Parent Dashboard</h2><button onClick={() => setView('landing')} className="text-indigo-600 font-bold hover:underline">Go Back</button></div></div>}
      {view === 'admin_dashboard' && <AdminDashboard books={books} onCreateNew={() => { setBookToEdit(null); setView('admin_creator'); }} onEditBook={handleEditBook} onDeleteBook={handleDeleteBook} onBack={() => setView('landing')} />}
      {view === 'admin_creator' && <BookCreator editBook={bookToEdit} onBack={() => setView('admin_dashboard')} onPublish={handlePublishBook} />}
    </div>
  );
};

export default App;
