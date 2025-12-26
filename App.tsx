
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { StylingOptions, Hairstyle, BeardStyle, StylistState } from './types';
import { applyStyleWithAI } from './services/geminiService';

const App: React.FC = () => {
  const [options, setOptions] = useState<StylingOptions>({
    hairstyle: Hairstyle.BUZZ_CUT,
    beardStyle: BeardStyle.STUBBLE,
    color: '#1a1a1a',
  });

  const [state, setState] = useState<StylistState>({
    originalImage: null,
    styledImage: null,
    isLoading: false,
    error: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setState(prev => ({
          ...prev,
          originalImage: event.target?.result as string,
          styledImage: null,
          error: null
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!state.originalImage) {
      setState(prev => ({ ...prev, error: "Please upload a photo first." }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await applyStyleWithAI(state.originalImage, options);
      setState(prev => ({
        ...prev,
        styledImage: result,
        isLoading: false
      }));
    } catch (err: any) {
      console.error("Styling Error:", err);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "AI Styling failed. Please try a different photo or check your connection."
      }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <Sidebar
        options={options}
        setOptions={setOptions}
        onFileChange={handleFileChange}
        onGenerate={handleGenerate}
        isLoading={state.isLoading}
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
        <header className="w-full max-w-5xl mb-8 flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Virtual Stylist</h2>
            <p className="text-slate-500">Transform your look with advanced AI</p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">Powered by Gemini 2.5 Flash</span>
          </div>
        </header>

        {state.error && (
          <div className="w-full max-w-2xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{state.error}</span>
          </div>
        )}

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Area */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Input Portrait</h3>
            <div className="relative aspect-square rounded-2xl bg-white border-2 border-slate-200 overflow-hidden flex items-center justify-center group shadow-sm transition-all hover:border-indigo-200">
              {state.originalImage ? (
                <img src={state.originalImage} alt="Original" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-12">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Please upload a selfie from the sidebar</p>
                </div>
              )}
            </div>
          </div>

          {/* Output Area */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Styled Look</h3>
            <div className="relative aspect-square rounded-2xl bg-indigo-50 border-2 border-indigo-100 overflow-hidden flex items-center justify-center shadow-md">
              {state.isLoading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-indigo-600 font-bold tracking-tight animate-pulse">AI is styling...</p>
                </div>
              ) : state.styledImage ? (
                <img src={state.styledImage} alt="Styled" className="w-full h-full object-cover transition-all duration-700 ease-out" />
              ) : (
                <div className="text-center p-12">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-50">
                    <svg className="w-8 h-8 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <p className="text-indigo-300 text-sm font-medium">Ready to apply styling</p>
                </div>
              )}
              {state.styledImage && (
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = state.styledImage!;
                    link.download = `stylist-look-${Date.now()}.png`;
                    link.click();
                  }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all active:scale-95 text-indigo-600"
                  title="Download Image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Photorealism</h4>
            <p className="text-sm text-slate-500">Gemini 2.5 Flash ensures the hair and beard textures blend seamlessly with your original skin tone and lighting.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Instructions</h4>
            <p className="text-sm text-slate-500">For best results, look directly at the camera. Avoid wearing glasses or hats in the source photo.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Privacy First</h4>
            <p className="text-sm text-slate-500">Your photos are processed in real-time. We do not store any biometric data or uploaded images on our servers.</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-2 px-4 bg-white/80 backdrop-blur-md border-t border-slate-200 text-center text-[10px] text-slate-400 lg:left-80 z-10">
        Virtual Stylist &copy; 2025 | Professional AI-Augmented Grooming Preview
      </footer>
    </div>
  );
};

export default App;
