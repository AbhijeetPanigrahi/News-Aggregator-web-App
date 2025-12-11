import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faLightbulb, faFire } from '@fortawesome/free-solid-svg-icons';

const ReactionSystem = () => {
    const [activeReaction, setActiveReaction] = useState(null);
    const [counts, setCounts] = useState({
        like: 24,
        insightful: 12,
        breaking: 5
    });

    const handleReaction = (type) => {
        if (activeReaction === type) {
            // Removing reaction
            setCounts(prev => ({ ...prev, [type]: prev[type] - 1 }));
            setActiveReaction(null);
        } else {
            // Adding new reaction (and removing old if exists)
            setCounts(prev => ({
                ...prev,
                [activeReaction]: activeReaction ? prev[activeReaction] - 1 : prev[activeReaction],
                [type]: prev[type] + 1
            }));
            setActiveReaction(type);
        }
    };

    const getBtnClass = (isActive) => `
        px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer font-semibold transition-all duration-200 hover:bg-surface-highlight hover:scale-105
        ${isActive
            ? 'bg-accent-muted border border-accent-main text-accent-main'
            : 'bg-surface border border-border text-text-secondary'
        }
    `;

    return (
        <div className="flex gap-4 mt-2.5">
            <button
                className={getBtnClass(activeReaction === 'like')}
                onClick={() => handleReaction('like')}
                title="Like"
            >
                <FontAwesomeIcon icon={faThumbsUp} className="text-xl" /> {counts.like}
            </button>
            <button
                className={getBtnClass(activeReaction === 'insightful')}
                onClick={() => handleReaction('insightful')}
                title="Insightful"
            >
                <FontAwesomeIcon icon={faLightbulb} className="text-xl" /> {counts.insightful}
            </button>
            <button
                className={getBtnClass(activeReaction === 'breaking')}
                onClick={() => handleReaction('breaking')}
                title="Breaking News"
            >
                <FontAwesomeIcon icon={faFire} className="text-xl" /> {counts.breaking}
            </button>
        </div>
    );
};

export default ReactionSystem;
