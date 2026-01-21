import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateContent } from '../api/geminiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRobot,
    faBolt,
    faListUl,
    faComments,
    faCopy,
    faRedoAlt,
    faExclamationTriangle,
    faPaperPlane,
    faMagic
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from './LoadingSpinner';

const AiConcierge = ({ articleContent }) => {
    const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'takeaways', 'chat'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for Summary
    const [summary, setSummary] = useState('');
    const [summaryStyle, setSummaryStyle] = useState('Standard');

    // State for Takeaways
    const [takeaways, setTakeaways] = useState('');

    // State for Chat
    const [chatHistory, setChatHistory] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const styles = ['Standard', 'ELI5', 'Professional', 'Tweet', 'Exam Notes'];
    const promptChips = ["Main issue?", "Who is affected?", "Explain like I'm 10", "Pros/Cons", "What happens next?"];

    // --- Actions ---

    const handleGenerateSummary = async (style = summaryStyle) => {
        setLoading(true);
        setError(null);
        setSummaryStyle(style);
        try {
            const prompt = `
            You are an AI News Assistant.
            Article Content: "${articleContent}"
            
            Task: Write a TL;DR summary of this article.
            Style: ${style}.
            Format: Markdown, bullet points (2-4 bullets).
            Constraint: Be concise and accurate.
            `;
            const text = await generateContent(prompt);
            setSummary(text);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateTakeaways = async () => {
        setLoading(true);
        setError(null);
        try {
            const prompt = `
            You are an AI News Assistant.
            Article Content: "${articleContent}"
            
            Task: Extract proper nouns/entities involved and 3-6 key takeaways.
            Format:
            **Entities:** [List people, orgs, places]
            **Key Takeaways:**
            - [Takeaway 1]
            - [Takeaway 2]
            ...
            `;
            const text = await generateContent(prompt);
            setTakeaways(text);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChatSubmit = async (e) => {
        e?.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setChatHistory(prev => [...prev, { type: 'user', text: userMsg }]);
        setChatInput('');
        setLoading(true);
        setError(null);

        try {
            const prompt = `
            You are an AI News Assistant.
            Context: The user is reading a specific news article.
            Article Content: "${articleContent}"
            
            User Question: "${userMsg}"
            
            Instructions: Answer the question ONLY based on the provided article content. 
            If the answer is not found in the text, say "Not mentioned in the article."
            Keep answers concise and helpful.
            `;
            const response = await generateContent(prompt);
            setChatHistory(prev => [...prev, { type: 'ai', text: response }]);
        } catch (err) {
            setError(err.message);
            setChatHistory(prev => [...prev, { type: 'error', text: "Failed to get response." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Could show a toast here
    };

    // --- Render Helpers ---

    return (
        <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-soft mt-10 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex flex-col md:flex-row items-center justify-between text-white gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <FontAwesomeIcon icon={faRobot} className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">AI News Concierge</h2>
                        <p className="text-xs text-blue-100 font-medium tracking-wide opacity-90">POWERED BY GEMINI</p>
                    </div>
                </div>
                {/* Tabs */}
                <div className="flex bg-black/20 rounded-xl p-1 gap-1 w-full md:w-auto overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'summary' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:bg-white/10'}`}
                    >
                        TL;DR
                    </button>
                    <button
                        onClick={() => setActiveTab('takeaways')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'takeaways' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:bg-white/10'}`}
                    >
                        Insights
                    </button>
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'chat' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100 hover:bg-white/10'}`}
                    >
                        Chat
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6 min-h-[300px] flex flex-col relative bg-surface">

                {/* Error Banner */}
                {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-300 p-3 rounded-xl text-sm flex items-center gap-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        {error}
                    </div>
                )}

                {/* --- Tab: TL;DR Summary --- */}
                {activeTab === 'summary' && (
                    <div className="animate-fade-in flex flex-col h-full">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {styles.map(style => (
                                <button
                                    key={style}
                                    onClick={() => !loading && handleGenerateSummary(style)}
                                    disabled={loading}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all 
                                        ${summaryStyle === style
                                            ? 'bg-primary-main/10 border-primary-main text-primary-main'
                                            : 'bg-surface border-border text-text-secondary hover:border-primary-main/50'}`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 bg-surface-highlight rounded-2xl p-6 border border-border relative">
                            {loading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-highlight/80 backdrop-blur-sm z-10 rounded-2xl">
                                    <LoadingSpinner />
                                    <p className="mt-3 text-sm font-medium text-text-secondary animate-pulse">Reading article...</p>
                                </div>
                            ) : null}

                            {summary ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none text-text-primary">
                                    <ReactMarkdownRenderer content={summary} />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-text-muted py-10">
                                    <FontAwesomeIcon icon={faBolt} className="text-4xl mb-3 opacity-20" />
                                    <p>Select a style to generate a summary.</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            {summary && (
                                <button
                                    onClick={() => handleCopy(summary)}
                                    className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-highlight transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faCopy} /> Copy
                                </button>
                            )}
                            <button
                                onClick={() => handleGenerateSummary()}
                                disabled={loading}
                                className="px-5 py-2 bg-primary-main text-white rounded-xl font-bold shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                <FontAwesomeIcon icon={summary ? faRedoAlt : faMagic} />
                                {summary ? 'Regenerate' : 'Generate Summary'}
                            </button>
                        </div>
                    </div>
                )}

                {/* --- Tab: Key Takeaways --- */}
                {activeTab === 'takeaways' && (
                    <div className="animate-fade-in flex flex-col h-full">
                        <div className="flex-1 bg-surface-highlight rounded-2xl p-6 border border-border relative min-h-[200px]">
                            {loading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-highlight/80 backdrop-blur-sm z-10 rounded-2xl">
                                    <LoadingSpinner />
                                    <p className="mt-3 text-sm font-medium text-text-secondary animate-pulse">Extracting insights...</p>
                                </div>
                            ) : null}

                            {takeaways ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none text-text-primary">
                                    <ReactMarkdownRenderer content={takeaways} />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-text-muted py-10">
                                    <FontAwesomeIcon icon={faListUl} className="text-4xl mb-3 opacity-20" />
                                    <p>Extract key facts and numbers.</p>
                                    <button
                                        onClick={handleGenerateTakeaways}
                                        className="mt-4 px-5 py-2 bg-primary-main text-white rounded-xl font-bold shadow-soft hover:shadow-lg transition-all text-sm"
                                    >
                                        Identify Key Takeaways
                                    </button>
                                </div>
                            )}
                        </div>
                        {takeaways && (
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => handleCopy(takeaways)} className="px-4 py-2 rounded-xl text-text-secondary hover:bg-surface-highlight text-sm font-medium flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCopy} /> Copy
                                </button>
                                <button onClick={handleGenerateTakeaways} className="px-4 py-2 text-primary-main hover:bg-primary-main/10 rounded-xl text-sm font-bold flex items-center gap-2">
                                    <FontAwesomeIcon icon={faRedoAlt} /> Update
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- Tab: Chat --- */}
                {activeTab === 'chat' && (
                    <div className="animate-fade-in flex flex-col h-[500px]">
                        {/* Chat History */}
                        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar p-2">
                            {chatHistory.length === 0 && (
                                <div className="text-center text-text-muted py-10">
                                    <FontAwesomeIcon icon={faComments} className="text-4xl mb-3 opacity-20" />
                                    <p>Ask anything about this article.</p>
                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        {promptChips.map(chip => (
                                            <button
                                                key={chip}
                                                onClick={() => { setChatInput(chip); }}
                                                className="bg-surface-highlight border border-border px-3 py-1 rounded-full text-xs hover:border-primary-main hover:text-primary-main transition-colors"
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                        ? 'bg-primary-main text-white rounded-br-none'
                                        : msg.type === 'error'
                                            ? 'bg-red-50 text-red-600 border border-red-100'
                                            : 'bg-surface-highlight text-text-primary border border-border rounded-bl-none'
                                        }`}>
                                        <ReactMarkdownRenderer content={msg.text} />
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-surface-highlight p-4 rounded-2xl rounded-bl-none">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce delay-75"></div>
                                            <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce delay-150"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleChatSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Ask about this article..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="w-full bg-surface-highlight border border-border rounded-xl pl-4 pr-12 py-3.5 text-sm text-text-primary focus:ring-2 focus:ring-primary-main/20 focus:border-primary-main outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!chatInput.trim() || loading}
                                className="absolute right-2 top-2 p-1.5 bg-primary-main text-white rounded-lg w-8 h-8 flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
                            </button>
                        </form>
                    </div>
                )}


                {/* Footer Disclaimer */}
                <div className="mt-4 pt-3 border-t border-border text-center">
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                        AI generated content may be inaccurate. Please verify important details.
                    </p>
                </div>

            </div>
        </div >
    );
};


const ReactMarkdownRenderer = ({ content }) => {
    return (
        <ReactMarkdown
            children={content}
            components={{
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-text-primary" {...props} />,
                a: ({ node, ...props }) => <a className="text-primary-main hover:underline" {...props} />,
                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-1 mt-2" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary-main pl-4 italic my-2 bg-surface-highlight py-1 rounded-r" {...props} />,
            }}
        />
    );
};

export default AiConcierge;
