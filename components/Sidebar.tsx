
import React from 'react';
import { Hairstyle, BeardStyle, StylingOptions } from '../types';

interface SidebarProps {
  options: StylingOptions;
  setOptions: React.Dispatch<React.SetStateAction<StylingOptions>>;
  onGenerate: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  options,
  setOptions,
  onGenerate,
  onFileChange,
  isLoading
}) => {
  return (
    <aside className="w-full lg:w-80 bg-white border-r border-slate-200 h-full p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Settings</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Upload your selfie</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={onFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
          />
        </div>

        <hr className="border-slate-100" />

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Choose Hairstyle</label>
          <select
            value={options.hairstyle}
            onChange={(e) => setOptions({ ...options, hairstyle: e.target.value as Hairstyle })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
          >
            {Object.values(Hairstyle).map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Choose Beard Style</label>
          <select
            value={options.beardStyle}
            onChange={(e) => setOptions({ ...options, beardStyle: e.target.value as BeardStyle })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
          >
            {Object.values(BeardStyle).map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Hair/Beard Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={options.color}
              onChange={(e) => setOptions({ ...options, color: e.target.value })}
              className="h-10 w-10 p-1 rounded cursor-pointer bg-white border border-slate-200"
            />
            <span className="text-sm text-slate-500 font-mono uppercase">{options.color}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all shadow-lg ${
            isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-200'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Generate Look'
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
