
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const PoetryGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateNote = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, funny, and incredibly romantic Valentine's Day note for someone named ${prompt}. Mention that they finally agreed to be my valentine after a very logical flowchart. Keep it under 50 words.`,
        config: {
          temperature: 0.8,
          topP: 0.9,
        }
      });
      setResult(response.text || 'Something went wrong, but I still love you!');
    } catch (error) {
      console.error(error);
      setResult("My heart (and the AI) skipped a beat. Just know you're special!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/40 shadow-2xl max-w-md mx-auto">
      <h3 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2 justify-center">
        <span>✨</span> AI Love Letter
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Who is this for?"
          className="w-full px-5 py-3 rounded-full border-none focus:ring-2 focus:ring-pink-300 bg-white/40 placeholder-pink-300 text-pink-900"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={generateNote}
          disabled={loading || !prompt}
          className="w-full bg-pink-500 text-white font-bold py-3 rounded-full hover:bg-pink-600 transition-all shadow-md disabled:opacity-50"
        >
          {loading ? 'Crafting...' : 'Write it for me'}
        </button>
        {result && (
          <div className="mt-4 p-5 bg-white/40 rounded-3xl border border-white/40 animate-in fade-in zoom-in duration-500">
            <p className="text-pink-900 italic font-cursive text-xl leading-relaxed">
              "{result}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoetryGenerator;
